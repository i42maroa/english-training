import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { MatSnackBar, MatSnackBarModule, MatSnackBarRef, MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";
import { NotificationService } from "./notification.service"

describe('NotificationService', () => {
    let service: NotificationService;
    let snackBar: MatSnackBar;

    beforeEach(()=> {
        TestBed.configureTestingModule({
            imports: [
                MatSnackBarModule
            ],
            providers: [
                {provide: MatSnackBarRef, useValue: {}},
                { provide: MAT_SNACK_BAR_DATA, useValue:{
                    closeSnackbar: () => {
                        snackBar.dismiss();
                    }
                }}
            ],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
        });
        service = TestBed.inject(NotificationService);
        snackBar = TestBed.inject(MatSnackBar);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    })

    it('should show notification snackbar from showSuccess', () => {
        const spy = spyOn(snackBar, 'openFromComponent');
        service.showSuccess('Title', 'Message');
        expect(spy).toHaveBeenCalled();
    })

    it('should show notification snackbar from showSuccessNoTime', () => {
        const spy = spyOn(snackBar, 'openFromComponent');
        const snackBarSpy = spyOn(snackBar, 'dismiss')
        service.showSuccessNoTime('Title', 'Message');
        expect(spy).toHaveBeenCalled();
        snackBar.dismiss();
        expect(snackBarSpy).toHaveBeenCalled();
    })

    it('should show notification snackbar from showError', () => {
        const spy = spyOn(snackBar, 'openFromComponent');
        const snackBarSpy = spyOn(snackBar, 'dismiss')
        service.showError('Title', 'Message');
        expect(spy).toHaveBeenCalled();
        snackBar.dismiss();
        expect(snackBarSpy).toHaveBeenCalled();
    })

    it('should show notification snackbar from showErrorNoTime', () => {
        const spy = spyOn(snackBar, 'openFromComponent');
        const snackBarSpy = spyOn(snackBar, 'dismiss')
        service.showErrorNoTime('Title', 'Message');
        expect(spy).toHaveBeenCalled();
        snackBar.dismiss();
        expect(snackBarSpy).toHaveBeenCalled();
    })
})