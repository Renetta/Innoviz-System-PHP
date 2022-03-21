import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnquiryService } from '../InnovizService/enquiry.service';
import {
  FormsModule,
  FormGroup,
  FormControl
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// import { Enquiry } from '../modal/enquiry';
class Enquiry {
  constructor(public fname: string = '',
  public lname: string = '',
  public email: string = '',
  public phone: any = '',
  public company: string = '',
  public service: any = '',
  public message: string = '',
  public subject: string = '') {
  }
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {

  enquiry: Enquiry = new Enquiry();
  @ViewChild('f') form: any;  
  // @ViewChild('contactContainer') 
  containers!: ElementRef<HTMLElement>;
  services: any;
  officeImg = './assets/images/office1.jpg';
  selectOtherService: any = {
    id: 10015,
    name: 'Others Services',
  };
  responseMessage: any;
  emailSentSuccess: boolean = false;
  emailReceived: boolean = false;

  constructor(
    private activateRoute: ActivatedRoute,
    private httpService: HttpClient,
    private service: EnquiryService
  ) {}
  
  showSpinner = true;
  ngOnInit(): void {
    if (localStorage['showSpinner']) {
      this.showSpinner = false;
      localStorage.removeItem('showSpinner');
      this.loadData();
    } else {
      this.showSpinner = true;
      setTimeout(() => {
        this.showSpinner = false;
        this.loadData();
      }, 500);
    }
  }

  loadData() {
    this.httpService.get<any>('./assets/innovizDatas.json').subscribe((res) => {
      res.ServiceComponents[res.ServiceComponents.length] =
        this.selectOtherService;
      this.services = res.ServiceComponents;
      this.enquiry.service = res.ServiceComponents[0].name;
    });
  }

  sendEnquiry() {
    const enquiryData = this.form.value;
    console.log('rhht', enquiryData);
    this.emailSentSuccess = true;
    enquiryData.subject = 'WEB ENQUIRY - ' + enquiryData.service;
    this.service.sendEnquiry(enquiryData).subscribe((data) => {
      this.emailSentSuccess = false;
      this.emailReceived = true;
      this.responseMessage = data;
      this.form.reset();
      this.loadData();
    });
  }
}