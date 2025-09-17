import { NgModule } from '@angular/core';
import { PreferencesComponent } from './preferences.component';
import { SourceChooserComponent } from './source-chooser.component';
import { PreferencesService } from './preferences.service';

@NgModule({
  imports: [PreferencesComponent, SourceChooserComponent],
  exports: [PreferencesComponent, SourceChooserComponent],
  providers: [PreferencesService],
})
export class PreferencesModule {}
