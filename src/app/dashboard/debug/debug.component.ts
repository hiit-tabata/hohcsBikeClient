import { Component, OnInit, ViewChild } from '@angular/core';
import { UserApi }                      from '../../shared/sdk/services/custom/User.ts';
import { ClientApi }                    from '../../shared/sdk/services/custom/Client';
import { Client }                       from '../../shared/sdk/models/Client';
import { Dialog }                       from 'primeng/components/dialog/dialog';


@Component({
    selector: 'debug',
    templateUrl: './debug.component.html'
})

export class DebugComponent implements OnInit {
    constructor() {
        for(let i = 0; i < 5; i++){
            this[`sensor${i}Options`] = {
                title : { text : `angular2-highcharts ${i} example` },
                series: [{
                    name: 's1',
                    data: [2,3,5,8,13],
                    allowPointSelect: true
                }],
                xAxis: {
                    crosshair: true,
                    events: {
                        setExtremes: this.syncExtremes
                    },
                    labels: {
                        format: '{value} km'
                    }
                },
            };
        }
    }
    sensor0Options: any;
    sensor1Options: any;
    sensor2Options: any;
    sensor3Options: any;
    sensor4Options: any;
    charts: any[] = [];
    saveChart(chart, id) {
      this.charts[id] = chart;
    }
    onChartOver(e) {
        for(let chart of this.charts){
            // Find coordinates within the
            let event = chart.pointer.normalize(e);
            // Get the hovered point
            let point = chart.series[0].searchPoint(event, true);
            if (point) {
                point.onMouseOver(); // Show the hover marker
                point.series.chart.xAxis[0].update();
            }
        }
    }

    syncExtremes(e) {
        if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
            for(let i in this.charts){
                if(i == "0") continue;
                let chart = this.charts[i];
                if (chart.xAxis[0].setExtremes) { // It is null while updating
                    chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, { trigger: 'syncExtremes' });
                }
            }
        }
    }

    ngOnInit() {}
}
