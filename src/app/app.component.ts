import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faMobile } from '@fortawesome/free-solid-svg-icons';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Innoviz Systems';
  faPhone = faPhone;
  faMap = faMapMarker;
  faEnvelope = faEnvelope;
  faMobile = faMobile;
  currentRoute!: string;
  showenquirybutton = true;
  showText = false;
  constructor(
    private el: ElementRef,
    private render: Renderer2,
    private router: Router
  ) {
    this.showenquirybutton = true;
    this.showText = true;
    this.checkURL();
  }
  showSpinner = true;
  ngOnInit() {
    this.checkURL();
    setTimeout(() => {
      this.showSpinner = false;
      localStorage.setItem('showSpinner', 'true');
    }, 2400);
  }

  checkURL() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.showenquirybutton = true;
        if (e.url == '/home') {
          this.showText = false;
        }
        if (e.url == '/contact') {
          this.showenquirybutton = false;
        }
      }
    });
  }

  linkedIn() {
    window.open('https://www.linkedin.com/in/innoviz-systems-915bb9226/');
  }

  whatsapp() {
    // window.open("https://wa.me/+919946759352?text=https://innovizqatar.com/");
    window.open(
      'https://wa.me/+97466318363?text=Hello, I would like to know more about your services in Innoviz Systems. https://innovizqatar.com/services/'
    );
  }

  contactuspage() {
    this.router.navigate(['/contact']);
  }

  checkRightClicked() {
    return false;
  }

  openCompanyProfile() {
    this.downloadProfile();
    const pdf = 'assets/InnovizProfile.pdf';
    setTimeout(() => {
      let w: any = window.open(pdf);
      w.addEventListener('load', function () {
        // w.document.title = 'Innoviz Systems';
        w.document.write(`<html>
        <head>
          <title>Innoviz Systems</title>
          <link rel="icon" type="image/x-icon" href="assets/images/logo.png" />
        </head>
        <body>
          <iframe style="width: 100%; height: 100%; margin: 0; padding: 0; border: none;" src="${pdf}"></iframe>
        </body>
      </html>`);
      });
    }, 1000);
  }

  downloadProfile() {
    const fileName = 'Innoviz Systems.pdf';
    saveAs('assets/InnovizProfile.pdf', fileName);
  }

  onActive() {
    window.scroll(0, 0);
  }

  scrollDown: any = false;
  canvas: any = false;
  @HostListener('document: scroll')
  scrollfunction() {
    this.canvas = false;
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.scrollDown = true;
    } else {
      this.scrollDown = false;
    }
  }

  @HostListener('click', ['$event.target'])
  onClick(btn: HTMLElement) {
    if (
      btn?.className === 'navbar-toggler' ||
      btn?.className === 'navbar-toggler-icon'
    ) {
      this.canvas = true;
    }

    localStorage['canvasOpen'] = this.canvas;

    // return false;
  }
}
function isButton(
  el: any,
  HTMLElement: { new (): HTMLElement; prototype: HTMLElement },
  arg2: number
) {
  throw new Error('Function not implemented.');
}
