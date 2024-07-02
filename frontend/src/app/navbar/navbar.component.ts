import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NavbarService } from './navbar.service';
import { Observable, Subscription } from 'rxjs';
import { decodeToken } from '../../util';
import { SessionUser } from '../../interfaces';
import { ShareService } from '../share';
import { Store } from '@ngrx/store';
import { setSelectItem, setSessionUser } from '../store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  itemSelectCount: number;
  // getIsShowSignInSub: Subscription;
  isShowSignIn$: Observable<boolean>;
  getSelectItemSub: Subscription;
  getSessionUser$: Observable<Record<string, any>>;
  userId: number;
  role: string;

  constructor(
    @Inject('NavbarService') private navbarService: NavbarService,
    private store: Store<{
      isLoginReducer: boolean;
      sessionUserReducer: Record<string, any>;
      selectItemReducer: Record<string, any>[];
    }>,
    @Inject('ShareService') private shareService: ShareService
  ) {}

  signOut(): void {
    this.shareService.signOut();
  }

  ngOnInit(): void {
    let tokenSessionUser: SessionUser = null;
    const getSelectItem = localStorage.getItem('shopping');
    const getToken = localStorage.getItem('token');

    if (getToken != null) {
      tokenSessionUser = decodeToken(getToken);
    }

    if (tokenSessionUser != null) {
      this.userId = tokenSessionUser.id;
      // this.navbarService.setSessionUser(tokenSessionUser);
      this.store.dispatch(setSessionUser({ session: tokenSessionUser }));
    }

    console.log('shopping', getSelectItem);

    if (getSelectItem != null) {
      // this.navbarService.setSelectItem(JSON.parse(getSelectItem));
      this.store.dispatch(
        setSelectItem({ session: JSON.parse(getSelectItem) })
      );
    }

    this.isShowSignIn$ = this.store.select('isLoginReducer');

    this.store.select('selectItemReducer').subscribe({
      next: (value) => {
        this.itemSelectCount = value.length;
      },
    });

    this.store.select('sessionUserReducer').subscribe((e) => {
      this.role = e?.role;
    });
  }

  ngOnDestroy(): void {
    // this.getIsShowSignInSub.unsubscribe();
    // this.getSelectItemSub.unsubscribe();
    // this.getSessionUser.unsubscribe();
  }
}
