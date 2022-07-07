import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

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


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NewWordModalComponent,
    ListWordsComponent,
    AddButtonComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
