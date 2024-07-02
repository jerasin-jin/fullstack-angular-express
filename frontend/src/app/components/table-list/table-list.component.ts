import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})
export class TableListComponent implements OnInit {
  totalPage: number[];
  @Input() data: BehaviorSubject<any[]>;
  page: number;
  size: number;
  resource: any[] = [];
  thTable: string[] = [];

  ngOnInit(): void {
    this.data.asObservable().subscribe({
      next: (item) => {
        item.forEach((data, index) => {
          for (const [key, value] of Object.entries(data)) {
            console.log(`${key}: ${value} , index = ${index}`);

            if (index == 0) {
              this.thTable.push(key);
            }

            this.resource.push(value);
          }
        });
      },
    });
  }

  public selectPageAndSize(page: number, size: number) {}
}
