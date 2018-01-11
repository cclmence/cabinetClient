import {InfirmierInterface} from "./nurse";
import {PatientInterface} from "./patient";
import {Adresse} from "./adress";

export interface CabinetInterface {
  nom: string;
  infirmiers: InfirmierInterface[];
  patients: PatientInterface [];
  patientsNonAffectes: PatientInterface  [];
 //adresse: Adresse;
}
