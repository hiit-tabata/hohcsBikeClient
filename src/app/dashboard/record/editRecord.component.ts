import { Component, Input, OnChanges } from '@angular/core';
import { ClientApi }                        from '../../shared/sdk/services/custom/Client';
import { Client }                           from '../../shared/sdk/models/Client';
import { RecordApi }                        from '../../shared/sdk/services/custom/Record';
import { Record }                           from '../../shared/sdk/models/Record';
import { Router, ActivatedRoute, Params }            from '@angular/router';

@Component({
    selector: 'record-edit-component',
    templateUrl: './Edit.Record.component.html',
    styleUrls: ['./Edit.Record.component.scss']
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

    private Bike_options = [{label:'Select Options', value:null},
                            {label:'Bike_Strong', value:"Bike_Strong"},
                            {label:'Bike_Moderate', value:"Bike_Moderate"},
                            {label:'Bike_Weak', value:"Bike_Weak"},];
    private Trunk_Lean_Evenly_options
        = [{label:'Select Options', value:null},
        {label:'Evenly', value:"Evenly"},
        {label:'Left_Predorminantly', value:"Left_Predorminantly"},
        {label:'Right_Predominantly', value:"Right_Predominantly"},]
        
    private Leg_coordinated_options
        = [{label:'Select Options', value:null},
        {label:'Coordinated', value:"Coordinated"},
        {label:'Most_Of_The_Time', value:"Most_Of_The_Time"},
        {label:'Not_Coordinated', value:"Not_Coordinated"},]

    constructor(
        private clientApi:ClientApi,
        private recordApi:RecordApi,
        private route: ActivatedRoute,
        private router:Router,
    ) {
        this.record = new Record()
        this.record.remarks = "";
        this.getRecord();
    }

    getRecord(){
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
        this.record.remarks = this.editorContent;
        this.recordApi.updateAttributes(this.record.id, this.record)
        .subscribe(res=>{
            console.log(res);
            this.changed = false;
            this.getRecord();
        },err=>{console.log(err);})
    }
    onLabelChanges(e){
        this.record.labeledDate = "" + new Date().getTime();
        this.changed = true;
    }
}
