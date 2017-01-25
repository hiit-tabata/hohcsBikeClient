import { Component, Input, OnChanges } from '@angular/core';
import { ClientApi }                        from '../../shared/sdk/services/custom/Client';
import { Client }                           from '../../shared/sdk/models/Client';
import { RecordApi }                        from '../../shared/sdk/services/custom/Record';
import { Record }                           from '../../shared/sdk/models/Record';

@Component({
    selector: 'editClient-component',
    template: `
    <a routerLink="../" >Back</a>
    <quill-editor [(ngModel)]="editorContent"
          [config]="editorConfig"
          (ready)="onEditorCreated($event)"
          (change)="onContentChanged($event)"></quill-editor>
    <button (click)="submitChanges()" >Submit Changes</button>
    `
})

export class EditClientComponent {
    @Input() record:Record;

    private isChanged:boolean = false;
    private editorContent = `<p>My HTML</p>`;
    private editorConfig = {
        placeholder: "输入公告内容，支持html"
    };

    constructor(
        private clientApi:ClientApi,
        private recordApi:RecordApi
    ) {}


    onEditorCreated(quill) {
      console.log('this is quill object', quill);
    }

    onContentChanged({ quill, html, text }) {
        this.isChanged = true;
        console.log(quill, html, text);
    }

    submitChanges(){

    }
}
