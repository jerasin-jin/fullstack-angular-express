import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NavbarService } from './navbar.service';
import { ShareService } from '../share';

const NavbarServiceProvider: Provider = {
  provide: 'NavbarService',
  useClass: NavbarService,
};

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, MatIconModule, RouterModule],
  providers: [NavbarServiceProvider],
  exports: [NavbarComponent],
})
export class NavbarModule {}
