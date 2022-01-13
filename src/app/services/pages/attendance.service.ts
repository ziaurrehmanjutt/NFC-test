import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EndpointsService } from '../endpoints.service';



@Injectable({
  providedIn: 'root'
})
export class AttendanceServiceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      })
    };


  constructor(private http: HttpClient ,
              private appService: EndpointsService) { }


  assetList(): Observable<any> {
    return this.http.get(this.appService.assetList, this.httpOptions);
  }
  empList(): Observable<any> {
    return this.http.get(this.appService.empList, this.httpOptions);
  }

  login(frmData): Observable<any> {
    return this.http.post(this.appService.login,this.convertFrmData(frmData), this.httpOptions);
  }

  uploadToServer(frmData): Observable<any> {
    return this.http.post(this.appService.uploadToServer,this.convertFrmData(frmData), this.httpOptions);
  }
  get_nfc(frmData): Observable<any> {
    return this.http.post(this.appService.get_nfc,this.convertFrmData(frmData), this.httpOptions);
  }

  

  convertFrmData(frmData){
    return new HttpParams({ fromObject:frmData});
  }
}



