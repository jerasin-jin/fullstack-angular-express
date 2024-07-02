import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareService } from './share.service';

const ShareServiceProvider: Provider = {
  provide: 'ShareService',
  useClass: ShareService,
};

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ShareServiceProvider],
})
export class ShareModule {}
