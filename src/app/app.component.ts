import { Component } from '@angular/core';
import { EmpInfoComponent } from './emp-info/emp-info.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

declare var GoogleAuthentication: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rms';

  constructor(private dow:EmpInfoComponent, 
    private service:AuthService, 
    private afAuth:AngularFireAuth,
    private routes:Router)
  {

  }

  public downloadResume()
  {
    this.dow.downloadPDF();
  }
  ngOnInit()
  {
    this.afAuth.authState
    .subscribe(user => 
      {
        console.log(user);
      })
  }
}
