import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailWordPageComponent } from './page/detail-word-page/detail-word-page.component';
import { LandingPageComponent } from './page/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'detail', component: DetailWordPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
