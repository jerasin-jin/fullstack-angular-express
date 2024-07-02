import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from '../router.module';
import { OrderComponent } from './order.component';
import { OrderService } from './order.service';

const OrderServiceProvider: Provider = {
  provide: 'OrderService',
  useClass: OrderService,
};

@NgModule({
  declarations: [OrderComponent],
  providers: [OrderServiceProvider],
  imports: [CommonModule, ReactiveFormsModule, RoutingModule],
})
export class OrderModule {}
