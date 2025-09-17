import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Output, Component, inject, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from '@angular/forms';
import { FormsModule } from '@angular/forms';

class PreferencesService {
    // Default preferences
    defaultPrefs = {
        theme: 'light',
        autosave: true,
        itemsPerPage: 20,
    };
    constructor() { }
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.0", ngImport: i0, type: PreferencesService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.0", ngImport: i0, type: PreferencesService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.0", ngImport: i0, type: PreferencesService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [] });

class SourceChooserComponent {
    sourceChange = new EventEmitter();
    selected = 'local-file';
    externalUrl;
    choose(s) {
        this.selected = s;
        this.sourceChange.emit({ source: s, externalUrl: this.externalUrl });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.0", ngImport: i0, type: SourceChooserComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.0", type: SourceChooserComponent, isStandalone: true, selector: "app-source-chooser", outputs: { sourceChange: "sourceChange" }, ngImport: i0, template: "<div>\r\n  <label>\r\n    <input type=\"radio\" name=\"source\" value=\"local-file\" (change)=\"choose('local-file')\" checked /> Local File\r\n  </label>\r\n  <label>\r\n    <input type=\"radio\" name=\"source\" value=\"external-service\" (change)=\"choose('external-service')\" /> External Service\r\n  </label>\r\n  <div *ngIf=\"selected === 'external-service'\">\r\n    <input placeholder=\"External URL\" [(ngModel)]=\"externalUrl\" />\r\n  </div>\r\n</div>\r\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.0", ngImport: i0, type: SourceChooserComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-source-chooser', standalone: true, imports: [CommonModule, FormsModule], template: "<div>\r\n  <label>\r\n    <input type=\"radio\" name=\"source\" value=\"local-file\" (change)=\"choose('local-file')\" checked /> Local File\r\n  </label>\r\n  <label>\r\n    <input type=\"radio\" name=\"source\" value=\"external-service\" (change)=\"choose('external-service')\" /> External Service\r\n  </label>\r\n  <div *ngIf=\"selected === 'external-service'\">\r\n    <input placeholder=\"External URL\" [(ngModel)]=\"externalUrl\" />\r\n  </div>\r\n</div>\r\n" }]
        }], propDecorators: { sourceChange: [{
                type: Output
            }] } });

class PreferencesComponent {
    prefs = null;
    service = inject(PreferencesService);
    source = 'local-file';
    externalUrl;
    constructor() {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.0", ngImport: i0, type: PreferencesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.0", type: PreferencesComponent, isStandalone: true, selector: "app-preferences", ngImport: i0, template: "<div>\r\n  <h3>Preferences</h3>\r\n  <app-source-chooser (sourceChange)=\"onSourceChange($event)\"></app-source-chooser>\r\n\r\n  <div *ngIf=\"prefs\">\r\n    <label>\r\n      Theme:\r\n      <select [(ngModel)]=\"prefs.theme\">\r\n        <option value=\"light\">Light</option>\r\n        <option value=\"dark\">Dark</option>\r\n      </select>\r\n    </label>\r\n    <br />\r\n    <label>\r\n      Autosave:\r\n      <input type=\"checkbox\" [(ngModel)]=\"prefs.autosave\" />\r\n    </label>\r\n    <br />\r\n    <label>\r\n      Items per page:\r\n      <input type=\"number\" [(ngModel)]=\"prefs.itemsPerPage\" />\r\n    </label>\r\n    <br />\r\n    <button (click)=\"load()\">Load</button>\r\n    <button (click)=\"save()\">Save</button>\r\n  </div>\r\n</div>\r\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { kind: "directive", type: i2.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i2.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: SourceChooserComponent, selector: "app-source-chooser", outputs: ["sourceChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.0", ngImport: i0, type: PreferencesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-preferences', standalone: true, imports: [CommonModule, FormsModule, SourceChooserComponent], template: "<div>\r\n  <h3>Preferences</h3>\r\n  <app-source-chooser (sourceChange)=\"onSourceChange($event)\"></app-source-chooser>\r\n\r\n  <div *ngIf=\"prefs\">\r\n    <label>\r\n      Theme:\r\n      <select [(ngModel)]=\"prefs.theme\">\r\n        <option value=\"light\">Light</option>\r\n        <option value=\"dark\">Dark</option>\r\n      </select>\r\n    </label>\r\n    <br />\r\n    <label>\r\n      Autosave:\r\n      <input type=\"checkbox\" [(ngModel)]=\"prefs.autosave\" />\r\n    </label>\r\n    <br />\r\n    <label>\r\n      Items per page:\r\n      <input type=\"number\" [(ngModel)]=\"prefs.itemsPerPage\" />\r\n    </label>\r\n    <br />\r\n    <button (click)=\"load()\">Load</button>\r\n    <button (click)=\"save()\">Save</button>\r\n  </div>\r\n</div>\r\n" }]
        }], ctorParameters: () => [] });

class PreferencesModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.0", ngImport: i0, type: PreferencesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.0", ngImport: i0, type: PreferencesModule, imports: [PreferencesComponent, SourceChooserComponent], exports: [PreferencesComponent, SourceChooserComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.0", ngImport: i0, type: PreferencesModule, providers: [PreferencesService], imports: [PreferencesComponent, SourceChooserComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.0", ngImport: i0, type: PreferencesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [PreferencesComponent, SourceChooserComponent],
                    exports: [PreferencesComponent, SourceChooserComponent],
                    providers: [PreferencesService],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { PreferencesComponent, PreferencesModule, PreferencesService, SourceChooserComponent };
//# sourceMappingURL=local-angular20-external-function.mjs.map
