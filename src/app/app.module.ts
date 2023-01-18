import { ErrorHandler, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar'
import { MatIconModule } from '@angular/material/icon'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './page/landing-page/landing-page.component';
import { ListWordsComponent } from './shared/components/list-words/list-words.component';
import { AddButtonComponent } from './shared/components/add-button/add-button.component';
import { HeaderComponent } from './core/components/header/header.component';
import { provideFirestore, getFirestore} from '@angular/fire/firestore';

import { initializeApp, provideFirebaseApp} from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { NotificationSnackbarComponent } from './core/components/notification-snackbar/notification-snackbar.component';
import { GlobalErrorHandlerService } from './core/services/error/global-error-handler.service';
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCERS } from './state/app.state';
import { StoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { WordEffects } from './state/effects/words.effects';
import { TypeWordListSelectorComponent } from './shared/components/type-word-list-selector/type-word-list-selector.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore, AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { SnackbarErrorComponent } from './core/components/snackbar/snackbar-error/snackbar-error.component';
import { SnackbarOkComponent } from './core/components/snackbar/snackbar-ok/snackbar-ok.component';
import { SpinnerComponent } from './core/components/spinner/spinner.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { DeleteWordComponent } from './shared/components/modal/templates/delete-word/delete-word.component';
import { NewWordComponent } from './shared/components/modal/templates/new-word/new-word.component';
import { WordDetailComponent } from './shared/components/word-detail/word-detail.component';
import { DetailWordPageComponent } from './page/detail-word-page/detail-word-page.component';
import { NewExampleComponent } from './shared/components/modal/templates/new-example/new-example.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { ModifyButtonComponent } from './shared/components/button/template/modify-button/modify-button.component';
import { DeleteButtonComponent } from './shared/components/button/template/delete-button/delete-button.component';
import { CloseButtonComponent } from './shared/components/button/template/close-button/close-button.component';
import { AddCrossButtonComponent } from './shared/components/button/template/add-button/add-button.component';
import { DeleteExampleComponent } from './shared/components/modal/templates/delete-example/delete-example.component';
import { SearcherComponent } from './shared/components/searcher/searcher.component';
import { NgAisModule } from 'angular-instantsearch';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ListWordsComponent,
    AddButtonComponent,
    HeaderComponent,
    NotificationSnackbarComponent,
    TypeWordListSelectorComponent,
    SnackbarErrorComponent,
    SnackbarOkComponent,
    SpinnerComponent,
    ModalComponent,
    DeleteWordComponent,
    NewWordComponent,
    WordDetailComponent,
    DetailWordPageComponent,
    NewExampleComponent,
    ButtonComponent,
    ModifyButtonComponent,
    DeleteButtonComponent,
    CloseButtonComponent,
    AddCrossButtonComponent,
    DeleteExampleComponent,
    SearcherComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    // NgAisModule.forRoot(),
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({
      maxAge:25,
      logOnly:true,
      autoPause:true
    }),
    EffectsModule.forRoot([WordEffects])
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
