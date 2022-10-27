import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeWordListSelectorComponent } from './type-word-list-selector.component';

describe('TypeWordListSelectorComponent', () => {
  let component: TypeWordListSelectorComponent;
  let fixture: ComponentFixture<TypeWordListSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeWordListSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeWordListSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
