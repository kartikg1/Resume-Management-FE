import { Component, AfterViewInit, OnDestroy, OnInit, ViewChild, ViewChildren, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { project } from '../project.model'
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { PrjDetailsComponent } from 'src/app/prj-details/prj-details.component';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import {EditProjectComponent} from '../edit-project/edit-project.component';
import {TableModule} from 'primeng/table';
import {MyNavComponent} from '../my-nav/my-nav.component';
// import {projects} from '../project.model'
//import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core'
import { projects } from '../projects.model';
import { flatMap } from 'rxjs/operators';
import { Emplist } from '../emplist.model';
declare var $;

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  //styleUrls: ['./view.component.css']
})

export class ViewComponent implements OnDestroy{

  panelOpenState = false;

  public projects: any = [];
  projectList: projects[];
  //@ViewChild('productsTable') Table;
  //public dataTable: any;

  @ViewChild(DataTableDirective)
  dtOptions: DataTables.Settings;//= {};

  datatableElement: DataTableDirective;
  dtTrigger: Subject<DataTableDirective> = new Subject();
  dtInstance: DataTables.Api;
  //loading:boolean=false;

  cols:any;

  
  loading: boolean;

  selectedCars: projects[];


  constructor(private http: HttpClient, private projectService: ProjectService,
    private toast: ToastrService, private routes: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
this.loadProjects();  
  this.cols = [
    { field: 'ProjectId', header: 'ID' },
    { field: 'ProjectTitle', header: 'Title' },
    { field: 'ProjectDescription', header: 'Project Desc' },
    { field: 'StartDate', header: 'SDate' },
    { field: 'EndDate', header: 'Edate' },
    //{field:'status', header:'Status'}
];
this.loading=true;

    // this.loadProjects();
    // this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {

    //  dtInstance.columns().every(function () {
    //     const that = this;
    //     $('input', this.footer()).on('keyup change', function () {
    //       if (that.search() !== this['value']) {
    //         that
    //           .search(this['value'])
    //           .draw();

    //       }
    //     });

    //   });

    // });

    // this.datatableElement.ngOnDestroy();
    // //this.dtTrigger.next();
  }


  loadProjects() {
    this.projectService.getProject().subscribe(
        productData => {
          this.projects = productData;
          this.projectList=productData as projects[];
          console.log(this.projectList);
          this.loading=false;
        },
        err=>
      {
        if(err.status==502)
        {
          this.toast.error("Error 502. Check your API ");
        }
      }  
    ) 
  }

  view(projectId: any,ProjectDescription : string) {
    const dialogConfig1 = new MatDialogConfig();
    dialogConfig1.autoFocus = true;
    dialogConfig1.disableClose = true
    dialogConfig1.width = "90%";
    dialogConfig1.data = {
      PId : projectId,
      ProjectDesc : ProjectDescription
    }
    this.dialog.open(PrjDetailsComponent, dialogConfig1);

  }

  ngOnDestroy(): void {
    // // //Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  getNavigation(link, id) {
    if (id === '') {
      this.routes.navigate([link]);
    } else {
      this.routes.navigate([link + '/' + id]);
    }
  }

  archiveProject(id: number) {
    this.projectService.archiveProject(id).subscribe(
      productData => {
        this.projects = productData;
        console.log(this.projects);
        this.toast.error("You successfully archived your project");
      this.ngOnInit();
        this.loadProjects();
      }
    )
  }


  Edit(projectId: any, index: number) {
    console.log(index);
    const dialogConfig2 = new MatDialogConfig();
    dialogConfig2.autoFocus = true;
    dialogConfig2.disableClose = true;
    console.log("hello world");
    dialogConfig2.width = "90%";
    dialogConfig2.data = this.projectList[index];
    console.log(dialogConfig2.data);
    this.dialog.open(EditProjectComponent, dialogConfig2).afterClosed().subscribe(res=>{

    });
  }


  
}
