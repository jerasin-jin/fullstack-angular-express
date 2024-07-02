import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details.component';
import { RoutingModule } from '../router.module';
import { ProductDetailService } from './product-details.service';

const ProductDetailServiceProvider: Provider = {
  provide: 'ProductDetailService',
  useClass: ProductDetailService,
};

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [CommonModule, ReactiveFormsModule, RoutingModule],
  providers: [ProductDetailServiceProvider],
  exports: [ProductDetailsComponent],
})
export class ProductDetailsModule {}
