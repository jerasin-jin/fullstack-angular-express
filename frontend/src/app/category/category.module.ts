import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from './category.service';
import { CategoryComponent } from './category.component';
import { RoutingModule } from '../router.module';
import { ShareService } from '../share';

const CategoryServiceProvider: Provider = {
  provide: 'CategoryService',
  useClass: CategoryService,
};

const ShareServiceProvider: Provider = {
  provide: 'ShareService',
  useClass: ShareService,
};

@NgModule({
  declarations: [CategoryComponent],
  providers: [CategoryServiceProvider, ShareServiceProvider],
  imports: [CommonModule, RoutingModule],
})
export class CategoryModule {}
