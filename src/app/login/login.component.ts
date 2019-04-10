import { Component, OnInit } from '@angular/core';

declare var getAccessToken: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
     
  }

  GoogleLogin(){
    window.location.href="http://localhost:49685/api/Account/ExternalLogin?provider=Google&response_type=token&client_id=self&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fdashboard&state=oIHzYNikreT1WZ05yEvNqSpHARsywtU7bQyUUb73au01";     
    
  }


}
