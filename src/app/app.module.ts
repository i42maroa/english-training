import { ErrorHandler, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatIconModule } from '@angular/material/icon'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './page/landing-page/landing-page.component';
import { NewWordModalComponent } from './shared/components/new-word-modal/new-word-modal.component';
import { ListWordsComponent } from './shared/components/list-words/list-words.component';
import { AddButtonComponent } from './shared/components/add-button/add-button.component';
import { HeaderComponent } from './core/components/header/header.component';
import { provideFirestore, getFirestore} from '@angular/fire/firestore';

import { initializeApp, provideFirebaseApp} from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { NotificationSnackbarComponent } from './core/components/notification-snackbar/notification-snackbar.component';
import { GlobalErrorHandlerService } from './core/services/error/global-error-handler.service';
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NewWordModalComponent,
    ListWordsComponent,
    AddButtonComponent,
    HeaderComponent,
    NotificationSnackbarComponent
  ],
  imports: [
    MatSnackBarModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  entryComponents:[
    NotificationSnackbarComponent
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
