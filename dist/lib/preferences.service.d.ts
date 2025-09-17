import { Preferences, PreferenceSource } from './models';
export declare class PreferencesService {
    private defaultPrefs;
    constructor();
    load(source: PreferenceSource, externalUrl?: string): Promise<Preferences>;
    save(source: PreferenceSource, prefs: Preferences, externalUrl?: string): Promise<void>;
    private loadFromExternal;
    private saveToExternal;
    private loadFromLocalFile;
    private saveToLocalFile;
    private validateOrDefault;
}
//# sourceMappingURL=preferences.service.d.ts.map