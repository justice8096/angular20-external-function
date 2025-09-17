import * as i0 from '@angular/core';
import { EventEmitter } from '@angular/core';

interface Preferences {
    theme: 'light' | 'dark';
    autosave: boolean;
    itemsPerPage: number;
}
type PreferenceSource = 'local-file' | 'external-service';

declare class PreferencesService {
    private defaultPrefs;
    constructor();
    load(source: PreferenceSource, externalUrl?: string): Promise<Preferences>;
    save(source: PreferenceSource, prefs: Preferences, externalUrl?: string): Promise<void>;
    private loadFromExternal;
    private saveToExternal;
    private loadFromLocalFile;
    private saveToLocalFile;
    private validateOrDefault;
    static ɵfac: i0.ɵɵFactoryDeclaration<PreferencesService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PreferencesService>;
}

declare class PreferencesComponent {
    prefs: Preferences | null;
    private service;
    source: PreferenceSource;
    externalUrl?: string;
    constructor();
    onSourceChange(payload: {
        source: PreferenceSource;
        externalUrl?: string;
    }): void;
    load(): Promise<void>;
    save(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PreferencesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PreferencesComponent, "app-preferences", never, {}, {}, never, never, true, never>;
}

declare class SourceChooserComponent {
    sourceChange: EventEmitter<{
        source: PreferenceSource;
        externalUrl?: string;
    }>;
    selected: PreferenceSource;
    externalUrl?: string;
    choose(s: PreferenceSource): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SourceChooserComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SourceChooserComponent, "app-source-chooser", never, {}, { "sourceChange": "sourceChange"; }, never, never, true, never>;
}

declare class PreferencesModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<PreferencesModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<PreferencesModule, never, [typeof PreferencesComponent, typeof SourceChooserComponent], [typeof PreferencesComponent, typeof SourceChooserComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<PreferencesModule>;
}

export { PreferencesComponent, PreferencesModule, PreferencesService, SourceChooserComponent };
export type { PreferenceSource, Preferences };
