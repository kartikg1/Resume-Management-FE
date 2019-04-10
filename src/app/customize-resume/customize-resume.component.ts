import { Component, OnInit, Inject } from '@angular/core';
import { EmpService } from '../emp.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EmplistService } from '../emplist.service';
import { Emplist } from '../emplist.model';
import { project } from '../project.model';
import { emp } from '../emp.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
 selector: 'app-customize-resume',
 templateUrl: './customize-resume.component.html',
 styleUrls: ['./customize-resume.component.css']
})
export class CustomizeResumeComponent implements OnInit {
 empProject: any[];
 constructor(@Inject(MAT_DIALOG_DATA) public data,
   public dialogRef: MatDialogRef<CustomizeResumeComponent>,
   private customizeService: EmpService,
   public router: Router) { }
 EmployeeProjects: Emplist[];
 projects: emp[];
 projectData: any[];
 ngOnInit() {
   console.log(this.data);
   this.customizeService.getEmployeeProjectDetails(this.data).subscribe((res: any) => {
     console.log(res);
     this.EmployeeProjects = res;
     console.log("hello");
     console.log(res);


     //   this.LoadProjects(this.EmployeeProjects[0].ProjectId);
   });
   this.LoadProjects(this.data);



 }

 LoadProjects(id: number) {
   this.customizeService.getEmployeeProjectDetails(id).subscribe((res: any) => {
     res.forEach(obj => obj.selected = false);
     this.empProject = res as emp[];


   })
 }

 updateSelectedProjects(index) {
   this.empProject[index].selected = !this.empProject[index].selected;
   // console.log(this.empProject[index]);
 }

 onSubmit(form: NgForm) {
   // console.log(form.value);
   var SelectedProject = this.empProject.filter(Id => Id.selected).map(idSelected => idSelected);
   console.log(SelectedProject);
   this.customizeService.data = SelectedProject;
   this.customizeService.customizeResume = true;
   this.customizeService.EmployeeId = this.data;
   this.router.navigate(['/empinfo2']);
   this.dialogRef.close();
 }

}


