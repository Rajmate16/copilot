import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ProjectsComponent } from './projects/projects.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { LayoutModule } from '@angular/cdk/layout';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectCardComponent } from './projects/project-card/project-card.component';
import { ProjectService } from './projects/project.service';
import { HttpClientModule } from '@angular/common/http';
import { ProjectComponent } from './project/project.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskListComponent } from './project/task-list/task-list.component';
import { TaskCardComponent } from './project/task-card/task-card.component';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UpdateTaskComponent } from './project/update-task/update-task.component';
import { ExportTasksComponent } from './project/export-tasks/export-tasks.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchProjectBarComponent } from './projects/search-project-bar/search-project-bar.component';
import { Multiline } from './shared/multiline';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './shared/confirm-dialog/confirm-dialog.service';
import { AddEmployeeComponent } from './project/add-employee/add-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectListComponent,
    ProjectCardComponent,
    ProjectComponent,
    TaskListComponent,
    TaskCardComponent,
    UpdateTaskComponent,
    ExportTasksComponent,
    SearchProjectBarComponent,
    Multiline,
    AddProjectComponent,
    ConfirmDialogComponent,
    AddEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatDatepickerModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [
    ProjectService,
    DatePipe,
    Multiline,
    ConfirmDialogService
  ],
  entryComponents: [
    UpdateTaskComponent,
    ExportTasksComponent,
    ConfirmDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
