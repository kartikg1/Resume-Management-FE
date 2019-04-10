import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { project } from './project.model';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
import { ApiResponse } from './api.response'

import { map } from 'rxjs/operators';
import { project1 } from './project1.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  show:boolean=false;
  formData: project;
  dtOptions: DataTables.Settings = {};
  projectList: Observable<project[]>;
  newproject : project;
  readonly ROOT_URL:string ='http://localhost:49685/api';

  constructor(private http: HttpClient) { }

  
  getProject()
  {
    return this.http.get<project[]>(this.ROOT_URL + '/Projects');
  }

  getArchivedProjects()
  {
    return this.http.get<project[]>(this.ROOT_URL + '/ProjectsArchived');
  }

  getProjectDetails(id) {
    return this.http.get(this.ROOT_URL + '/ProjectTeams/' + id);
  }

  
  createProject(data) {
    console.log(data.get("ProjectTitle"));

let body = new URLSearchParams();
//body.set('ProjectId', "6" );
body.set('ProjectTitle', data.get("ProjectTitle") );
body.set('ProjectDescription', data.get("ProjectDescription"));
body.set('StartDate',data.get("StartDate") );
body.set('EndDate',data.get("EndDate"));

let options = {
  headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
};

//console.log(this.ROOT_URL+"\n"+'/Projects/1'+"\n"+ body.toString()+"\n"+options);

    return this.http.post(this.ROOT_URL+'/Projects', body.toString(),options);
    
  }


  archiveProject(id:number) {
//   console.log(data.get("ProjectTitle"));

// let body = new URLSearchParams();
// //body.set('ProjectId', "1" );
// body.set('ProjectTitle', data.get("ProjectTitle") );
// body.set('ProjectDescription', data.get("ProjectDescription"));
// body.set('StartDate',data.get("StartDate") );
// body.set('EndDate',data.get("EndDate"));
// body.set('Status',"false");

let options = {
  headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
};

//console.log(this.ROOT_URL+"\n"+'/Projects/1'+"\n"+ body.toString()+"\n"+options);

    return this.http.put( this.ROOT_URL+'/ProjectsArchive/'+id,options);
    
  }


  restoreProject(id:number) {
    //   console.log(data.get("ProjectTitle"));
    
    // let body = new URLSearchParams();
    // //body.set('ProjectId', "1" );
    // body.set('ProjectTitle', data.get("ProjectTitle") );
    // body.set('ProjectDescription', data.get("ProjectDescription"));
    // body.set('StartDate',data.get("StartDate") );
    // body.set('EndDate',data.get("EndDate"));
    // body.set('Status',"false");
    
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    
    //console.log(this.ROOT_URL+"\n"+'/Projects/1'+"\n"+ body.toString()+"\n"+options);
    
        return this.http.put(this.ROOT_URL+'/ProjectsRestore/'+id,options);
        
      }

  updateProduct(data){
    return this.http.post(this.ROOT_URL + '/projects', data.toString(),);
  }


  Release(pId:number, id:number){
    console.log(id);
    let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    // return this.http.delete(this.ROOT_URL+ '/Project/'+data.EmployeeEmail+'/'+data.id);
    return this.http.put(this.ROOT_URL+ '/ProjectTeamsRelease/' +pId+'/'+ id,options);
    }


  postMember(addMembersData: any) {
    console.log(addMembersData);
    return this.http.post(this.ROOT_URL + '/ProjectTeams/'+ addMembersData.ProjectId, addMembersData);
  }



  getEmployeeID() {
    return this.http.get(this.ROOT_URL + '/ProjectTeams/'); //pass id
  }

  AddEmployee(data) {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    };

    let body = new URLSearchParams();
    
    body.set('ProjectId', data.get('ProjectId') );
    body.set('EmployeeEmail', data.get("EmployeeEmail"));
    body.set('EmployeeTech', data.get("EmployeeTech"));
    body.set('Role', data.get("Role"));
    body.set('EmployeeStartDate', data.get("EmployeeStartDate"));
    body.set('EmployeeEndDate', data.get("EmployeeEndDate"));
    

    console.log("URL ", body.toString());

    return this.http.post(this.ROOT_URL + '/ProjectTeams', body.toString(), options);
    // 

  }

  EditProject(formData: project, id: number) {
    
    return this.http.put(this.ROOT_URL + '/Projects/' + id, formData);
  }


  Delete(pId:number, id:number){
    console.log(id);
  // return this.http.delete(this.ROOT_URL+ '/Project/'+data.EmployeeEmail+'/'+data.id);
   return this.http.delete(this.ROOT_URL+ '/ProjectTeamsDelete/' +pId+'/'+ id);
  }
  
  DeleteProject(pId:number){
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
  }
  return this.http.delete(this.ROOT_URL+'/Projects/' +pId,options);

} 
}
