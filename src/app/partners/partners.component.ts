import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router) { }
  showSpinner = true;
  partners: any = [];
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
      this.partners = res.Partners;
    });
  }

  goToPartnerInfo(partner: any) {
    this.route.navigate(['/partners', partner.name, partner.id], {
      queryParams: partner.name,
    });
  }

}
