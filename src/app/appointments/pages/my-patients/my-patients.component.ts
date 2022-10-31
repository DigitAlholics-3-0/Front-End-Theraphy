import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../../security/services/users.service";
import {AppointmentsService} from "../../services/appointments.service";
import {Appointments} from "../../model/appointments";
import {Patient} from "../../../security/model/patient";
import {PatientsService} from "../../../security/services/patients.service";

@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.component.html',
  styleUrls: ['./my-patients.component.css']
})
export class MyPatientsComponent implements OnInit {
  currentUser: number;
  appointments: Appointments[]=[];
  patients: Patient[]=[];
  myPatients: Patient[]=[];

  constructor(private usersService: UsersService, private appointmentsService: AppointmentsService,
              private patientService: PatientsService) {
    this.currentUser = Number(sessionStorage.getItem("typeId"));

  }

  ngOnInit(): void {
    this.appointmentsService.getAll().subscribe((response: any) =>{
      this.appointments = response;

      this.patientService.getAll().subscribe((response: any) =>{
          this.patients = response;
          this.getPatients();
        }
      )
    })
  }


  getPatients(){

    for(let i = 0; i < this.appointments.length; i++){

      if(this.appointments[i].physiotherapist_id == this.currentUser) {

        for(let j = 0; j < this.patients.length; j++) {
          if(this.patients[j].id == this.appointments[i].patient_id
          && this.equalElement(this.patients[j].id)) {

            this.myPatients.push(this.patients[j]);

          }
        }
      }
    }
  }

  equalElement(a: number){
    for(let i = 0; i < this.myPatients.length; i++) {
      if(this.myPatients[i].id == a){
        return false;
      }
    }
    return true;
  }

  getPatientByQuery(name: string){
    if(name?.length) {
      this.patientService.getItemByField('first_name',name).subscribe((response: any)=> {
          this.myPatients = response;
        }
      )}else{
      this.getPatients();
    }
  }

  getPat(name: string, patientsFiltered: Patient[] = [], found: boolean = false) {

    for(let i = 0; i < this.myPatients.length; i++) {
      if(this.myPatients[i].first_name.includes(name) ||
          this.myPatients[i].last_name.includes(name)){
        patientsFiltered.push(this.myPatients[i]);
        found = true;
      }
    }

    if(found && name!="") {
      this.myPatients = patientsFiltered;
    } else{
      this.getPatients();
    }



  }


}