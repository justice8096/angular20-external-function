var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
let SourceChooserComponent = class SourceChooserComponent {
    constructor() {
        this.sourceChange = new EventEmitter();
        this.selected = 'local-file';
    }
    choose(s) {
        this.selected = s;
        this.sourceChange.emit({ source: s, externalUrl: this.externalUrl });
    }
};
__decorate([
    Output(),
    __metadata("design:type", Object)
], SourceChooserComponent.prototype, "sourceChange", void 0);
SourceChooserComponent = __decorate([
    Component({
        selector: 'app-source-chooser',
        standalone: true,
        imports: [CommonModule, FormsModule],
        template: `
    <div>
      <label>
        <input type="radio" name="source" value="local-file" (change)="choose('local-file')" checked /> Local File
      </label>
      <label>
        <input type="radio" name="source" value="external-service" (change)="choose('external-service')" /> External Service
      </label>
      <div *ngIf="selected === 'external-service'">
        <input placeholder="External URL" [(ngModel)]="externalUrl" />
      </div>
    </div>
  `,
    })
], SourceChooserComponent);
export { SourceChooserComponent };
