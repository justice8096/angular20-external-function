import { EventEmitter } from '@angular/core';
import { PreferenceSource } from './models';
export declare class SourceChooserComponent {
    sourceChange: EventEmitter<{
        source: PreferenceSource;
        externalUrl?: string;
    }>;
    selected: PreferenceSource;
    externalUrl?: string;
    choose(s: PreferenceSource): void;
}
//# sourceMappingURL=source-chooser.component.d.ts.map