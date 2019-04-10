import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

 role:boolean=false;
  private roleSource = new BehaviorSubject('No Role');
  currentMessage = this.roleSource.asObservable();
  constructor() { }

  passRoles(role:string)
  {
    this.roleSource.next(role);
    
  }

  getRole():Observable<any>
  {

    return this.roleSource.asObservable();
  }
}
