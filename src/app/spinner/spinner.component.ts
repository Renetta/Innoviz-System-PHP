import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  @Input() message = '';
  constructor() { }

  changeOverlayLeft : any = false;
  ngOnInit(): void {
    // this.changeOverlayLeft = false;
    if (localStorage['canvasOpen']) {
      this.changeOverlayLeft = true;
    }
  }

}
