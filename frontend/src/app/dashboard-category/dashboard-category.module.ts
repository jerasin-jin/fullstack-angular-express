import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DashboardCategoryComponent } from './dashboard-category.component';
import { DashboardCategoryService } from './dashboard-category.service';

const DashboardCategoryServiceProvider: Provider = {
  provide: 'DashboardCategoryService',
  useClass: DashboardCategoryService,
};

@NgModule({
  declarations: [DashboardCategoryComponent],
  imports: [CommonModule, MatIconModule],
  providers: [DashboardCategoryServiceProvider],
})
export class DashboardCategoryModule {}
