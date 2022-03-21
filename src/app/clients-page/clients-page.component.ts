import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.css']
})
export class ClientsPageComponent implements OnInit {
  clientDetails: any = {};
  constructor(private activateRoute: ActivatedRoute,
    private httpService: HttpClient) {}

  @Input() clients: any = [];
  showSpinner = true;
  ngOnInit(): void {
    window.scrollTo(0,0);
    if (localStorage['showSpinner']) {
      this.showSpinner = false;
      localStorage.removeItem('showSpinner');
    } else {
      this.showSpinner = true;
      setTimeout(() => {
        this.showSpinner = false;
      }, 500);
    }
  }

}
