import {PatientInterface} from "./patient";
import {Adresse} from "./adress";

export interface InfirmierInterface {
  id: string;
  prenom: string;
  nom: string;
  photo: string;
  patientsNSS: PatientInterface[];
  //adresse: Adresse;
}
