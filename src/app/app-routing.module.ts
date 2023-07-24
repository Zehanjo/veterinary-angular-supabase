import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicHistoryComponent } from './pages/clinic-history/clinic-history.component';
import { InternmentComponent } from './pages/internment/internment.component';
import { OwnerComponent } from './pages/owner/owner.component';
import { PatientComponent } from './pages/patient/patient.component';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {path: '', redirectTo: 'clinic-history', pathMatch:'full'},
  {path: 'clinic-history', component: ClinicHistoryComponent},
  {path: 'internment', component: InternmentComponent},
  {path: 'owner', component: OwnerComponent},
  {path: 'patient', component: PatientComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
