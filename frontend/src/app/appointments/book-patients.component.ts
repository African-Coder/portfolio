import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Patient } from '../models/patient';
import { PatientService } from './patient.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-book-patients',
  templateUrl: './book-patients.component.html',
  styleUrls: ['./book-patients.component.css']
})
export class BookPatientsComponent implements OnInit {

  @ViewChild('bookingForm') public bookingForm!: NgForm;

  user: any = {
    id: null,
    fullName: null,
    address: null,
    sex: null,
    reason: null
  }

  constructor(private _addPatientService: PatientService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _http: HttpClient) { }

  ngOnInit(): void {

    this._route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.getPatient(id);
    });

  }

  private getPatient(id: any) { //accepts index from edit() to refill/reuse form

    if (id == 0) {
      this.user = {
        id: null,
        fullName: null,
        address: null,
        sex: null,
        reason: null
      }
    }
    else {
      this.user = this._addPatientService.getPatient(id).subscribe(
        (data: Patient) => {
          this.user = {
            id: data[0].patID,
            fullName: data[0].fullName,
            address: data[0].address,
            sex: data[0].sex,
            reason: data[0].reason
          }
        }
      );

    }
  }

  saveBooking(): void {
    if (this.user.id == null) {
      this.user.id = 0;
      this._addPatientService.savePatient(this.user).subscribe(
        (data: Patient) => {
          console.log('saved data: ' + data);
          this.bookingForm.reset();
          this._router.navigate(['list']);

        },
        (error: any) => console.log(error)
      );
    }
    else {
      console.log(this.user);
      this._addPatientService.updatePatient(this.user).subscribe(
        () => {

          this.bookingForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => console.log(error)
      )

    }
  }

}
