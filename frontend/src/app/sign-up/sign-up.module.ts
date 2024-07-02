import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SignUpComponent } from './sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpService } from './sign-up.service';

const SignUpServiceProvider: Provider = {
  provide: 'SignUpService',
  useClass: SignUpService,
};

@NgModule({
  declarations: [SignUpComponent],
  providers: [SignUpServiceProvider],
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
})
export class SignUpModule {}
