import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SignInService } from './sign-in.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { decodeToken } from '../../util';
import { isLogin, setSessionUser } from '../store';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  showAlert = false;

  constructor(
    @Inject('SignInService') private signInService: SignInService,
    private router: Router,
    private store: Store<{ isLoginReducer: boolean }>
  ) {}

  signInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  async onSubmit() {
    const { email, password } = this.signInForm.value;

    if (email == null || password == null) {
      this.showAlert = true;
      return;
    }

    this.signInService.signIn({ email, password }).subscribe({
      next: (value) => {
        if (value.token != null) {
          localStorage.setItem('token', value.token);
          const tokenSessionUser = decodeToken(value.token);
          this.store.dispatch(setSessionUser({ session: tokenSessionUser }));
          this.store.dispatch(isLogin());
          this.router.navigate(['products']);
        } else {
          // alert('Error');
          this.showAlert = true;
        }
      },
      error: (e) => {
        console.log(e);
        localStorage.removeItem('token');
        this.showAlert = true;
      },
    });
  }
}
