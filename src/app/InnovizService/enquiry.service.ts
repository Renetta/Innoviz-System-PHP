import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment';
// import { Enquiry } from '../modal/enquiry';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EnquiryService {
  constructor(private http: HttpClient) { }

  // rooteURL = '/api/';
  // sendEnquiry(enquiry: any): Observable<string> {
  //   return this.http.post(this.rooteURL + 'enquiry', enquiry, {responseType: 'text'});
  // }

  rooteURL = "http://innovizqatar.com/php/";
  // rooteURL = "http://localhost/";
  sendEnquiry(enquiry: any) {
    return this.http.post(this.rooteURL + 'mail.php', enquiry, {responseType: 'text'});
  }

  getData() {
    return this.http.get<any>('./assets/innovizDatas.json');
  }

  sendjobApplication(career: any) {
    return this.http.post(this.rooteURL + 'career.php', career, {responseType: 'text'});
  }
}
