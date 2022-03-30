import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css'],
})
export class CareersComponent implements OnInit {
  constructor(private httpService: HttpClient, private route: Router) {}
  jobs: any;
  showSpinner = true;  
  showSubSpinner = false;  
  showJobDetails = false;
  showJobs: any;
  clicked: any = {};
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
      this.jobs = res.vacancies;
      
      this.showJobs = this.jobs[0]
    });
  }

  onShowJob(job: any) {
    this.showJobDetails = true;
    this.showJobs = job;
    this.showSubSpinner = true;
      setTimeout(() => {
        this.showSubSpinner = false;
      }, 500);
  }

  onSelectJob = (job: any) => {
    this.route.navigate(['/careers/job/application', job.name, job.id], {
      queryParams: job.name,
    });
  };
}
