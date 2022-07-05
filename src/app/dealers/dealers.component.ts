import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.css']
})
export class DealersComponent implements OnInit {

  showSpinner = true;
  constructor(private http: HttpClient) { }
  dealers: any = [];
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
    this.http.get<any>('./assets/innovizDatas.json').subscribe((res) => {
      this.dealers = res.Dealers;
    });
  }

}
