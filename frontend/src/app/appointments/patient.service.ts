import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private _httpClient : HttpClient) { }

  private _url = 'http://localhost:3001/patients'; //url of database s
  private _baseUrl = 'http://localhost:3001/patients';

  private handleError(errorResponse: HttpErrorResponse) {
    if(errorResponse.error instanceof ErrorEvent) {
        console.log('Client Side Error', errorResponse.error.message)
    }else {
        console.log('Server Side Error', errorResponse);
    }
    
    return throwError('There is an interruption of service, try again later');
}

  getPatients() {
    return this._httpClient.get<any>(`${this._url}`).catch(this.handleError); //get function to retrieve data from database
}

//Creates New Patient record
    //savePatient function calls post method 
    savePatient(patient)  {
      return this._httpClient.post(this._baseUrl, patient);
  
  }

  updatePatient(patient: any) 
    {
        const httpHeaders = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*');
            console.log('?!');
            console.log(patient.id);
        
        return this._httpClient.put('http://localhost:3001/patients/' + patient.id , patient, { 'headers': httpHeaders}).catch(this.handleError);
    }

    getPatient(id: number)  {
        return this._httpClient.get<any>(`${this._baseUrl}/${id}`).catch(this.handleError);  //get function to retrieve 1 from database
    }

}
