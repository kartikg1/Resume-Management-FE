import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { emp } from './emp.model';
import { Tech } from 'src/app/tech.model';
import { environment } from 'src/environments/environment';

@Injectable({
 providedIn: 'root'
})
export class EmpService {
  ROOT_URL=environment.apiURL;
 formData: emp;
 data: emp[];
 EmployeeId: number = 0;
 customizeResume: boolean = false;
 constructor(private http: HttpClient) { }
 //baseUrl: string = 'http://localhost:49685/api';
 updateEmployeeDetails(formData: emp, id: number) {
   console.log(id);
   console.log(formData);
   return this.http.put(this.ROOT_URL + '/Employees/' + id, this.formData);
 }

 getEmployeeById(id: number) {
   return this.http.get<any>(this.ROOT_URL + '/Employees/' + id);
 }
 getEmployeeProjects(id: number) {
  
   return this.http.get<any>(this.ROOT_URL + '/Employees/ProjectDetails/' + id);
 }

 getUserRole(email : string){
   return this.http.get<any>(this.ROOT_URL + '/UserRole?email=' + email);
 }


 getEmployee() {
   return this.http.get<any>(this.ROOT_URL + '/Employees')
 }

 getEmployeeTechCount() {
   return this.http.get<any>(this.ROOT_URL + '/EmployeeTechCount');
 }

 getEmployeeProjectDetails(id: number) {
   // return this.http.get<any>(this.baseUrl+'/Employees/ProjectDetails/'+id);

   return this.http.get<any>(this.ROOT_URL + '/Employees/ProjectDetails/' + id);
 }

 getEmployeeList() {
   return this.http.get<any>(this.ROOT_URL + '/EmployeeList')
 }

 getProfilePhoto(accessToken : string){
   return this.http.get<any>('https://www.googleapis.com/oauth2/v2/userinfo?access_token=' + accessToken);
 }

 private handleError<T>(operation = 'operation', result?: T) {
   return (error: any): Observable<T> => {

     // TODO: send the error to remote logging infrastructure
     console.error(error); // log to console instead

     // Let the app keep running by returning an empty result.
     return of(result as T);
   };
 }

}


