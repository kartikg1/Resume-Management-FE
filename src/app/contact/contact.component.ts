import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { EmpService } from '../emp.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { emp } from '../emp.model';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  title = 'Contact Project Manager ';
  public data:any=[]
  form:Form;
  employee: emp;
  empId:number;
  empName: string;
  empMail:string;
  sub: any;
  viewId: number;
  
  constructor(private http: HttpClient, private details:EmpService, private route:ActivatedRoute,private toastr:ToastrService){
  }
 
  save(name, email, id, subject, message): void {
    
    var email1 = this.empMail;
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
    this.toastr.success('Notifcation Sent');
  }

  getEmployeeDetails(id:number) {
    this.details.getEmployeeById(id)
      .subscribe(data => {
        this.employee = data;
        this.empId=this.employee[0].EmployeeId;
        this.empName= this.employee[0].EmployeeName;
        this.empMail=this.employee[0].EmployeeEmail;
        console.log("hello "+ this.empId);
        console.log("hello"+this.employee.EmployeeEmail);
        
        //this.isLoadingResults = false;
      });
  }

  ngOnInit()
  {
    this.sub = this.route.params.subscribe(params => {
      this.viewId = +params['id']; 
    
    

  });

  this.getEmployeeDetails(this.viewId);

  }
}
