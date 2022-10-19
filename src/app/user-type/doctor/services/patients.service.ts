import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Appointments} from "../../../shared/model/appointments";
import {HttpClient} from "@angular/common/http";
import {Patient} from "../model/patient";

@Injectable({
  providedIn: 'root'
})
export class PatientsService  extends BaseService<Patient> {
  endPoint = '/patients';

  constructor(http: HttpClient) {
    super(http);
    this.basePath += this.endPoint;
  }
}
