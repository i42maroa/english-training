import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteExampleComponent } from './delete-example.component';

describe('DeleteExampleComponent', () => {
  let component: DeleteExampleComponent;
  let fixture: ComponentFixture<DeleteExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteExampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
