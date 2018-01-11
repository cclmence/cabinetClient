import {Component, Input, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {CabinetInterface} from '.../../../../../PCMCli/cabinetClient/clientAngular/src/app/dataInterfaces/cabinet';
import {PatientInterface} from '.../../../../../PCMCli/cabinetClient/clientAngular/src/app/dataInterfaces/patient';
import {CabinetMedicalService} from '.../../../../../PCMCli/cabinetClient/clientAngular/src/app/cabinet-medical.service';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PatientComponent implements OnInit, OnChanges {
  @Input('patientInfo')
  public patientInfo: PatientInterface;
  public modifiedInfo: PatientInterface;
  @Input('cabinet')
  public cabinet: CabinetInterface;

  public patientNurses;

  constructor(private cms: CabinetMedicalService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    // console.log(this.patientInfo);
    this.modifiedInfo = {
      prenom: Object.assign({}, this.patientInfo).prenom,
      nom: Object.assign({}, this.patientInfo).nom,
      //sexe: Object.assign({}, this.patientInfo).sexe,
      nss: Object.assign({}, this.patientInfo).nss,
      //adresse: Object.assign({}, this.patientInfo).adresse,
      pathologie: Object.assign({}, this.patientInfo).pathologie
    };

    this.patientNurses = [];
    // this.patientNurses.push(this.cabinet.infirmiers[0]);

    for (let i = 0; i < this.cabinet.infirmiers.length; i++) {
      //if (this.cabinet.infirmiers[i].patientsNSS.includes(this.modifiedInfo.nss)) {
        this.patientNurses.push(this.cabinet.infirmiers[i]);
        // this.patientNurses.push(this.cabinet.infirmiers[i]);
      //}
    }

    // console.log(this.patientInfo);
    // console.log(this.modifiedInfo);
  }

 /* modifyInfo() {
    this.patientInfo.nom = Object.assign('', this.modifiedInfo).nom;
    this.patientInfo.prenom = Object.assign('', this.modifiedInfo).prenom;
    //this.patientInfo.adresse = Object.assign('', this.modifiedInfo).adresse;
    this.patientInfo.pathologie = Object.assign('', this.modifiedInfo).pathologie;

    const body = '/' + this.patientInfo.nss + '/' + this.patientInfo.nom + '/' + this.patientInfo.prenom + '/' + this.patientInfo.adresse + '/' + this.patientInfo.pathologie;
    this.cms.postData('/patient/addOrUpdatePatient' + body, body, function(n){});

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
     /!* case 'adresse' :
        this.modifiedInfo.adresse = event.target.value;
        break;*!/
      case 'pathologie' :
        this.modifiedInfo.pathologie = event.target.value;
        break;
    }
  }*/
}
