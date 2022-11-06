import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailWordPageComponent } from './detail-word-page.component';

describe('DetailWordPageComponent', () => {
  let component: DetailWordPageComponent;
  let fixture: ComponentFixture<DetailWordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailWordPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailWordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
