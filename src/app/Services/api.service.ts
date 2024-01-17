import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl: string = 'http://localhost:5000/api'
  constructor( private http: HttpClient) { }

postEmployee(employeeData: any): Observable<any>{
return this.http.post<any>(this.apiUrl+'/employee', employeeData)
}

getEmployees(): Observable<any[]>{
  return this.http.get<any[]>(this.apiUrl + '/getEmployee')
}

}
