import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DbProductCreateComponent } from './db-product-create.component';
import { ItemFormModule } from '../components';
import { DbProductCreateService } from './db-product-create.service';
import { ShareService } from '../share';

const DbProductCreateServiceProvider: Provider = {
  provide: 'DbProductCreateService',
  useClass: DbProductCreateService,
};

const ShareServiceProvider: Provider = {
  provide: 'ShareService',
  useClass: ShareService,
};

@NgModule({
  declarations: [DbProductCreateComponent],
  imports: [CommonModule, ItemFormModule],
  providers: [DbProductCreateServiceProvider, ShareServiceProvider],
})
export class DbProductCreateModule {}
