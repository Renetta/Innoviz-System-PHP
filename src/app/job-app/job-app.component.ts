import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EnquiryService } from '../InnovizService/enquiry.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
class Career {
  constructor(
    public fname: string = '',
    public lname: string = '',
    public email: string = '',
    public phone: any = '',
    public position: string = '',
    public subject: string = '',
    public positionID: number = 0,
    public fileToUpload: any = '',
    public file: any = '',
  ) {}
}

@Component({
  selector: 'app-job-app',
  templateUrl: './job-app.component.html',
  styleUrls: ['./job-app.component.css'],
})
export class JobAppComponent implements OnInit {
  career: Career = new Career();
  @ViewChild('f') form: any;
  responseMessage: any;
  emailSentSuccess: boolean = false;
  emailReceived: boolean = false;
  showSpinner = true;
  file=new FormControl('');
  formData = new FormData();
  constructor(
    private httpService: HttpClient,
    private activatedRoute: ActivatedRoute,
    private service: EnquiryService,
    private route: Router
  ) {}
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

  onFileSelected(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      this.formData.append('file', file, file.name);
    }
  }

  backToCareersPage() {
    this.route.navigate(['/careers']);
  }

  loadData() {
    this.career.position = this.activatedRoute.snapshot.params['name'];
    this.career.positionID = this.activatedRoute.snapshot.params['id'];
  }

  sendApplication() {
    this.emailSentSuccess = true;
    this.career.subject = 'JOB APPLICATION - ' + this.career.position;
    const careerData = this.career;
    this.formData.append('info', JSON.stringify(this.career));
    this.service.sendjobApplication(this.formData).subscribe((data) => {
      this.emailSentSuccess = false;
      this.emailReceived = true;
      this.responseMessage = data;
      this.form.reset();
      this.loadData();
    });
  }
}
