import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import {EmpService} from '../emp.service';
import { Tech } from '../tech.model';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {

  data:any;
  data2:any;
  tech:any;
  Technology : String[];
  xyz= new Array();
  loading:boolean=false;
  count1= new Array();
  
  constructor(private route : Router, private emp:EmpService) {



    this.emp.getEmployeeTechCount().subscribe( res =>
      {
        //this.tech= res;
        //console.log(this.tech);
        this.tech=[...res];
        //console.log(this.tech[0].Tech);

        for(let i=0;i<3;i++)
        {
           // this.Technology[i]=this.tech[i].Tech;
           this.xyz.push(res[i].Tech);
            console.log(i);
        }

        console.log("hello")
       // console.log(this.xyz);
        //console.log(res[0].Tech)
        //console.log(this.Technology[2])
        
        for(let x in this.tech[0])
        {
        //console.log(this.tech.id[2]);
        }
      });
  

    this.data = {
      
      labels : this.xyz,
      
      datasets: [
          {
              data: this.count1,
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }]    
      };
      console.log("constructor"+this.data.labels);

      this.data2 = {
        labels: ['Frontend','Backend','Data'],
        datasets: [
            {
                data: [20, 40, 80],
                
                backgroundColor: [
                    "#E9967A",
                    "#36A2EB",
                    "#2323C4"
                    
                ],
                hoverBackgroundColor: [
                    "#006400",
                    "#696969",
                    "#23AFC4"
                    
                ]
            }]    
        };
        //console.log("pie"+ this.data2.datasets[data]);
}



   

  ngOnInit() {

    this.emp.getEmployeeTechCount().subscribe( res =>
      {
        //this.tech= res;
        //console.log(this.tech);
        this.tech=[...res];
        //console.log(this.tech[0].Tech);

        for(let i=0;i<3;i++)
        {
           // this.Technology[i]=this.tech[i].Tech;
           this.xyz.push(res[i].Tech);
            console.log(i);
        }

        for(let i=0;i<3;i++)
        {
           // this.Technology[i]=this.tech[i].Tech;
           this.count1.push(res[i].Count);
            console.log(i);
        }

        console.log(this.data.labels)
        this.data.labels=this.xyz;
        this.data.datasets.data=this.count1;
        console.log(this.data.datasets.data);
       
      });
  }

}
