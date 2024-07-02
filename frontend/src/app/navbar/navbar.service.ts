import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SelectItem {
  productId: number;
  amount: number;
  name: string;
  price: number;
}

@Injectable()
export class NavbarService {
  // private selectItem = new BehaviorSubject<SelectItem[]>([]);
  // public setSelectItem(payload: SelectItem[]) {
  //   return this.selectItem.next(payload);
  // }
  // public getSelectItem() {
  //   return this.selectItem.asObservable();
  // }
}
