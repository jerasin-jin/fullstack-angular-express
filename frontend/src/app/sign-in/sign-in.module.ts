import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in.component';
import { MatIconModule } from '@angular/material/icon';
import { SignInService } from './sign-in.service';

const SignInServiceProvider: Provider = {
  provide: 'SignInService',
  useClass: SignInService,
};

@NgModule({
  declarations: [SignInComponent],
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  providers: [SignInServiceProvider],
  exports: [SignInComponent],
})
export class SignInModule {}
