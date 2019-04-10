import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { project } from '../project.model'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module'
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  productForm:FormGroup;
  stdate:Date;
  

  constructor(private fb: FormBuilder, private projectService:ProjectService,
    private routes:Router, private toast:ToastrService  ) {

      this.productForm = this.fb.group({
        name: ['', Validators.required],
        desc: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
        sdate: ['', Validators.compose([Validators.required])],
        edate: ['', Validators.compose([Validators.required])],
      });
     }


     showError()
     {
       this.toast.error("Sorry an error occured");
     }

     showSuccess()
     {
       this.toast.success("Yay! All the best for your new project!");
     }
    

  ngOnInit() {

    //this.stdate=this.stdate.toISOString.substring(0,10);
    //console.log(this.stdate);
  }

saveProduct(values){ 

  
    //values.sdate = this.stdate;
  
    const productData = new FormData();
    productData.append('ProjectTitle', values.name);
    productData.append('ProjectDescription', values.desc);
    productData.append('StartDate', values.sdate);
    productData.append('EndDate', values.edate);
    //console.log(values.sdate);  
    //console.log(productData.get('StartDate',));
    this.projectService.createProject(productData).subscribe(result => {
      this.showSuccess();
      console.log("Added");
      alert("Added Succesfully");
      this.routes.navigate(['/view']);
    },
    (err) =>{this.showError();
    this.productForm.reset();
  }
    
    
    );
  }

}
