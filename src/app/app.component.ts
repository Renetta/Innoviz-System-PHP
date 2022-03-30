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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'InnovizSystemsWebsite';
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
