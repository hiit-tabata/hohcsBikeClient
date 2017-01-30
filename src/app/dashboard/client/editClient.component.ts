import { Component, Input, OnChanges } from '@angular/core';
import { ClientApi }                        from '../../shared/sdk/services/custom/Client';
import { Client }                           from '../../shared/sdk/models/Client';
import { RecordApi }                        from '../../shared/sdk/services/custom/Record';
import { Record }                           from '../../shared/sdk/models/Record';
import { Router, ActivatedRoute, Params }            from '@angular/router';


@Component({
    selector: 'editClient-component',
    templateUrl: './edit.client.component.html'
})

export class EditClientComponent {
    client:Client;
    Waking_ability_options = [{label:'Select Options', value:null},
                              {label:'High_performer', value:"High_performer"},
                              {label:'Walk_Unaided', value:"Walk_Unaided"},
                              {label:'Walk_With_Stick', value:"Walk_With_Stick"},
                              {label:'Walk_With_Quadripod', value:"Walk_With_Quadripod"},
                              {label:'Walk_With_Frame', value:"Walk_With_Frame"},
                              {label:'Cannot_Walk', value:"Cannot_Walk"},];
    Mobilize_From_Chair_options = [{label:'Select Options', value:null},
                              {label:'Independent', value:"Independent"},
                              {label:'Mild_Assistance', value:"Mild_Assistance"},
                              {label:'CANNOT', value:"CANNOT"},];
    Hip_options= [{label:'Select Options', value:null},
                              {label:'Stable', value:"Stable"},
                              {label:'Stable_But_High_Risk_Feature', value:"Stable_But_High_Risk_Feature"},
                              {label:'Functional_Deficit_But_Well_Adapted', value:"Functional_Deficit_But_Well_Adapted"},
                              {label:'Unstable', value:"Unstable"},];
    Trunk_options = [{label:'Select Options', value:null},
                              {label:'Stable', value:"Stable"},
                              {label:'Stable_But_High_Risk_Feature', value:"Stable_But_High_Risk_Feature"},
                              {label:'Functional_Deficit_But_Well_Adapted', value:"Functional_Deficit_But_Well_Adapted"},
                              {label:'Unstable', value:"Unstable"},];

    private qillObj:any;
    changed:boolean = false;

    private clientId:string;

    showSubmit:boolean = false;
    private editorContent = `<p>My HTML</p>`;
    private editorConfig = {
        placeholder: "输入公告内容，支持html"
    };

    private willUpdateClient = new Client();

    constructor(
        private clientApi:ClientApi,
        private recordApi:RecordApi,
        private route: ActivatedRoute,
        private router:Router,
    ) {
        this.client = new Client()
        this.client.remarks = "";
        this.getClient();
    }

    getClient(){
        this.route.params.forEach((params: Params) => {
            this.clientId = params['id'];
            this.clientApi.findById(this.clientId,{})
            .subscribe(
                _client=>{
                    console.log(_client);
                    this.client = _client;
                    if(!this.client.remarks)
                        this.editorContent = "";
                    else
                        this.editorContent = this.client.remarks;
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
        if(this.editorContent != this.client.remarks)
            this.changed = true;
    }

    submitChanges(){
        // let temp = new Client();
        // temp.remarks = this.editorContent;
        this.client.remarks = this.editorContent;
        this.clientApi.updateAttributes(this.client.id,this.client)
        .subscribe(res=>{
            console.log(res);
            this.changed = false;
            this.getClient();
        },err=>{console.log(err);})
    }

    onLabelChanges(e){
        this.client.labeledDate = "" + new Date().getTime();
        console.log(this.client);
        this.changed = true;
    }
}
