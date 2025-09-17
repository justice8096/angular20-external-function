import { Preferences, PreferenceSource } from './models';
export declare class PreferencesComponent {
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
}
//# sourceMappingURL=preferences.component.d.ts.map