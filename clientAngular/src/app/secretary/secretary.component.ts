import { Component, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { CabinetMedicalService} from "../cabinet-medical.service";
import { CabinetInterface } from "../dataInterfaces/cabinet";
import {Http} from '@angular/http';

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SecretaryComponent implements OnInit {
  cabinet: CabinetInterface = {
    nom: '',
    infirmiers: [],
    patients: [],
    patientsNonAffectes: [],
    //adresse: undefined,
  };

  private http: Http;
  flagLoad = false;
  flagSelectNurse = false;
  selectedNurse;
  flagSelectPatient = false;
  selectedPatient;
  flagNewNurse = false;
  flagNewPatient = false;

  constructor(private cms: CabinetMedicalService) {
    cms.getData('/getDataCabinet').then(
      cabi => {
        this.cabinet = cabi || this.cabinet;
        this.flagLoad = true;
      }
    );
  }

  ngOnInit() {
  }

  test() {
    console.log('test');
    const i = {
      id: '0' + (this.cabinet.infirmiers.length + 1),
      prenom: 'oui',
      nom: 'oui',
      photo: '',
      patientsNSS: [],
      //adresse: ''
    };
    this.cabinet.infirmiers.push(i);
  }
  test2() {
    alert('test');
  }

  selectNurse(n) {
    this.flagSelectNurse = true;
    this.selectedNurse = n;
  }

  unselectNurse(n) {
    this.flagSelectNurse = false;
    this.selectedNurse = null;
  }

  selectPatient(p) {
    this.flagSelectPatient = true;
    this.selectedPatient = p;
  }

  unselectPatient(p) {
    this.flagSelectPatient = false;
    this.selectedPatient = null;
  }

  deletePatient(p) {
    console.log(p);
    for (let i = 0; i < this.cabinet.patients.length; i++) {
      if (this.cabinet.patients[i].nss == p.nss) {
        this.cabinet.patients.splice(i, 1);
        const body = '/' + p.nss;
        this.cms.postData('/patient/deletePatient' + body, body, function(n){});
        break;
      }
    }
  }

  deleteNurse(n) {
    for (let i = 0; i < this.cabinet.infirmiers.length; i++) {
      if (this.cabinet.infirmiers[i].id == n.id) {
        this.cabinet.infirmiers.splice(i, 1);
        const body = '/' + n.id;
        this.cms.postData('/nurse/deleteNurse' + body, body, function(n){});
        break;
      }
    }
  }
}
