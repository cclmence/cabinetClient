import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { CabinetMedicalService} from "../cabinet-medical.service";
import { CabinetInterface } from "../dataInterfaces/cabinet";
import {InfirmierInterface} from "../dataInterfaces/nurse";

@Component({
  selector: 'app-nurseS',
  templateUrl: './nurseS.component.html',
  styleUrls: ['./nurseS.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NurseSComponent implements OnInit {
  @Input('cabinet')
  public cabinet: CabinetInterface;

  public NurseS: InfirmierInterface;

  public errorMessage = '';

  constructor(private cms : CabinetMedicalService) {
   /* cms.getData("/getCabinetData").then( cabinet => {
        this.cabinet },
      err => {console.log("Connexion Impossible")}
    );*/
  }

  ngOnInit() {
    this.NurseS = {
      id: '',
      prenom: '',
      nom: '',
      photo: '',
      patientsNSS: [],
     // adresse: ''
    };
  }
  changeModifiedInfo(event: any) {
    // console.log(event);
    switch (event.target.name) {
      case 'id' :
        this.NurseS.id = event.target.value;
        break;
      case 'nom' :
        this.NurseS.nom = event.target.value;
        break;
      case 'prenom' :
        this.NurseS.prenom = event.target.value;
        break;
   /*   case 'adresse' :
        this.NurseS.adresse = event.target.value;
        break;*/
    }
  }

  addNurse() {

    const allFilled = ((this.NurseS.id !== '' && this.NurseS.nom !== '' && this.NurseS.prenom !== '' /*&& this.NurseS.adresse !== ''*/) ? true : false);

    let idNotExists = true;

    for (let i = 0; i < this.cabinet.infirmiers.length; i++){
      if (this.NurseS.id === this.cabinet.infirmiers[i].id){
        idNotExists = false;
        break;
      }
    }

    if (idNotExists && allFilled) {
      this.cabinet.infirmiers.push(this.NurseS);

      // let body =  JSON.stringify({
      //   id: this.newNurse.id,
      //   name: this.newNurse.nom,
      //   forname: this.newNurse.prenom,
      //   address: this.newNurse.adresse,
      // });
      // body = 'id=' + this.newNurse.id + '&name=' + this.newNurse.nom + '&forName=' + this.newNurse.prenom + '&adress=' + this.newNurse.adresse;
      const body = '/' + this.NurseS.id + '/' + this.NurseS.nom + '/' + this.NurseS.prenom + '/' /*+ this.NurseS.adresse*/;
      // console.log(body);
      this.cms.postData('/nurseS/addOrUpdateNurse' + body, body, function (n) {
      });
      this.errorMessage = '';
      } else {
      this.errorMessage = '';

      if (!allFilled) {
        this.errorMessage += 'Tous les champs doivent etre remplis';
      }

      if(!idNotExists && !allFilled){
        this.errorMessage += '  -  ';
      }

      if (!idNotExists) {
        this.errorMessage += 'Id déjà utilisée';
      }
    }
  }
}
