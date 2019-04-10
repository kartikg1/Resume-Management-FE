import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EmpService } from '../emp.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
declare var getAccessToken: any;
@Component({
  selector: 'app-common-dashboard',
  templateUrl: './common-dashboard.component.html',
  styleUrls: ['./common-dashboard.component.css']
})
export class CommonDashboardComponent implements OnInit {


  


  constructor(private ngxService: NgxUiLoaderService, private empService:EmpService,
    private router: Router, private data:DataService) { }
  email = "";
  UserId = "";
  Role = "";
  photoUrl = "";
  accessToken = "";

  Role2:string;
  Role3:string;
  Role4:string;


  ngOnInit() {
    
    // this.ngxService.start(); 
     getAccessToken();

    // setTimeout(() => {
    //   this.ngxService.stop(); 
    // }, 5000);

    
  }

  Redirect(){
    this.email = localStorage.getItem('userName');
    console.log(this.email,"ygadfgjfa");
    this.empService.getUserRole(this.email).subscribe((res:any)=> {
      console.log("RoleId",res[0].Roles[0].RoleId);
      console.log("employeeId",res[0].EmployeeId);
           
      this.Role = res[0].Roles[0].RoleId;
      localStorage.setItem('role', this.Role);
      this.redirectToDash(this.Role,res[0].EmployeeId);
      
    })

    
  }
  redirectToDash(role:string,EmployeeId : number)  {
    console.log("Updated",EmployeeId)
    console.log("ROle",role)
    if(role=="2") {
      this.Role2='2';

      this.data.passRoles(this.Role2);

      this.router.navigate(['/empInfo/' + EmployeeId]);
    }
    if(role=="3") {
      this.Role3='3';
      this.data.passRoles(this.Role3);
      this.router.navigate(['/view']);
    }
    if(role=="4") {
      this.Role4='4';
      this.data.passRoles(this.Role4);
      this.router.navigate(['/listemp']);
    }
  }
}
