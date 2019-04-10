import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProjectService } from '../project.service';
import { projects } from '../projects.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  projectList: projects[];
  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EditProjectComponent>,
    private dataservice: ProjectService, private toastr: ToastrService
  ) { }

  showSuccess() {
    this.toastr.success("Edit made successfully");
  }
  
  ngOnInit() {
    console.log("I am inside edit modal")
    this.dataservice.formData = this.data;
    console.log(this.dataservice.formData);
  }

  Save(form: NgForm, id: number) {
    console.log(form.value);
    this.dataservice.EditProject(form.value, this.data.ProjectId).subscribe((res: any) => {
      console.log("yes");
      this.showSuccess();
      this.dialogRef.close();
    });
    err => {
      this.toastr.error("There was an error in editing the project. Please try again");
    }
  }
}