import { Component, Input, OnChanges } from '@angular/core';
import { ClientApi }                        from '../../shared/sdk/services/custom/Client';
import { Client }                           from '../../shared/sdk/models/Client';
import { RecordApi }                        from '../../shared/sdk/services/custom/Record';
import { Record }                           from '../../shared/sdk/models/Record';
import { Router, ActivatedRoute, Params }            from '@angular/router';

@Component({
    selector: 'record-edit-component',
    template: `
    <a class="btn btn-primary" routerLink="../" >Back</a>
    <quill-editor [(ngModel)]="editorContent"
          [config]="editorConfig"
          (ready)="onEditorCreated($event)"
          (change)="onContentChanged($event)"></quill-editor>
    <button *ngIf="changed" class="btn btn-primary"  (click)="submitChanges()" >Submit Changes</button>
    `
})

export class EditRecordComponent {
    record:Record;

    private qillObj:any;
    changed:boolean = false;

    private recordId:string;

    showSubmit:boolean = false;
    private editorContent = `<p>My HTML</p>`;
    private editorConfig = {
        placeholder: "输入公告内容，支持html"
    };

    constructor(
        private clientApi:ClientApi,
        private recordApi:RecordApi,
        private route: ActivatedRoute,
        private router:Router,
    ) {
        this.record = new Record()
        this.record.remarks = "";
        this.getClient();
    }

    getClient(){
        this.route.params.forEach((params: Params) => {
            this.recordId = params['id'];
            this.recordApi.findById(this.recordId,{})
            .subscribe(
                _record=>{
                    console.log(_record);
                    this.record = _record;
                    if(!this.record.remarks)
                        this.editorContent = "";
                    else
                        this.editorContent = this.record.remarks;
                    this.changed = false;
                },
                err=>{   console.log(err);     }
            );
          });
    }

    onEditorCreated(quill) {
        this.qillObj = quill;
        setTimeout(()=>{    this.changed = false;},100)
        console.log('this is quill object', quill);
    }

    onContentChanged({ quill, html, text }) {
        console.log(quill, html, text);
        if(this.editorContent != this.record.remarks)
            this.changed = true;
    }

    submitChanges(){
        let temp = new Client();
        temp.remarks = this.editorContent;
        this.recordApi.updateAttributes(this.record.id,temp)
        .subscribe(res=>{
            console.log(res);
            this.changed = false;
        },err=>{console.log(err);})
    }
}
