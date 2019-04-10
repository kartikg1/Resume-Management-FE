import { Component, AfterViewInit, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { project } from '../project.model'
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { PrjDetailsComponent } from '../prj-details/prj-details.component';

declare var $;

@Component({
  selector: 'app-archived',
  templateUrl: './archived.component.html',
  styleUrls: ['./archived.component.css']
})
export class ArchivedComponent implements OnInit {

  public projects: any = [];


  @ViewChild(DataTableDirective)
  dtOptions: DataTables.Settings;

  datatableElement: DataTableDirective;
  dtTrigger: Subject<DataTableDirective> = new Subject();
  dtInstance: DataTables.Api;

  constructor(private http: HttpClient,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private routes: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.loadProjects();
  }

  ngAfterViewInit(): void {
  }

  loadProjects() {
    this.projectService.getArchivedProjects().subscribe(
      productData => {
        this.projects = productData;
        console.log(this.projects);
        this.toastr.success("All archived projects loaded", '', { timeOut: 1000 });
        this.dtTrigger.next();
      }
    )
  }

  restoreProject(id: number) {
    this.projectService.restoreProject(id).subscribe(
      productData => {
        this.projects = productData;
        console.log(this.projects);
        this.toastr.success("Yay! Your project has been restored", 'All the best', { timeOut: 2000 });
        this.dtTrigger.unsubscribe();
        this.loadProjects();
      }
    )
  }

  getNavigation(link, id) {
    if (id === '') {
      this.routes.navigate([link]);
    } else {
      this.routes.navigate([link + '/' + id]);
    }
  }
  view(projectId: any, ProjectDescription: string) {
    this.projectService.show = true;
    const dialogConfig1 = new MatDialogConfig();
    dialogConfig1.autoFocus = true;
    dialogConfig1.disableClose = true
    dialogConfig1.width = "80%";
    dialogConfig1.data = {
      PId: projectId,
      ProjectDesc: ProjectDescription
    }
    this.dialog.open(PrjDetailsComponent, dialogConfig1).afterClosed().subscribe(res => {
      this.projectService.show = false;
    });

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  DeleteProject(id: number) {
    this.projectService.DeleteProject(id).subscribe(res => {
      this.ngOnInit();
      this.toastr.success("Deleted succesfully");
    })
  }
}
