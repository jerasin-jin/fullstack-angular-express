import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  showNavbarReducer$: Observable<boolean>;
  showNavbarDashBoardReducer$: Observable<boolean>;

  constructor(
    private store: Store<{
      showNavbarDashBoardReducer: boolean;
      showNavbarReducer: boolean;
    }>
  ) {
    this.showNavbarDashBoardReducer$ = this.store.select(
      'showNavbarDashBoardReducer'
    );
    this.showNavbarReducer$ = this.store.select('showNavbarReducer');
  }

  ngOnInit() {
    console.log('ngOnInit LayoutComponent');
  }
}
