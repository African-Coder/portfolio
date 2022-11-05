import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPatientsComponent } from './book-patients.component';

describe('BookPatientsComponent', () => {
  let component: BookPatientsComponent;
  let fixture: ComponentFixture<BookPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
