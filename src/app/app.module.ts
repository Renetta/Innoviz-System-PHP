import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { CareersComponent } from './careers/careers.component';
import { ContactComponent } from './contact/contact.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { EnquiryService } from './InnovizService/enquiry.service';
import { ClientsPageComponent } from './clients-page/clients-page.component';
import { ProfileComponent } from './profile/profile.component';

import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { FileSaverModule } from 'ngx-filesaver';
import { SpinnerComponent } from './spinner/spinner.component';
import { JobAppComponent } from './job-app/job-app.component';
// import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { FileUploadModule} from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    CareersComponent,
    ContactComponent,
    ServiceDetailsComponent,
    ClientsPageComponent,
    ProfileComponent,
    SpinnerComponent,
    JobAppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    NgxExtendedPdfViewerModule,
    FileUploadModule
    // FileSaverModule,
  ],
  providers: [
    EnquiryService,
  ],
  // { provide: LocationStrategy, useClass: HashLocationStrategy },
  bootstrap: [AppComponent],
})
export class AppModule {}