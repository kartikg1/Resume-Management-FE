import { NgModule, Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EmplistService } from '../emplist.service';
import { Emplist } from '../emplist.model';
import { TableModule } from 'primeng/table';
import { SelectItem } from 'primeng/primeng';
import { MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastrService } from 'ngx-toastr';
import { emp } from '../emp.model';
import { Route, Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { CustomizeResumeComponent } from '../customize-resume/customize-resume.component';


@Component({
 selector: 'app-listemp',
 templateUrl: './listemp.component.html',
 styleUrls: ['./listemp.component.css'],

})
export class ListempComponent implements OnInit {

 employee: Emplist;
 loading: boolean;

 selectedCars: Emplist[];

 constructor(private dialog: MatDialog,
   private emplist: EmplistService,
   private toastr: ToastrService,
   private router: Router
 ) { }
 cols: any;

 tech: SelectItem[];

 role: SelectItem[];

 name: any;
 yearFilter: number;
 yearTimeout: any;

 showSuccess() {
   this.toastr.success('Successfully loaded Data');
 }

 ngOnInit() {
   this.getAllProjects();
   this.tech = [
     { label: 'All Description', value: null },
     { label: 'Angular', value: 'Angular' },
     { label: '.net', value: 'Dot Net' },
     { label: 'Python', value: ' Python' },
     { label: 'Java', value: ' Java' },
     { label: 'C#', value: ' C#' },
     { label: 'C', value: ' C' },
     { label: 'Big Data', value: 'Big Data' },


   ];

   this.role = [
     { label: 'All Roles', value: null },
     { label: 'Backend', value: 'Back End' },
     { label: 'Frontend', value: 'Front End' },
     { label: 'Scrum Master', value: 'Scrum Master' }
   ];

   this.cols = [
     { field: 'EmployeeId', header: 'ID' },
     { field: 'EmployeeName', header: 'Name' },
     { field: 'ProjectTitle', header: 'Project Title' },
     { field: 'Role', header: 'Role' },
     { field: 'EmployeeTech', header: 'Skill' }
   ];
   this.loading = true;
 }

 getAllProjects() {
   console.log("hey");
   this.emplist.getEmployeeList().subscribe(
     data => {
       this.employee = data;
       console.log("hello"+ this.employee);
       //this.showSuccess();
       this.loading = false;

     }
     , err => {
       if (err.status == 404) {
         this.router.navigateByUrl('/404', { replaceUrl: true });
       }
     }
   )
 }

 onYearChange(event, dt) {
   if (this.yearTimeout) {
     clearTimeout(this.yearTimeout);
   }

   this.yearTimeout = setTimeout(() => {
     dt.filter(event.value, 'year', 'gt');
   }, 250);
 }

 goToEmployeeDetails(id) {
   console.log(id);
   this.router.navigate(['/empInfo', id]);
 }

 goToEmployeeContact(id) {
   console.log(id);
   this.router.navigate(['/contact', id]);
 }

 CustomizeResume(index: number, id: number) {
   const dialogConfig1 = new MatDialogConfig();
   dialogConfig1.autoFocus = true;
   dialogConfig1.disableClose = true
   dialogConfig1.width = "90%";
   dialogConfig1.data = id;

   this.dialog.open(CustomizeResumeComponent, dialogConfig1);


 }



}


