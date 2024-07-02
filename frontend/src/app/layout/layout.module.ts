import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../navbar/navbar.module';
import { LayoutComponent } from './layout.component';
import { RoutingModule } from '../router.module';
import { LayoutService } from './layout.service';
import { NavbarDashboardModule } from '../navbar-dashboard';

const LayoutServiceProvider: Provider = {
  provide: 'LayoutService',
  useClass: LayoutService,
};

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, NavbarModule, RoutingModule, NavbarDashboardModule],
  providers: [LayoutServiceProvider],
  exports: [LayoutComponent],
})
export class LayoutModule {}
