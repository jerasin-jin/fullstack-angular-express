import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from '../router.module';
import { HistoryComponent } from './history.component';
import { HistoryService } from './history.service';

const HistoryServiceProvider: Provider = {
  provide: 'HistoryService',
  useClass: HistoryService,
};

@NgModule({
  declarations: [HistoryComponent],
  providers: [HistoryServiceProvider],
  imports: [CommonModule, RoutingModule],
})
export class HistoryModule {}
