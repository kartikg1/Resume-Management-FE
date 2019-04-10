import { Component, OnInit, Inject } from '@angular/core';
import { EmpService } from '../emp.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { emp } from '../emp.model';

@Component({
  selector: 'app-edit-personal-info',
  templateUrl: './edit-personal-info.component.html',
  styleUrls: ['./edit-personal-info.component.css']
})
export class EditPersonalInfoComponent implements OnInit {
  employee: emp;
  constructor(private details: EmpService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EditPersonalInfoComponent>,

  ) { }

  ngOnInit() {
    this.details.formData = this.data;
    console.log(this.details.formData);
  }

  Save(form: NgForm, id: number) {
    console.log(id);
    this.details.updateEmployeeDetails(form.value, id).subscribe(res => {
    })
    this.dialogRef.close();
  }
}

