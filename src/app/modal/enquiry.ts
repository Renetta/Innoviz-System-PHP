import { Inject, Injectable } from "@angular/core";

@Injectable()
export class Enquiry {
  constructor(@Inject(String) public fname: string = '',
  @Inject(String) public lname: string = '',
  @Inject(String) public email: string = '',
  @Inject(String) public phone: any = '',
  @Inject(String) public company: string = '',
  @Inject(String) public service: any = '',
  @Inject(String) public message: string = '',
  @Inject(String) public subject: string = '') {
  }
}