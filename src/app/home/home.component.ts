import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { map } from 'rxjs';
import { style } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private route: Router, private httpService: HttpClient) {}

  name: any = '';
  partners: any = [];
  services: any = [];
  partnerOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['ddf', 'ewewe'],
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };
  showSpinner = true;
  images = new Array(
    './assets/images/networking.png',
    './assets/images/parking.png',
    './assets/images/securitysoln.png',
    './assets/images/ictbanner5.png',
  );

  bgImageVariable: any;
  currImage = document.getElementById('headeContentId');
  ngOnInit(): void {
    this.bgImageVariable = './assets/images/ictbanner5.png';
    this.changeBackground();
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
      this.partners = res.Clients;
      this.services = res.Services;
    });
  }

  
  changeBackground() {
    let i = 0;
    setInterval(() => {
      if (i > this.images.length - 1) i=0;
      this.bgImageVariable = this.images[i];
      i++;
    }, 3000);
  }

  onSelectService = (service: any) => {
    this.route.navigate(['/services', service.name], {
      queryParams: service.name,
    });
  };

  goToAboutPage() {
    this.route.navigate(['/our-company', { pageSec: 'aboutUsContentID' }], {
      fragment: 'aboutUsContentID',
    });
  }
  goToContactPage() {
    this.route.navigate(['/contact']);
  }
}
