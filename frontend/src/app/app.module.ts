import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPatientsComponent } from './appointments/list-patients.component';
import { BookPatientsComponent } from './appointments/book-patients.component';
import { PatientService } from './appointments/patient.service';
import { HttpClientModule } from '@angular/common/http';


const appRoutes: Routes = [
  { path: 'list', component: ListPatientsComponent },
  { path: 'edit/:id', component: BookPatientsComponent},
  { path: '', redirectTo: '/list', pathMatch: 'full' }
  
];

@NgModule({
  declarations: [
    AppComponent,
    ListPatientsComponent,
    BookPatientsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PatientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
