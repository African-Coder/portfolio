import { Component, OnInit, Input } from '@angular/core';
import { Patient } from '../models/patient';
import { PatientService } from './patient.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent implements OnInit {

  patients: Patient[] = [];

  sortedPatients : any[];

  private _searchItem : any;
  get searchItem() : any {
    return this._searchItem;
  }
  set searchItem(value : any) {
    this._searchItem = value;
    this.sortedPatients = this.sortPat(value);
  }
  
  sortPat(searchTerm : string) {
    return this.patients.filter(pat =>
      pat.fullName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }


  // id: string = '';
  // fullName: string = '';
  // address: string = '';
  // sex: string = '';
  //photoPath: string = 'frontend/dist/firstApp/assets/images/icon.png';

  // patientList: any[] = [];


  patient: Patient;

  constructor(private _patientService: PatientService,
              private _router: Router,
              private _http: HttpClient) { }

  ngOnInit(): void {

    this._patientService.getPatients() //Use the patient service to connect to database
   .subscribe(data => {
     this.patients = data; 
     
     this.sortedPatients = this.patients; //this allows on first load for patients to be added to filtering array

     console.log(this.patients);
    }); //subscribe data from service to patients array

     
  }

  editPatient(id : number) {
    this._router.navigate(['/edit', id]);
  }

  deletePatient(id : number) {
    //delete patient
    this._patientService.removePatient(id).subscribe(
      () => alert(`Patient with ID: ${this.patient.id}  deleted`),
      (err) => console.log(err)
    );

    this._router.navigate(['/list']);
  }

}
