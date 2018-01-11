import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CabinetMedicalService } from './cabinet-medical.service';
import { SecretaryComponent } from './secretary/secretary.component';
import { HttpModule} from "@angular/http";
import { NurseComponent } from './nurse/nurse.component';
import { PatientComponent } from './patient/patient.component';
import { NurseSComponent } from './nurseS/nurseS.component';
import { PatientSComponent } from './patientS/patientS.component';


@NgModule({
  declarations: [
    AppComponent,
    SecretaryComponent,
    NurseComponent,
    PatientComponent,
    NurseSComponent,
    PatientSComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [CabinetMedicalService, HttpModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
