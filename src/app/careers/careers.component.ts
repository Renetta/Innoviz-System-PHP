import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {

  constructor(private httpService: HttpClient) { }
  jobs: any;
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
      this.jobs = res.vacancies;
    });
  }
}
