import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from '../router.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { UserService } from './user.service';

const UserServiceProvider: Provider = {
  provide: 'UserService',
  useClass: UserService,
};

@NgModule({
  declarations: [UserComponent],
  providers: [UserServiceProvider],
  imports: [CommonModule, RoutingModule, ReactiveFormsModule],
})
export class UserModule {}
