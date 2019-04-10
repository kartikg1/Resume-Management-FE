import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactusComponent } from './contactus/contactus.component'
import { EditUserComponent } from './edit-user/edit-user.component'
import { EmpInfoComponent } from './emp-info/emp-info.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ReadComponent } from './read/read.component';
import { ViewComponent } from './view/view.component';
import { PiechartComponent } from './piechart/piechart.component';
import { ListempComponent } from './listemp/listemp.component';
import { DashComponent } from './dash/dash.component';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { ArchivedComponent } from './archived/archived.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { CommonDashboardComponent } from './common-dashboard/common-dashboard.component';
import { EmpInfo2Component } from './emp-info2/emp-info2.component';
import { PrjDetailsComponent } from './prj-details/prj-details.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'empInfo',
    component: EmpInfoComponent,
   // canActivate: [AuthGuard]
  },
  {
    path: 'empinfo2',
    component: EmpInfo2Component,
  },
  {
    path: 'empInfo/:id',
    component: EmpInfoComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'piechart',
    component: PiechartComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: CreateComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'update/:id',
    component: UpdateComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'view',
    component: ViewComponent,
    //canActivate: [AuthGuard],
    data: { roles: ['3'] }
  },
  {
    path: 'project-details',
    component: PrjDetailsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: CommonDashboardComponent
  },
  {
    path: 'archived',
    component: ArchivedComponent,
    //canActivate: [AuthGuard],
    data: { roles: ['3'] }
  },
  {
    path: 'listemp',
    component: ListempComponent,
    //canActivate: [AuthGuard],
    data: { roles: ['4'] }
  },
  {
    path: 'contact',
    component: ContactusComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'contact/:id',
    component: ContactComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: NotFoundComponentComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
