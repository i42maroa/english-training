import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWordModalComponent } from './new-word-modal.component';

describe('NewWordModalComponent', () => {
  let component: NewWordModalComponent;
  let fixture: ComponentFixture<NewWordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWordModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewWordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
