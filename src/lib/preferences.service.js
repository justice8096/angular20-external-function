var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
let PreferencesService = class PreferencesService {
    constructor() {
        // Default preferences
        this.defaultPrefs = {
            theme: 'light',
            autosave: true,
            itemsPerPage: 20,
        };
    }
    async load(source, externalUrl) {
        if (source === 'local-file')
            return this.loadFromLocalFile();
        return this.loadFromExternal(externalUrl);
    }
    async save(source, prefs, externalUrl) {
        if (source === 'local-file')
            return this.saveToLocalFile(prefs);
        return this.saveToExternal(prefs, externalUrl);
    }
    async loadFromExternal(url) {
        if (!url)
            throw new Error('External URL required');
        const res = await fetch(url, { method: 'GET' });
        if (!res.ok)
            throw new Error(`Failed to load prefs: ${res.status}`);
        const json = await res.json();
        return this.validateOrDefault(json);
    }
    async saveToExternal(prefs, url) {
        if (!url)
            throw new Error('External URL required');
        const res = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prefs),
        });
        if (!res.ok)
            throw new Error(`Failed to save prefs: ${res.status}`);
    }
    async loadFromLocalFile() {
        // Uses the File System Access API when available in the browser
        if (!window.showOpenFilePicker) {
            throw new Error('File System Access API not available in this environment');
        }
        const [handle] = await window.showOpenFilePicker({
            types: [{ description: 'JSON', accept: { 'application/json': ['.json'] } }],
            multiple: false,
        });
        const file = await handle.getFile();
        const text = await file.text();
        const json = JSON.parse(text);
        return this.validateOrDefault(json);
    }
    async saveToLocalFile(prefs) {
        if (!window.showSaveFilePicker) {
            throw new Error('File System Access API not available in this environment');
        }
        const handle = await window.showSaveFilePicker({
            suggestedName: 'preferences.json',
            types: [{ description: 'JSON', accept: { 'application/json': ['.json'] } }],
        });
        const writable = await handle.createWritable();
        await writable.write(JSON.stringify(prefs, null, 2));
        await writable.close();
    }
    validateOrDefault(obj) {
        if (!obj || typeof obj !== 'object')
            return this.defaultPrefs;
        const theme = obj.theme === 'dark' ? 'dark' : 'light';
        const autosave = typeof obj.autosave === 'boolean' ? obj.autosave : this.defaultPrefs.autosave;
        const itemsPerPage = Number.isInteger(obj.itemsPerPage) ? obj.itemsPerPage : this.defaultPrefs.itemsPerPage;
        return { theme, autosave, itemsPerPage };
    }
};
PreferencesService = __decorate([
    Injectable({ providedIn: 'root' }),
    __metadata("design:paramtypes", [])
], PreferencesService);
export { PreferencesService };
