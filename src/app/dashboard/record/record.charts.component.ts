import { Component, OnInit, Input, OnChanges } from '@angular/core';


interface dataSample{
    sensor1:"405.3479919433594"
    sensor2:"3.2234432697296143",
    sensor3:"4.029304027557373",
    sensor4:"48.35165023803711",
    sensor5:"0.0",
    sensor6:"0",
    timestamp:"2017-01-22T02:45:29.736"
}

@Component({
    selector: 'RecordCharts',
    styleUrls: ['./record.charts.component.scss'],
    templateUrl: './record.charts.component.html'
})

export class RecordChartsComponent implements OnChanges{
    @Input() dataStr:string="";
    private data:dataSample[] = [];
    options:any[] = [];
    private hoverEnable:boolean = false;

    constructor() {
        const sensorName = ["left back","right back","right hip", "left hip", "hall"];
        for(let i = 0; i < 5; i++){
            this.options[i] = {
                chart: {
                    type: 'area'
                },
                title : {
                    text : sensorName[i],
                    align: 'left',
                    margin: 0,
                    x: 30
                },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: false
                },
                series: [{
                    name: 's1',
                    data: [[Date.now()-22000,50],[Date.now()-1500,50],[Date.now(),50]],
                    allowPointSelect: true,
                    fillOpacity: 0.3,
                }],
                xAxis: {
                    crosshair: true,
                    events: {
                        // setExtremes: this.syncExtremes
                    },
                    // labels: {
                    //     format: '{value} km'
                    // }
                    type: "datetime"
                },
                yAxis: {
                    title: {
                        text: null
                    },
                    min: 0,
                    max: 2000
                },
                plotOptions: {
                    area: {
                        marker: {
                            radius: 2
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                },
                tooltip: {
                    positioner: function () {
                        return {
                            x: this.chart.chartWidth - this.label.width, // right aligned
                            y: -1 // align to title
                        };
                    },
                    borderWidth: 0,
                    backgroundColor: 'none',
                    pointFormat: '{point.y}',
                    headerFormat: '',
                    shadow: false,
                    style: {
                        fontSize: '18px'
                    },
                    valueDecimals: 1
                },
            };
        }
        this.options[4].yAxis.max=2;
    }

    charts: any[] = [];

    saveChart(chart, id) {
      this.charts[id] = chart;
    }

    onChartOver(e) {
        if(!this.hoverEnable)
            return;
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

    ngOnChanges(changes){
        if(this.dataStr == "" || !this.dataStr ){
            console.log(`The JSon string ${this.dataStr}`);
            console.log(this.dataStr);
            return;
        }else
            console.log(`I got string with length ${this.dataStr.length}`)

        this.data = JSON.parse(this.dataStr);


        let dataSet:any[][] = [[],[],[],[],[]];
        console.log( this.data[0]);
        for(let i = 0 ; i < this.data.length; i++)
            if(i%2 == 0){
                let dataSample = this.data[i];
                for(let j = 0; j< dataSet.length; j++){
                    dataSet[j].push([
                        new Date(dataSample["timestamp"]).getTime(),
                        dataSample["sensor"+(j+1)]?(+dataSample["sensor"+(j+1)]):0
                    ]);
                }
            }

        console.log(dataSet);
        for(let i = 0; i < this.charts.length; i++){
            this.charts[i].series[0].setData(dataSet[i]);
        }
    }


}
