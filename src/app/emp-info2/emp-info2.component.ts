import { Component, OnInit } from '@angular/core';
import { EmpService } from '../emp.service';
import { emp } from '../emp.model';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { EditPersonalInfoComponent } from '../edit-personal-info/edit-personal-info.component';

@Component({
  selector: 'app-emp-info2',
  templateUrl: './emp-info2.component.html',
  styleUrls: ['./emp-info2.component.css']
})
export class EmpInfo2Component implements OnInit {
  empProjects: emp[];
  constructor(private service: EmpService, private dialog: MatDialog) { }
  employee: any;

  ngOnInit() {
    this.empProjects = [];
    this.loadEmpDetails(this.service.EmployeeId);
  }
  loadEmpDetails(Id: number) {
    this.service.getEmployeeById(Id).subscribe(res => {
      this.employee = res;
      this.empProjects = this.service.data;
    })
  }

  EditPersonalInfo(EmployeeId: any) {
    const dialogConfig1 = new MatDialogConfig();
    dialogConfig1.autoFocus = true;
    dialogConfig1.disableClose = true
    dialogConfig1.width = "60%";
    dialogConfig1.data = this.employee;
    this.dialog.open(EditPersonalInfoComponent, dialogConfig1);
  }

  downloadPDF() {
    var data = document.getElementById('resume');
    html2canvas(data).then(canvas => {
      var contentDataURL = canvas.toDataURL('image/png');
      var imgWidth = 220;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      let pdf = new jsPDF('p', 'mm' /*'a0'*/);
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save('file.pdf');
    });
  }
}
