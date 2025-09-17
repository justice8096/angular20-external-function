var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PreferencesService } from './preferences.service';
import { SourceChooserComponent } from './source-chooser.component';
let PreferencesComponent = class PreferencesComponent {
    constructor() {
        this.prefs = null;
        this.service = inject(PreferencesService);
        this.source = 'local-file';
        // initialize with defaults
        this.prefs = { theme: 'light', autosave: true, itemsPerPage: 20 };
    }
    onSourceChange(payload) {
        this.source = payload.source;
        this.externalUrl = payload.externalUrl;
    }
    async load() {
        try {
            const loaded = await this.service.load(this.source, this.externalUrl);
            this.prefs = loaded;
        }
        catch (err) {
            console.error('Load failed', err);
            alert('Failed to load preferences: ' + err.message);
        }
    }
    async save() {
        if (!this.prefs)
            return;
        try {
            await this.service.save(this.source, this.prefs, this.externalUrl);
            alert('Preferences saved');
        }
        catch (err) {
            console.error('Save failed', err);
            alert('Failed to save preferences: ' + err.message);
        }
    }
};
PreferencesComponent = __decorate([
    Component({
        selector: 'app-preferences',
        standalone: true,
        imports: [CommonModule, FormsModule, SourceChooserComponent],
        templateUrl: './preferences.component.html',
    }),
    __metadata("design:paramtypes", [])
], PreferencesComponent);
export { PreferencesComponent };
