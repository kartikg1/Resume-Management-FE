import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
//import { map } from 'jquery';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http'
//import { HttpClient } from 'selenium-webdriver/http';

@Component({
  selector: 'app-emp-nav',
  templateUrl: './emp-nav.component.html',
  styleUrls: ['./emp-nav.component.css']
})
export class EmpNavComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  user: firebase.User;


  NoRole: boolean;
  Role2: boolean;
  Role3: boolean;
  Role4: boolean;

  Roles: string;
  ngAfterViewInit() {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private routes: Router,
    private service: AuthService,
    private data: DataService,
    private http: HttpClient,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {

    this.data.getRole().subscribe(
      role => {
        this.Roles = role;
      }
    )
    console.log("Logged in with Role " + this.Roles)
    this.checkRole();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    }


  // logout()
  // {
  //   this.service.logout();
  // }
  Logout() {


    localStorage.removeItem('accessToken');

    //console.log("Updated/n",localStorage.getItem('accessToken'));
    window.location.href = "http://localhost:4200/login";
  }

  checkRole() {

    if (this.Roles == 'No Role') {
      this.NoRole = true;
    }

    if (this.Roles == '2') {

    }

  }

}
