import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Preferences, PreferenceSource } from './models';
import { PreferencesService } from './preferences.service';
import { SourceChooserComponent } from './source-chooser.component';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [CommonModule, FormsModule, SourceChooserComponent],
  templateUrl: './preferences.component.html',
})
export class PreferencesComponent {
  prefs: Preferences | null = null;
  private service = inject(PreferencesService);
  source: PreferenceSource = 'local-file';
  externalUrl?: string;

  constructor() {
    // initialize with defaults
    this.prefs = { theme: 'light', autosave: true, itemsPerPage: 20 };
  }

  onSourceChange(payload: { source: PreferenceSource; externalUrl?: string }) {
    this.source = payload.source;
    this.externalUrl = payload.externalUrl;
  }

  async load() {
    try {
      const loaded = await this.service.load(this.source, this.externalUrl);
      this.prefs = loaded;
    } catch (err) {
      console.error('Load failed', err);
      alert('Failed to load preferences: ' + (err as Error).message);
    }
  }

  async save() {
    if (!this.prefs) return;
    try {
      await this.service.save(this.source, this.prefs, this.externalUrl);
      alert('Preferences saved');
    } catch (err) {
      console.error('Save failed', err);
      alert('Failed to save preferences: ' + (err as Error).message);
    }
  }
}
