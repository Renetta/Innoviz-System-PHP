import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
// import { FileSaverService } from 'ngx-filesaver';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  showSpinner = true;
  ngOnInit(): void {
    setTimeout(() => {
      this.showSpinner = false;
      this.onSave();
    }, 3000);
  }

  onSave() {
    const fileName = 'Innoviz Systems.pdf';
    saveAs('assets/InnovizProfile.pdf', fileName);
  }
}
