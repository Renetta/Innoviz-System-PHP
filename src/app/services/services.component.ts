import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute, private httpService: HttpClient) { }
  services : any = [];
  serviceImages : any = [];
  serviceOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  @ViewChild('serviceContentID')
  containers!: ElementRef<HTMLElement>;
  showSpinner = true;
  ngOnInit(): void {
    if (localStorage['showSpinner']) {
      this.showSpinner = false;
      this.loadData();
      localStorage.removeItem('showSpinner');
    } else {
      this.showSpinner = true;
      setTimeout(() => {
        this.showSpinner = false;
        this.loadData();
      }, 500);
    }
  }
  
  loadData() {
    this.httpService.get<any>('./assets/innovizDatas.json').subscribe(
      (res) => {
        this.services = res.ServiceComponents;
        this.serviceImages = res.Services;
      }
    )
  }

  ngAfterViewInit(): void {
    this.activateRoute.params.subscribe((param) => {
      if (param['pageSec']) {
        const section = this.containers.nativeElement.querySelector(
          `#${param['pageSec']}`
        );
        console.log(section);
        section?.scrollIntoView();
      }
    });
  }

}
