import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCrossButtonComponent } from './add-button.component';

describe('AddButtonComponent', () => {
  let component: AddCrossButtonComponent;
  let fixture: ComponentFixture<AddCrossButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCrossButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCrossButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
