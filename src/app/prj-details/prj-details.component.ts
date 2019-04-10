import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef, ɵConsole } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
//import { MatDialog, MatDialogConfig,MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';
import {project} from 'src/app/project.model';
//import { projectDetails } from "../projectDetails";
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { DatePipe } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
//import { emp } from '../emp.model';

@Component({
  selector: 'app-prj-details',
  templateUrl: './prj-details.component.html',
  styleUrls: ['./prj-details.component.css'],

})
export class PrjDetailsComponent implements OnInit {

  
  employee: project;
  state: string = 'small';
  model: any = {};
  errorMessage: any;
  tech:string[]=['Angular', 'Dot Net', 'Python', 'Java', 'C', 'C#', 'Big Data'];
  SelectedTech: String;
  start:Date;
  end:Date;
  @ViewChild('f') form;
  setDob: string;
  animateMe() {
    this.state = (this.state === 'small' ? 'large' : 'small');
  }
  panelOpenState = false;
  projectDtl: project[];
  dataavailable: Boolean = false;
  projectDescription: string;
  projectid:number;
  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<PrjDetailsComponent>,
    private dataservice: ProjectService,
    private toaster: ToastrService,
    private dialog:MatDialog,
  ) { }
  ngOnInit() {
    this.LoadDataToProjectDetails(this.data.PId, this.data.ProjectDesc);
    this.LoadEmployeeID();
    console.log(this.data);
  }
  LoadDataToProjectDetails(PId : any, projectDescription:string) {
    this.dataservice.getProjectDetails(PId).subscribe((tempdata) => {
      this.projectDtl = tempdata as project [];
      this.projectDescription = projectDescription;
      this.projectid=PId;
      console.log(this.projectDescription);
      if (this.projectDtl.length > 0) {
        this.dataavailable = true;
      }
      else {
        this.dataavailable = false;
        this.toaster.error("Data is not available for this project.");
        console.log("No");
      }
    },
    
    )
      
  }


  AddMember(form: NgForm) {
    this.dataservice.postMember(form.value).subscribe(res => {
      //add something here
    })
  }

  LoadEmployeeID() {
    this.dataservice.getEmployeeID().subscribe(res => {
      console.log(res);
    })
  }

  ShowFail() {
    this.toaster.error('Check the details', 'Major Error');
  }
  showSuccess() {
    this.toaster.success('Data is successfully loaded', 'Data stored!');
  }

  AddMemberToProject(form: NgForm) {
    console.log(form.value);

    console.log(form.value);


   
    
    const productData = new FormData();
    productData.append('ProjectId', this.projectid.toString());
    productData.append('EmployeeEmail', form.value.EmployeeEmail);
    productData.append('EmployeeTech', form.value.EmployeeTech);
    productData.append('Role', form.value.Role);
    productData.append('EmployeeStartDate', form.value.EmployeeStartDate);
    productData.append('EmployeeEndDate', form.value.EmployeeEndDate);
    //console.log(values.sdate);  
    this.dataservice.AddEmployee(productData).subscribe(res => {
     // console.log(res.toString());
     //this.resetForm(form);
     this.toaster.success("Employee Added");
     //this.dialogRef.close();
     
     //this.dialogRef.updatePosition();
     //console.log(this.data);
     //this.dialog.open(this.data);
     //this.view(form.value.projectId);
     this.ngOnInit();
    // this.LoadDataToProjectDetails(this.data);
     
    },
      err => {
        //this.ShowFail();
       // this.resetForm(form);
       //this.toaster.error("Email is invalid");
        //console.log("email invalid First  line");
        if(err.status==400)
        {
          this.toaster.success("Err! Added");
        }
        this.ngOnInit();
        //console.log("email invalid last  line");

      }
    );
    this.LoadDataToProjectDetails(this.data.PId, this.data.ProjectDesc);
    //put toaster for successfull addition
    // this.showSuccess();

  }

  

  DeleteFromProject(pId:number, id:number) {

     //let pId=this.projectid;
    console.log(id);
    console.log("PID"+pId);
    this.dataservice.Delete(pId, id).subscribe(res => {
      this.ngOnInit();
      console.log("Deleted successfully!");
      this.toaster.success("Employee deleted from Project");
    })
    this.LoadDataToProjectDetails(this.data.PId, this.data.ProjectDesc);
  }

  ReleaseFromProject(pId:number, id:number) {

    //let pId=this.projectid;
    console.log(id);
    console.log("PID"+pId);
    this.dataservice.Release(pId, id).subscribe(res => {
    this.ngOnInit();
    this.toaster.success("Success");
    })
    this.LoadDataToProjectDetails(this.data.PId,this.data.ProjectDesc);
    }

}
