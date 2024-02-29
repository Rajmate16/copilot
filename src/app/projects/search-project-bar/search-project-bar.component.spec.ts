import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProjectBarComponent } from './search-project-bar.component';

describe('SearchProjectBarComponent', () => {
  let component: SearchProjectBarComponent;
  let fixture: ComponentFixture<SearchProjectBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchProjectBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProjectBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
