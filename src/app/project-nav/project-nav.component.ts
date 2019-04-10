import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';
import { RowToggler } from 'primeng/table';
import { CommonDashboardComponent } from '../common-dashboard/common-dashboard.component';
import { DataService } from '../data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http'

@Component({
  selector: 'app-project-nav',
  templateUrl: './project-nav.component.html',
  styleUrls: ['./project-nav.component.css']
})
export class ProjectNavComponent implements OnInit, OnDestroy {
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
    console.log("Logged in with Role " + this.Roles);
    this.checkRole();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  Logout() {
    localStorage.removeItem('accessToken');
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
