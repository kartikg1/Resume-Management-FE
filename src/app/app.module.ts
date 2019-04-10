import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpInfoComponent } from './emp-info/emp-info.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HttpClientModule } from '@angular/common/http';
import { EmpService } from './emp.service';
import { environment } from '../environments/environment';
import { ContactusComponent } from './contactus/contactus.component';
import { ProjectService } from './project.service';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ReadComponent } from './read/read.component';
import { TableModule, Table } from 'primeng/table';
import { ListempComponent } from './listemp/listemp.component';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableModule, SliderModule, MessageService } from 'primeng/primeng';
import { EmplistService } from './emplist.service';
//import {EmpService} from '/home/nineleaps/Desktop/rms/rms/src/app/emp.service'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DropdownModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/multiselect'
import { SelectItem } from 'primeng/primeng';
import { ToastrModule } from 'ngx-toastr';
import { PiechartComponent } from './piechart/piechart.component';
import { ChartModule } from 'primeng/chart';
import { DashComponent } from './dash/dash.component';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatDialogModule } from '@angular/material';
import { ContactComponent } from './contact/contact.component';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DragDropModule } from 'primeng/dragdrop';
import { PickListModule } from 'primeng/picklist';
import { ArchivedComponent } from './archived/archived.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { AngularFireModule } from '@angular/fire';
//import {AngularFireDatabaseModule} from 'angularfire2/database';
//import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
//import { LoginComponent } from './login/login.component';
import { AuthService } from "src/app/auth.service";
import { AngularFireAuth } from '@angular/fire/auth';
import { PrjDetailsComponent } from './prj-details/prj-details.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { CommonDashboardComponent } from './common-dashboard/common-dashboard.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ProjectNavComponent } from './project-nav/project-nav.component';
import { EmpNavComponent } from './emp-nav/emp-nav.component';
import { EditPersonalInfoComponent } from './edit-personal-info/edit-personal-info.component';
import { EmpInfo2Component } from './emp-info2/emp-info2.component';
import { CustomizeResumeComponent } from './customize-resume/customize-resume.component';
//import {FormsModule} from '@angular/forms';
//import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore'

export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  storageBucket: "",
  messagingSenderId: ""
};

@NgModule({
  declarations: [
    AppComponent,
    EmpInfoComponent,
    EditUserComponent,
    ContactusComponent,
    ViewComponent,
    CreateComponent,
    UpdateComponent,
    ReadComponent,
    DashComponent,
    ListempComponent,
    PiechartComponent,
    MyNavComponent,
    ContactComponent,
    ArchivedComponent,
    NotFoundComponentComponent,
    //LoginComponent,
    PrjDetailsComponent,
    EditProjectComponent,
    LoginComponent,
    CommonDashboardComponent,
    ProjectNavComponent,
    EmpNavComponent,
    EditPersonalInfoComponent,
    EmpInfo2Component,
    CustomizeResumeComponent,



  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    //AngularFireAuth,
    FormsModule,
    AngularFireAuthModule,
    // AngularFirestoreModule,
    //AngularFirestore,
    BrowserModule,
    //FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,

    HttpClientModule,
    DataTablesModule,
    TableModule,

    BrowserAnimationsModule,
    DataTableModule,
    DropdownModule,
    MultiSelectModule,
    SliderModule,
    ToastModule,
    ToastrModule.forRoot(),
    ChartModule,
    LayoutModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    TooltipModule,
    ProgressSpinnerModule,
    PickListModule,
    NgxUiLoaderModule
    // AngularFireDatabaseModule,
    //AngularFireModule.initializeApp(firebaseConfig),



  ],
  entryComponents: [
    PrjDetailsComponent,
    EditProjectComponent,
    EditPersonalInfoComponent,
    CustomizeResumeComponent


  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [EmpService, EmpInfoComponent, ProjectService, EmplistService, MessageService, AuthService, AngularFireAuth, AngularFireAuthModule, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
