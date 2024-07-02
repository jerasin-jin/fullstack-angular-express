import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DashboardUserComponent } from './dashboard-user.component';
import { TableListModule } from '../components';
import { DashboardUserService } from './dashboard-user.service';

const DashboardUserServiceProvider: Provider = {
  provide: 'DashboardUserService',
  useClass: DashboardUserService,
};

@NgModule({
  declarations: [DashboardUserComponent],
  imports: [CommonModule, MatIconModule, TableListModule],
  providers: [DashboardUserServiceProvider],
})
export class DashboardUserModule {}
