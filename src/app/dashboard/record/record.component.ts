import { Component }                        from '@angular/core';
import { ClientApi }                        from '../../shared/sdk/services/custom/Client';
import { Client }                           from '../../shared/sdk/models/Client';
import { RecordApi }                        from '../../shared/sdk/services/custom/Record';
import { Record }                           from '../../shared/sdk/models/Record';
import { DataSample }                       from '../../shared/sdk/models/DataSample';
import { DataSampleApi }                       from '../../shared/sdk/services/custom/DataSample';
import { Router, ActivatedRoute, Params }            from '@angular/router';
import { timeFix }                          from '../../shared/utils/timeFix';
import * as moment from "moment";


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
        private dataSampleApi:DataSampleApi
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

            this.recordApi.findById(this.recordId,{include:["client"]}).subscribe(
                _record=>{
                    this.record = _record;
                    this.record.dateTime = timeFix(this.record.dateTime);
                    this.dataSamples = this.record.dataSamples;
                    this.dataStr = _record.data;
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
    }

    keyDownListener:any;
}
