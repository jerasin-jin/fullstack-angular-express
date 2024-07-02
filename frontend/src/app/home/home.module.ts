import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RoutingModule } from '../router.module';
import { HomeService } from './home.service';

const HomeServiceProvider: Provider = {
  provide: 'HomeService',
  useClass: HomeService,
};

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RoutingModule],
  providers: [HomeServiceProvider],
  exports: [HomeComponent],
})
export class HomeModule {}
