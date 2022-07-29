import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { NotificationSnackbarComponent } from './notification-snackbar.component';

describe('NotificationSnackbarComponent', () => {
  let component: NotificationSnackbarComponent;
  let fixture: ComponentFixture<NotificationSnackbarComponent>;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        MatSnackBarModule,
        MatIconModule
      ],
      providers:[
        { provide: MatSnackBarRef, useValue:{} },
        { provide: MAT_SNACK_BAR_DATA, useValue:{} }
      ],
      declarations: [ NotificationSnackbarComponent ],
      schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationSnackbarComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get icon class from getIcon', async () => {
    component.data.snackType ='success';
    expect(component.getIcon).toEqual('check_circle_outline');
  });

  it('should close custom snackbar from closeSnackbar', () => {
    component.data.closeSnackbar = () => {
      snackBar.dismiss();
    };
    const spy = spyOn(snackBar, 'dismiss');
    component.closeSnackbar();
    expect(spy).toHaveBeenCalled();
  });
});
