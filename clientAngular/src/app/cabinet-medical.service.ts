import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {CabinetInterface} from './dataInterfaces/cabinet';
import { InfirmierInterface } from './dataInterfaces/nurse';
import { PatientInterface } from './dataInterfaces/patient';
import { Adresse } from './dataInterfaces/adress';

@Injectable()
export class CabinetMedicalService {

  constructor(private http: Http) { }

  getData( url: string ): Promise<void | CabinetInterface> {
    return this.http.get(url).toPromise().then(res => {
        // console.log('on a ', res.json());
        const nom: string = res.json().name;
        const infirmiers: InfirmierInterface[] = res.json().nurses;
        const patients: PatientInterface[] = res.json().patients;
        const patientsNonAffectes: PatientInterface[] = res.json().unaffectedPatients;
        //const adresse: Adresse = res.json().address;
        const cabinet: CabinetInterface = {nom, infirmiers, patients, patientsNonAffectes, /*adresse*/};
        console.log(cabinet);
        return cabinet;
      },
      err => {
        console.log('erreur cabinetMedicalService/getData');
      }
    );
  }

  NurseS( nNurse: InfirmierInterface): void {
    const data = 'id=' + nNurse.id + '&name=' + nNurse.nom + '&forName=' + nNurse.prenom + '&adress=' /*+ nNurse.adresse*/;
    console.log('oui ?');
    this.http.post('/nurse/addOrUpdateNurse', data).toPromise().then();
  }

  postData( url: string, body, callback): any {
    console.log('post start');
    return this.http.post(url, body/*, options*/).toPromise().then(data => {
      console.log("post done");
      //   callback();
    }, err =>{
      console.log("oups : " + err);
    });
  }
}
