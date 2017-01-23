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
    private showRawData:boolean = false;
    private sensorEnable:boolean[]=[false,false,false,true,false,false];
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

           this.dataSampleApi.count({
               recordId:params['id']
           }).subscribe(_count=>{
               this.dataSamplesCount= _count.count;
           });

           //plot the data
           this.updateSensorData();
        });
    }

    keyDownListener:any;

    toggleSensor(index:number){
        if(this.downloadingData) return;
        for(let i = 0 ; i < this.sensorEnable.length; i++)
            this.sensorEnable[i] = false;
        this.sensorEnable[index] = true;
        this.updateSensorData();
    }

    //open the cal data tab
    chooseCalResult(index:number){
        if(this.downloadingData) return;
        for(let item of this.calDataOption)
            item.enable = false;
        this.calDataOption[index].enable = true;
        switch(index){
            case 0:
                this.calHallRelativeTime();
                break;

        }
    }

    calHallRelativeTime(){
        this.downloadingData = true;
        this.dataSampleApi.find({
            where:{
                sensorId: 6,
                recordId:this.recordId
            }
        }).subscribe(result=>{
            console.log(result);

            this.calData={
                datasets:[{
                    label: this.calDataOption[0].name,
                    data:[],
                    backgroundColor: '#000000',
                    pointHoverRadius:0,
                    pointRadius:0,
                    pointHitRadius:0,
                    pointHoverBorderWidth:0,
                    pointBorderWidth:0
                }]
            };

            let lastHallRecordTime;
            for(let sample of result){
                if(sample.value[0] != 0){
                    if(!lastHallRecordTime){
                        lastHallRecordTime = sample.dateTime;
                        continue;
                    }
                    this.calData.datasets[0].data.push({
                        x:sample.dateTime,
                        y: (new Date(sample.dateTime) ).getTime() - (new Date(lastHallRecordTime) ).getTime()
                    });
                    lastHallRecordTime = sample.dateTime;
                }
            }
            this.downloadingData = false;
        });
    }


    //redownlaod the data
    updateSensorData(){
        return;
        /*
        console.log("updateSensorData");
        let filter = {where:{
            or:[]
        }};
        for (let sensor = 0 ; sensor<6; sensor++)
            if(this.sensorEnable[sensor])
                filter.where.or.push({
                    sensorId: ( sensor + 1),
                    recordId:this.recordId
                });

        this.downloadingData = true;
        this.dataSampleApi.find(filter).subscribe(result=>{
           let tmp={};

           let theColor = [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ];

            this.data={
                datasets:[]
            };

            let sensorName = ["none", "left back", "right back", "right pat", "left pat", "hall"];

            for (let sensor = 0 ; sensor<6; sensor++){
                if(this.sensorEnable[sensor]){
                    tmp[(sensor+1)] = {
                        label: sensorName[sensor],
                        data:[],
                        backgroundColor:  theColor.shift(),
                        pointHoverRadius:0,
                        pointRadius:0,
                        pointHitRadius:0,
                        pointHoverBorderWidth:0,
                        pointBorderWidth:0
                    };
                }
            }

            let tmpCounter = 0
            for(let data of result){
                tmp[data.sensorId].data.push({
                    y:data.value[0],
                    x:data.dateTime//(new Date(data.dateTime)).getTime()
                });
            }

            for(let lineName in tmp){
                this.data.datasets.push(tmp[lineName]);
            }
            this.downloadingData = false;
        });
        */
    }
}
