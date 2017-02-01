import { Component }                        from '@angular/core';
import { ClientApi }                        from '../../shared/sdk/services/custom/Client';
import { Client }                           from '../../shared/sdk/models/Client';
import { RecordApi }                        from '../../shared/sdk/services/custom/Record';
import { Record }                           from '../../shared/sdk/models/Record';
import { LoopBackFilter  }                 from '../../shared/sdk/models/BaseModels';
import { DataSample }                       from '../../shared/sdk/models/DataSample';
import { DataSampleApi }                       from '../../shared/sdk/services/custom/DataSample';
import { Router, ActivatedRoute, Params }            from '@angular/router';
import { timeFix }                          from '../../shared/utils/timeFix';
import * as moment from "moment";
import { RecordBuffer } from '../../shared/utils/serverBuffer';
import { formatMilliToMins } from '../../shared/utils/timeFix';

@Component({
    selector: 'record',
    templateUrl: './record.component.html',
    styleUrls: ['./record.component.scss']
})

export class RecordComponent {

    private client:Client = new Client();
    private record:Record = new Record();
    private dataStr:string = "[]";
    private dataSamples:DataSample[] = []
    private dataSamplesCount:number =  -1;
    private recordId:string = "";
    private downloadingData = false;
    private durationString:string="";

    private LABELS:string[] = [
        "Bike",
        "Inattention",
        "Rest",
        "Test_complete",
        "Hip_Pelvic_Shift",
        "Hip_Leave_Sit",
        "Hip_Pendulum_Movement",
        "Hip_Disconnection_Left",
        "Hip_Disconnection_Right",
        "Trunk_Lean_Stably",
        "Trunk_Lean_Evenly",
        "Trunk_Fall_Like_Pattern",
        "Trunk_Pendulum",
        "Fatigue",
        "Trunk_Leave_The_Lean",
        "Trunk_Disconnection_Left",
        "Trunk_Disconnection_Right",
        "Leg_coordinated"
    ];

    private calDataOption=[{
        name:"hall sensor relative time",
        enable:false
    }];




    ngOnDestroy(){
        document.body.removeEventListener(this.keyDownListener);
    }

    type = 'line';
    data = {
      datasets: [{
          label: "loading",
          data:[{x:3,y:3}]
      }]
    };
    options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                type: 'time',
                position: 'bottom',
                time: {
                    unit: 'minute',
                    displayFormats: {
                        minute: 'MMM YYYY h:mm:ss a'
                    }
                }
            }]
        },
        tooltips:false
    };

    calData:any = {
      datasets: [{
          label: "loading",
          data:[{x:3,y:3}]
      }]
    }

    constructor(
        private clientApi:ClientApi,
        private recordApi:RecordApi,
        private route: ActivatedRoute,
        private router:Router,
        private dataSampleApi:DataSampleApi,
        private recordBuffer:RecordBuffer
    ) {}

    ngOnInit() {
        this.getRecord();
        this.keyDownListener = document.body.addEventListener('keydown', (e)=> {
            if( e.keyCode == 13)
            {
                this.getRecord();
            }
        });​​​​​​​
    }

    getRecord(){
        this.route.params.forEach((params: Params) => {
            this.recordId = params['id'];

            this.recordBuffer.getRecordData(this.recordId)
            .subscribe(localDbRecord=>{
                console.log("record from local db");
                console.log(localDbRecord);

                let filter:LoopBackFilter={include:["client"]}
                if(localDbRecord != undefined ){
                    filter.fields = {data:false};
                }

                this.recordApi.findById(this.recordId,filter).subscribe(
                    _record=>{
                        console.log("request sucess");
                        this.record = _record;
                        this.record.dateTime = timeFix(this.record.dateTime);
                        this.dataSamples = this.record.dataSamples;
                        console.log("I got record");
                        console.dir(_record);
                        this.durationString = formatMilliToMins(_record.duration*1);
                        if(localDbRecord== undefined){
                            this.dataStr = _record.data;
                            if(Date.now() - new Date(_record.dateTime).getTime() > 1900000 ){
                                this.recordBuffer.add(_record)
                                .subscribe(res=>{console.log("sucess")}, err=>{console.log(err);})
                            }
                        }else{
                            this.dataStr = localDbRecord.data;
                            _record.data = localDbRecord.data;
                            this.recordBuffer.put(_record)
                            .subscribe(res=>{console.log("sucess")}, err=>{console.log(err);})
                        }
                        console.log("record from server");
                        console.dir(_record);

                        if(Date.now() -new Date(this.record.dateTime).getTime() < 60000*25){
                            console.log("I will auto update ");
                            setTimeout(()=>{
                                this.getRecord();
                            },60000);
                        }
                    },
                    err=>{   console.log(err);     }
                );
            });
        });
    }

    keyDownListener:any;


    private getLabelString(fieldName){
        if(this.record[fieldName] == undefined || this.record[fieldName]  == "")
            return "Not Yet Labeled";
        if(this.record[fieldName] === true)
            return "True";
        if(this.record[fieldName] === false)
            return "False";
        return this.record[fieldName];
    }
}
