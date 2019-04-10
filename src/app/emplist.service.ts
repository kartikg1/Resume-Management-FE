import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Injectable } from '@angular/core';
import { Emplist } from './emplist.model'

@Injectable({
  providedIn: 'root'
})
export class EmplistService {

  constructor(private http: HttpClient) { }

  readonly baseUrl: string = 'http://localhost:49685/api'; 
  getProjectList()
  {
    return this.http.get<Emplist[]>(this.baseUrl+'/Projects')
                    
  }

  getEmployee()
  {
    return this.http.get<any>(this.baseUrl+'/Employees')
  }
  
  getEmployeeList()
  {
    console.log("GETEMPLOYEELIST")
    return this.http.get<any>(this.baseUrl+'/EmployeeList')
  }
}
