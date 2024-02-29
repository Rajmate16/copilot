import { Component, OnInit, AfterContentInit } from '@angular/core';
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/projects/project.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit, AfterContentInit {

  spinnerIcon = faSpinner;
  closeIcon = faTimes;
  form: FormGroup;
  loading: Boolean = false;
  submitted: Boolean = false;
  employeeExists = false;
  projectId: string = '';
  employeeId: string = '';
  mode: string = '';
  employee: Employee = new Employee();
  
  constructor(public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private confirmDialogService: ConfirmDialogService,
    private datePipe: DatePipe,
    private router: Router) {
    this.form = this.fb.group({
      employeeId:['', [Validators.required, Validators.maxLength(6), Validators.pattern('[0-9]+')]], 
      name: ['', [Validators.required, Validators.maxLength(100)]],
      statusPlanned: ['', [Validators.required]],
      location: ['', [Validators.required]]
    });
  }

  ngAfterContentInit(): void {
    
    if (this.mode === 'update') {
      this.employeeService.getEmployee(this.projectId, this.employeeId)
      .subscribe(
        (data) => {
          this.employee = data;
          this.form.controls['employeeId'].setValue(this.employee.employeeId);
          this.form.controls['employeeId'].disable();
          this.form.controls['name'].setValue(this.employee.name);
          // this.form.controls['name'].disable();
          this.form.controls['statusPlanned'].setValue(this.employee.statusPlanned);
          this.form.controls['location'].setValue(this.employee.location);
          console.log(this.employee);
        });
    }
    
  }
  
  public get f() { return this.form.controls; }

  ngOnInit(): void {
  }

  addEmployee() { 
    this.submitted = true;
    this.employeeExists = false;
    // stop here if form is invalid
    if (this.form.invalid) {
      console.log(this.form);
      return;
    }

    const val = this.form.value;
    this.loading = true;

    const employeeToAdd: Employee = new Employee();
    employeeToAdd.projectId = this.projectId;
    if(this.mode === 'add') {
      employeeToAdd.employeeId = val.employeeId;
    } else if (this.mode === 'update') {
      employeeToAdd.employeeId = this.employeeId;
    }
    employeeToAdd.name = val.name;
    employeeToAdd.statusPlanned = val.statusPlanned;
    employeeToAdd.location = val.location;
    
    console.log("mode : " + this.mode);
    if (this.mode === 'add') {
      this.employeeService.addEmployee(employeeToAdd)
      .subscribe(
        (data) => {
          if (data === true) {
            this.loading = false;
            this.employeeExists = false;
            this.activeModal.close(true);
          } else {
            this.loading = false;
            this.employeeExists = true;
          }
        }
      );
    } else if(this.mode === 'update') {
      this.employeeService.updateEmployee(employeeToAdd)
      .subscribe(
        (data) => {
          if (data === true) {
            this.loading = false;
            this.employeeExists = true;
            this.activeModal.close(true);
          } else {
            this.loading = false;
            this.employeeExists = false;
          }
        }
      );
    }
    
  }

  public openDeleteConfirmationDialog() {
    this.confirmDialogService.confirm('Employee Deletion', 'Along with this employee, all the tasks will be deleted. Do you really want to delete employee \'' + this.employeeId + '\'? ')
      .then((confirmed) => {
        if (confirmed === true) {
          this.deleteEmployee();
        }
      }
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  deleteEmployee() {
    console.log('projectId : ' + this.projectId);
    console.log('employeeId : ' + this.employeeId);
    this.employeeService.deleteEmployee(this.projectId, this.employeeId)
    .subscribe(
      (data) => {
        if (data === true) {
          console.log('deleted');
          this.loading = false;
          this.employeeExists = true;
          this.activeModal.close(true);
        } else {
          this.loading = false;
          this.employeeExists = false;
        }
      }
    );
  }

}
