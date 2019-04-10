import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Injectable } from '@angular/core';
import { Emplist } from './emplist.model'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmplistService {
  ROOT_URL=environment.apiURL;

  constructor(private http: HttpClient) { }

  //readonly baseUrl: string = 'http://localhost:49685/api'; 
  getProjectList()
  {
    return this.http.get<Emplist[]>(this.ROOT_URL+'/Projects')
                    
  }

  getEmployee()
  {
    return this.http.get<any>(this.ROOT_URL+'/Employees')
  }
  
  getEmployeeList()
  {
    console.log("GETEMPLOYEELIST")
    return this.http.get<any>(this.ROOT_URL+'/EmployeeList')
  }
}
