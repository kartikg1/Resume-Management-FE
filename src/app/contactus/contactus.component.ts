//import { Component, OnInit } from '@angular/core';
import { Component, ɵConsole } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpErrorResponse} from '@angular/common/http';
import { Form } from '@angular/forms';
import {EmpService} from '../emp.service';
import {emp} from '../emp.model';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {

  title = 'Contact Us ';
  public data:any=[]
  form:Form;
  employee: emp;
  empId:number;
  empName: string;
  
  constructor(private http: HttpClient, private details:EmpService, private route:Router,private toastr:ToastrService){
  }
 
  save(name, email, id, subject, message): void {
    
    var email1 ="ankitjhamahi.07@gmail.com";
    var body = {
      bname : this.empName,
      bemail : email1,
      bmobile : this.empId,
      bsubject : subject,
      message : message
    }
    // this.data['name']= name;
    //             this.data['email']= email;
    //             this.data['mobile']= mobile;
    //             this.data['subject']= subject;
    //             this.data['message']= message;
    console.log(this.data);
    console.log(body);
    //add request to send email or into mysql
    this.http.post<any>('http://localhost:49685/api/Contact', body).subscribe(
        res => {
          this.data.showSuccess();
          console.log(res);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {

          console.log("Server-side error occurred.");
        }
      });
   }

  //  onSubmit(form:ngForm)
  //  {
  //    this.form.reset();
  //  }

  showSuccess() {
    this.toastr.success('Message Sent to Admin');
  }

  getEmployeeDetails(id:number) {
    this.details.getEmployeeById(1)
      .subscribe(data => {
        this.employee = data;
        this.empId=this.employee.EmployeeId;
        this.empName= this.employee.EmployeeName;
        console.log("hello "+ this.empId);
        console.log(this.employee);
        
        //this.isLoadingResults = false;
      });
  }

  ngOnInit()
  {
    
    this.getEmployeeDetails(1);

  }
}


