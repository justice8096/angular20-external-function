import { Injectable } from '@angular/core';
import { Preferences, PreferenceSource } from './models';

@Injectable({ providedIn: 'root' })
export class PreferencesService {
  // Default preferences
  private defaultPrefs: Preferences = {
    theme: 'light',
    autosave: true,
    itemsPerPage: 20,
  };

  constructor() {}

  async load(source: PreferenceSource, externalUrl?: string): Promise<Preferences> {
    if (source === 'local-file') return this.loadFromLocalFile();
    return this.loadFromExternal(externalUrl);
  }

  async save(source: PreferenceSource, prefs: Preferences, externalUrl?: string): Promise<void> {
    if (source === 'local-file') return this.saveToLocalFile(prefs);
    return this.saveToExternal(prefs, externalUrl);
  }

  private async loadFromExternal(url?: string): Promise<Preferences> {
    if (!url) throw new Error('External URL required');
    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) throw new Error(`Failed to load prefs: ${res.status}`);
    const json = await res.json();
    return this.validateOrDefault(json);
  }

  private async saveToExternal(prefs: Preferences, url?: string): Promise<void> {
    if (!url) throw new Error('External URL required');
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prefs),
    });
    if (!res.ok) throw new Error(`Failed to save prefs: ${res.status}`);
  }

  private async loadFromLocalFile(): Promise<Preferences> {
    // Uses the File System Access API when available in the browser
    if (!(window as any).showOpenFilePicker) {
      throw new Error('File System Access API not available in this environment');
    }

    const [handle] = await (window as any).showOpenFilePicker({
      types: [{ description: 'JSON', accept: { 'application/json': ['.json'] } }],
      multiple: false,
    });
    const file = await handle.getFile();
    const text = await file.text();
    const json = JSON.parse(text);
    return this.validateOrDefault(json);
  }

  private async saveToLocalFile(prefs: Preferences): Promise<void> {
    if (!(window as any).showSaveFilePicker) {
      throw new Error('File System Access API not available in this environment');
    }

    const handle = await (window as any).showSaveFilePicker({
      suggestedName: 'preferences.json',
      types: [{ description: 'JSON', accept: { 'application/json': ['.json'] } }],
    });
    const writable = await handle.createWritable();
    await writable.write(JSON.stringify(prefs, null, 2));
    await writable.close();
  }

  private validateOrDefault(obj: any): Preferences {
    if (!obj || typeof obj !== 'object') return this.defaultPrefs;
    const theme = obj.theme === 'dark' ? 'dark' : 'light';
    const autosave = typeof obj.autosave === 'boolean' ? obj.autosave : this.defaultPrefs.autosave;
    const itemsPerPage = Number.isInteger(obj.itemsPerPage) ? obj.itemsPerPage : this.defaultPrefs.itemsPerPage;
    return { theme, autosave, itemsPerPage };
  }
}
