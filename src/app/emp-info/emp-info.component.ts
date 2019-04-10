import { Component, OnInit, OnDestroy } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { emp } from '../emp.model';
import { EmpService } from '../emp.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { DashComponent } from '../dash/dash.component';
import { project } from '../project.model';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { NgForm } from '@angular/forms';
import { EditPersonalInfoComponent } from '../edit-personal-info/edit-personal-info.component';

@Component({
  selector: 'app-emp-info',
  templateUrl: './emp-info.component.html',
  styleUrls: ['./emp-info.component.css']
})
export class EmpInfoComponent implements OnDestroy, OnInit {

  bool: boolean;
  visib: string;

  employee: emp;
  isLoadingResults: boolean;
  viewId: number;
  private sub: any;
  e: emp;
  empProjects: project[];

  constructor(private details: EmpService,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.viewId = +params['id'];
    });
    this.getEmployeeProjectDetails(this.viewId);
    this.loadEmpDetails(this.viewId);
    this.bool = true;
    this.visib = "hidden";
    this.getEmployeeDetails(this.viewId);
    console.log("hello");
    console.log(this.viewId);
    console.log("hello2");
  }


  loadEmpDetails(Id: number) {
    this.details.getEmployeeById(Id).subscribe(res => {
      this.employee = res;
    })
  }



  downloadPDF() {
    var data = document.getElementById('resume');
    html2canvas(data).then(canvas => {
      var imgWidth = 370;
      var pageHeight = 370;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a2'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save(this.employee.EmployeeName + '_Resume.pdf'); // Generated PDF
    });
  }

  getEmployeeDetails(id: number) {
    this.details.getEmployeeById(id)
      .subscribe(data => {
        this.e = data;
        this.employee = this.e;
        console.log(this.e);
        console.log("employee");
        this.isLoadingResults = false;
      });
  }

  show() {
    this.bool = false;
  }

  Save(form: NgForm, id: number) {
    this.details.updateEmployeeDetails(form.value, this.employee.EmployeeId).subscribe(res => {
      this.bool = true;
      console.log(this.employee.EmployeeId);

    })
  }

  getEmployeeProjectDetails(id: number) {


    this.details.getEmployeeProjectDetails(id)
      .subscribe(data => {
        this.empProjects = data;
        console.log(this.empProjects);
        this.isLoadingResults = false;
      });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  EditPersonalInfo(viewId: any) {
    const dialogConfig1 = new MatDialogConfig();
    dialogConfig1.autoFocus = true;
    dialogConfig1.disableClose = true
    dialogConfig1.width = "90%";
    dialogConfig1.data = this.employee;
    this.dialog.open(EditPersonalInfoComponent, dialogConfig1);
  }
}
