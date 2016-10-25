import { Component }                        from '@angular/core';
import { ClientApi }                        from '../../shared/sdk/services/custom/Client';
import { Client }                           from '../../shared/sdk/models/Client';
import { RecordApi }                        from '../../shared/sdk/services/custom/Record';
import { Record }                           from '../../shared/sdk/models/Record';
import { DataSample }                       from '../../shared/sdk/models/DataSample';
import { Router, ActivatedRoute, Params }            from '@angular/router';

@Component({
    selector: 'record',
    templateUrl: './record.component.html'
})

export class RecordComponent {

    private client:Client = new Client();
    private record:Record = new Record();
    private dataSamples:DataSample[] = []
    private recordId:string = "";


    constructor(
        private clientApi:ClientApi,
        private recordApi:RecordApi,
        private route: ActivatedRoute,
        private router:Router
    ) {}

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.recordId = params['id'];

            //this.carService.getCarsMedium().then(cars => this.cars = cars);
            this.recordApi.findById(this.recordId,{include:["client", "dataSamples"]}).subscribe(
                _record=>{
                    this.record = _record;
                    this.dataSamples = this.record.dataSamples;
                    console.log(JSON.stringify(this.record));
                },
                err=>{   console.log(err);     }
            );
          });

    }
}
