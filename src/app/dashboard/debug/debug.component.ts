import { Component, OnInit, ViewChild } from '@angular/core';
import { RecordApi }                      from '../../shared/sdk/services/custom/Record.ts';
import { DataSample }                       from '../../shared/sdk/models/DataSample';
import { DataSampleApi }                       from '../../shared/sdk/services/custom/DataSample';
import { ClientApi }                    from '../../shared/sdk/services/custom/Client';
import { Record }                       from '../../shared/sdk/models/Record';
import { Dialog }                       from 'primeng/components/dialog/dialog';
import { Moment }  from "moment";


@Component({
    selector: 'debug',
    templateUrl: './debug.component.html'
})

export class DebugComponent  {
    constructor(
        private recordApi:RecordApi,
        private dataSampleApi: DataSampleApi
    ) {}

    regulateData(){
        this.recordApi.find({
            where:{
                dateTime:{
                    // gt: "2016-12-01T17:15:28.996Z",
                    lt: "2017-01-21T00:00:29.000Z"
                }
            }
        })
        .subscribe(
            _records=>{
                console.dir(_records);
                var dataList = _records;

                let formmatData = (samples:DataSample[]):any=>{
                    let combinedSamples = [];
                    var _samples = samples;

                    let findRemoveSample = (dateTime:string, sensorId):any=>{
                        let targetIndex = _samples.findIndex((sample)=>{
                            return sample.dateTime == dateTime && sample.sensorId == sensorId;
                        });
                        if(targetIndex == -1){
                            console.dir(_samples);
                            console.log("cannot find a index with target "+ sensorId + " " + dateTime);
                            return {value:[0]};
                            // throw new Error("cannot find a index with target "+ sensorId + " " + dateTime);
                        }
                        let obj = _samples.splice(targetIndex, 1);
                        if(obj[0].value[0] == null)
                            return {value:[0]};
                        if(obj[0] == null){
                            console.log(`targetIndex is ${targetIndex}`);
                            console.log(obj);
                            return {value:[0]};
                        }

                        return obj[0];
                    }

                    let getcombinedSampleWithSameTime = (mSample:DataSample)=>{
                        let result = {
                            timestamp:mSample.dateTime,
                            sensor1:findRemoveSample(mSample.dateTime, "2").value[0],
                            sensor2:findRemoveSample(mSample.dateTime, "3").value[0],
                            sensor3:findRemoveSample(mSample.dateTime, "4").value[0],
                            sensor4:findRemoveSample(mSample.dateTime, "5").value[0],
                            sensor5:findRemoveSample(mSample.dateTime, "6").value[0],
                            sensor6:findRemoveSample(mSample.dateTime, "1").value[0],
                        };
                        return result;
                    }
                    // let combineNext = ()=>{
                    //     if(_samples.length == 0)    return;
                    //     combinedSamples.push(getcombinedSampleWithSameTime(_samples[0]));
                    // }
                    while(_samples.length > 0 ){
                        combinedSamples.push(getcombinedSampleWithSameTime(_samples[0]));
                    }
                    console.dir(combinedSamples);

                    return combinedSamples;
                }

                let requestDataSamples = (record:Record)=>{
                    console.log(`I start working on record ${record.id}`);
                    console.dir(record);
                    if(record.processed){
                        console.log(` ${record.id} has been processed`);
                        console.log(record);
                        requestDataSamples(dataList.shift());
                        return;
                    }
                    this.dataSampleApi.find({
                        where:{
                            recordId:record.id
                        }
                    }).subscribe(dataSamples=>{
                        let dataSamplesLength = dataSamples.length;
                        if(dataSamples.length == 0 ){
                            this.recordApi.deleteById(record.id)
                            .subscribe(res=>{
                                requestDataSamples(dataList.shift());
                                console.log(`End  ${record.id} record regulation, because of the dataSamples.length == 0. Still have ${dataList.length} to go`)
                            },err=>{console.error(err);});
                            return;
                        }else{
                            console.log(`record ${record.id} have enough dataSamples (${dataSamples.length}). `);
                            console.dir(dataSamples);
                        }
                        let arrayOfCombined = formmatData(dataSamples)
                        record.duration = new Date(arrayOfCombined[arrayOfCombined.length-1].timestamp).getTime() -new Date(arrayOfCombined[0].timestamp).getTime();
                        record.dataTypes = "pressure,pressure,pressure,pressure,hall,none";
                        record.sensorIds = "1,2,3,4,5,6";
                        record.processed = true;
                        record.data = JSON.stringify(arrayOfCombined);
                        console.log(record);
                        console.log(`from length ${dataSamplesLength} to ${arrayOfCombined.length} old/6 = ${dataSamplesLength/6}`)
                        this.recordApi.replaceById(record.id, record)
                        .subscribe(record=>{
                            console.log(`End ${record.id} record regulation. Still have ${dataList.length} to go`);
                            requestDataSamples(dataList.shift());
                        },err=>{ console.error(err); })
                    },err=>{ console.error(err); })
                }

                requestDataSamples(dataList.shift());
            },
            err=>{ console.log(err); }
        );
    }
}
