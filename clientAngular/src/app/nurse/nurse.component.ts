import {Component, Input, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {InfirmierInterface} from '../../../../../PCMCli/clientAngular/src/app/dataInterfaces/nurse';
import {CabinetInterface} from '../../../../../PCMCli/clientAngular/src/app/dataInterfaces/cabinet';
import {CabinetMedicalService} from '../../../../../PCMCli/clientAngular/src/app/cabinet-medical.service';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [CabinetMedicalService]
})
export class NurseComponent implements OnInit, OnChanges {
  @Input('nurseInfo')
  public nurseInfo: InfirmierInterface;
  public modifiedInfo: InfirmierInterface;
  @Input('cabinet')
  public cabinet: CabinetInterface;

  public nursePatients;
  public newHandledPatient;

  constructor(private cms: CabinetMedicalService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.modifiedInfo = {
      id: Object.assign({}, this.nurseInfo).id,
      nom: Object.assign({}, this.nurseInfo).nom,
      prenom: Object.assign({}, this.nurseInfo).prenom,
      photo: Object.assign({}, this.nurseInfo).photo,
      //adresse: Object.assign({}, this.nurseInfo).adresse,
      patientsNSS: []
    };
    for (let i = 0; i < this.nurseInfo.patientsNSS.length; i++) {
      this.modifiedInfo.patientsNSS.push(this.nurseInfo.patientsNSS[i]);
    }
    // console.log(this.nurseInfo);
    // console.log(this.modifiedInfo);
    this.setNursePatients();
  }

  modifyInfo() {
    let body;
    const toDelete = [];
    const toAdd = [];
    for (let i = 0; i < this.modifiedInfo.patientsNSS.length; i++) {
      const NSS = this.modifiedInfo.patientsNSS[i];
      if (!this.nurseInfo.patientsNSS.includes(NSS)) {
        toAdd.push(NSS);
      }
    }
    for (let i = 0; i < this.nurseInfo.patientsNSS.length; i++) {
      const NSS = this.nurseInfo.patientsNSS[i];
      if (!this.modifiedInfo.patientsNSS.includes(NSS)) {
        toDelete.push(NSS);
      }
    }

    console.log(toDelete);
    console.log(toAdd);

    for (let i = 0; i < toAdd.length; i++) {
      body = '/' + this.nurseInfo.id + '/' + toAdd[i];
      this.cms.postData('/nurse/addPatient' + body, body, function(n){});
    }
    for (let i = 0; i < toDelete.length; i++) {
      body = '/' + this.nurseInfo.id + '/' + toDelete[i];
      console.log(body);
      this.cms.postData('/nurse/removePatient' + body, body, function(n){});
    }

    this.nurseInfo.nom = Object.assign('', this.modifiedInfo).nom;
    this.nurseInfo.prenom = Object.assign('', this.modifiedInfo).prenom;
    //this.nurseInfo.adresse = Object.assign('', this.modifiedInfo).adresse;
    this.nurseInfo.patientsNSS = Object.assign('', this.modifiedInfo).patientsNSS;

    body = '/' + this.nurseInfo.id + '/' + this.nurseInfo.nom + '/' + this.nurseInfo.prenom + '/' /*+ this.nurseInfo.adresse*/;
    this.cms.postData('/nurse/addOrUpdateNurse' + body, body, function(n){});

    this.ngOnChanges();
  }

  changeModifiedInfo(event: any) {
    // console.log(event);
    switch (event.target.name) {
      case 'nom' :
        this.modifiedInfo.nom = event.target.value;
        break;
      case 'prenom' :
        this.modifiedInfo.prenom = event.target.value;
        break;
     /* case 'adresse' :
        this.modifiedInfo.adresse = event.target.value;
        break;*/
    }
  }

  changeNewSSN(event: any) {
    this.newHandledPatient = event.target.value;
  }

  addHandlePatient() {
    this.modifiedInfo.patientsNSS.push(this.newHandledPatient);
    this.setNursePatients();
  }

  removePatient(id) {
    // console.log(id);
    for (let i = 0; i < this.modifiedInfo.patientsNSS.length; i++) {
      if (this.modifiedInfo.patientsNSS[i] === id) {
        this.modifiedInfo.patientsNSS.splice(i, 1);
      }
    }
    this.setNursePatients();
  }

  setNursePatients() {
    this.nursePatients = [];
    for (let i = 0; i < this.modifiedInfo.patientsNSS.length; i++) {
      for (let j = 0; j < this.cabinet.patients.length; j++) {
      //  if (this.modifiedInfo.patientsNSS[i] === this.cabinet.patients[j].nss) {
          this.nursePatients.push(this.cabinet.patients[j]);
        }
      }
    }
}
