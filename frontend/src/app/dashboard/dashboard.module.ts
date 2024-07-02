import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './dashboard.component';
import { RoutingModule } from '../router.module';
import { DashboardService } from './dashboard.service';
import { ShareService } from '../share';

const DashboardServiceProvider: Provider = {
  provide: 'DashboardService',
  useClass: DashboardService,
};

const ShareServiceProvider: Provider = {
  provide: 'ShareService',
  useClass: ShareService,
};

@NgModule({
  declarations: [DashboardComponent],
  providers: [DashboardServiceProvider, ShareServiceProvider],
  imports: [RoutingModule, CommonModule, MatIconModule],
})
export class DashboardModule {}
