import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PreferenceSource } from './models';

@Component({
  selector: 'app-source-chooser',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './source-chooser.component.html',
})
export class SourceChooserComponent {
  @Output() sourceChange = new EventEmitter<{ source: PreferenceSource; externalUrl?: string }>();
  selected: PreferenceSource = 'local-file';
  externalUrl?: string;

  choose(s: PreferenceSource) {
    this.selected = s;
    this.sourceChange.emit({ source: s, externalUrl: this.externalUrl });
  }
}
