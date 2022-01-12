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

  // myLeaveList(): Observable<any> {
  //   return this.http.get(this.appService.MY_LEAVE_LIST, this.httpOptions);
  // }
  // getMyAttendance(): Observable<any> {
  //   return this.http.get(this.appService.MY_ATTENDANCE, this.httpOptions);
  // }

  // addAttendanceLeave(frmData): Observable<any> {
  //   return this.http.post(this.appService.APPLY_FOR_LEAVE,this.convertFrmData(frmData), this.httpOptions);
  // }
  // adminAttendanceCheck(frmData): Observable<any> {
  //   return this.http.post(this.appService.ADMIN_ATTENDANCE_CHECK,this.convertFrmData(frmData), this.httpOptions);
  // }
  // singleEmpSingleDayAttendance(frmData): Observable<any> {
  //   return this.http.post(this.appService.SINGLE_EMP_DAY_ATTENDANCE,this.convertFrmData(frmData), this.httpOptions);
  // }
  // adminUpdateAttendance(frmData): Observable<any> {
  //   return this.http.post(this.appService.ADMIN_UPDATE_ATTENDANCE,this.convertFrmData(frmData), this.httpOptions);
  // }

  convertFrmData(frmData){
    return new HttpParams({ fromObject:frmData});
  }
}



