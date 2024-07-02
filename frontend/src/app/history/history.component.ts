import { Component, Inject, OnInit } from '@angular/core';
import { HistoryService } from './history.service';
import { Transaction } from '../../interfaces';
import { decodeToken } from '../../util';
import { ShareService } from '../share';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  private userId: number;
  public data: Transaction[];

  constructor(
    @Inject('HistoryService') private historyService: HistoryService,
    @Inject('ShareService') private shareService: ShareService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const decode = decodeToken(token);
    this.userId = decode.id;

    this.historyService.getTransactionsByCreated(this.userId).subscribe({
      next: (value) => {
        this.data = value;
      },
      error: (err) => {
        if (err?.status == 401) {
          this.shareService.tokenRedirectExpire();
          return;
        }

        throw err;
      },
    });
  }
}
