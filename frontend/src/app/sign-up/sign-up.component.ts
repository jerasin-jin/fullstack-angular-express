import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SignUpService } from './sign-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  showAlert: boolean = false
  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  constructor(
    @Inject('SignUpService')
    private signUpService: SignUpService,
    private router: Router,
  ) {}

  async onSubmit() {
    const { email, password, firstName, lastName } = this.signUpForm.value;

    console.log('onSubmit');

    if (
      email == null ||
      password == null ||
      firstName == null ||
      lastName == null
    ) {
      return null;
    }

  
    this.signUpService
      .signUp({ email, password, firstName, lastName })
      .subscribe({
        next: (value) =>{
          console.log('next', value);
          this.router.navigate(['signIn']);
        },
        error:(err)=> {
          console.log(err);
          this.showAlert = true
        },
      });
  }
}
