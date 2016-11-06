import { Component, OnInit } from '@angular/core';
import { ClientApi }         from '../../shared/sdk/services/custom/Client';
import { Client }            from '../../shared/sdk/models/Client';
import { RecordApi }         from '../../shared/sdk/services/custom/Record';
import { Record }            from '../../shared/sdk/models/Record';
import { Router, ActivatedRoute, Params }            from '@angular/router';
import {ElementRef, Renderer, ViewChild} from '@angular/core';
import { DataSample }                       from '../../shared/sdk/models/DataSample';
import { DataSampleApi }                       from '../../shared/sdk/services/custom/DataSample';

@Component({
	selector: 'home-cmp',
  styleUrls: ['./home.component.scss'],
	templateUrl: 'home.component.html'
})

export class HomeComponent {
	private records:Record[] = [];
	private recordsDataSamplesCount:any= {};

	constructor(
			private clientApi:ClientApi,
			private recordApi:RecordApi,
			private route: ActivatedRoute,
			private dataSampleApi:DataSampleApi,
			private router:Router,
			private renderer: Renderer
	) {}

	ngOnInit() {
			this.getRecords();
	}

	public getRecords(){
		this.recordsDataSamplesCount = {};
		this.recordApi.find({
			where:{
				dateTime:{
					gt: Date.now() - 1000*60*60*24*7 //7 days
				}
			},
			include:["client"]
		}).subscribe(
				_records=>{
						this.records = _records;
						for(let record of _records){
							this.recordsDataSamplesCount[record.id] = "loading";
							this.dataSampleApi.count({
								recordId:record.id
							}).subscribe(result=>{
								this.recordsDataSamplesCount[record.id] = result.count;
							});
						}
				},
				err=>{ console.log(err); }
		);
	}
}
