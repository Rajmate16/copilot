import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportTasksComponent } from './export-tasks.component';

describe('ExportTasksComponent', () => {
  let component: ExportTasksComponent;
  let fixture: ComponentFixture<ExportTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
