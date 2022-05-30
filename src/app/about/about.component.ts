import { ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor(
    private route: Router,
    private httpService: HttpClient,
    private activateRoute: ActivatedRoute,
    private viewportScroller: ViewportScroller
  ) {}
  clientsTemp: boolean = false;
  partnersTemp: boolean = false;
  showAboutTemp: boolean = true;
  clientsDetails: any = [];
  @ViewChild('aboutus')
  scrollaboutToTop!: ElementRef<HTMLElement>; 
  showSpinner = true;
  ngOnInit(): void {
    window.scrollTo(0, 0);
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
    this.clientsTemp = false;
    this.partnersTemp = false;
    this.showAboutTemp = true;
    this.httpService.get<any>('./assets/innovizDatas.json').subscribe((res) => {
      this.clientsDetails = res.Clients;
    });
  }

  ngAfterViewInit() {
    this.scrollToPosition();
  }

  ngAfterViewChecked() {
    this.scrollToPosition();
  }
  scrollToPosition(): void {
    try {
      this.activateRoute.params.subscribe((param) => {
        if (param['pageSec']) {
          const focusSection =
            this.scrollaboutToTop.nativeElement.querySelector(param['pageSec']);
          focusSection?.scrollTo(0, 0);
        } else {
        }
      });
    } catch (err) {}
  }

  goToContactPage() {
    this.route.navigate(['/contact']);
  }

  showClientsPage() {
    this.clientsTemp = true;
    this.partnersTemp = false;
    this.showAboutTemp = false;
    this.route.navigate(['/our-company', { pageSec: 'clientContentID' }]);
  }

  goToServicesPage() {
    this.route.navigate(['/services', { pageSec: 'serviceContentID' }]);
  }

  showPartnersPage() {
    this.partnersTemp = true;
    this.clientsTemp = false;
    this.showAboutTemp = false;
    this.route.navigate(['/partners']);
  }

  viewAboutSection() {
    this.clientsTemp = false;
    this.partnersTemp = false;
    this.showAboutTemp = true;
  }
}
