import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductListService } from './product-list.service';
import { RoutingModule } from '../router.module';

const ProductListServiceProvider: Provider = {
  provide: 'ProductListService',
  useClass: ProductListService,
};

@NgModule({
  declarations: [ProductListComponent],
  providers: [ProductListServiceProvider],
  imports: [CommonModule, RoutingModule],
})
export class ProductListModule {}
