import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { CabinetInterface } from "../dataInterfaces/cabinet";
import {PatientInterface} from '../dataInterfaces/patient';

@Component({
  selector: 'app-patientS',
  templateUrl: './patientS.component.html',
  styleUrls: ['./patientS.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PatientSComponent implements OnInit {
  @Input('cabinet')
  public cabinet: CabinetInterface;

  public patientS: PatientInterface;

  constructor() { }

  ngOnInit() {
    this.patientS = {
      prenom: '',
      nom: '',
      //sexe: '',
      nss: '',
      //adresse: '',
      pathologie: ''
    };
  }

  changeModifiedInfo(event: any) {
    // console.log(event);
    switch (event.target.name) {
      case 'ssn' :
        this.patientS.nss = event.target.value;
        break;
      case 'nom' :
        this.patientS.nom = event.target.value;
        break;
      case 'prenom' :
        this.patientS.prenom = event.target.value;
        break;
     /* case 'adresse' :
        this.patientS.adresse = event.target.value;
        break;*/
      case 'pathology' :
        this.patientS.pathologie = event.target.value;
        break;
    }
  }

  addPatient() {
    this.cabinet.patients.push(this.patientS);
    // TODO : Envoyer les modifications au serveur

  }
}
