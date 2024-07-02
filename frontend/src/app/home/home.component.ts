import {
  Component,
  Inject,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { HomeService } from './home.service';
import { Product } from '../../interfaces';
import { environment } from '../../environments/environment';
import { Pagination } from '../../interfaces/base.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChild('mySlides', { read: ElementRef })
  mySlides?: ElementRef<HTMLDivElement>;

  imageTopTierSuggest: Product[] = [];

  constructor(
    @Inject('HomeService') private homeService: HomeService,
    private elementRef: ElementRef
  ) {}

  ngAfterViewInit() {
    console.log(
      'this.elementRef.nativeElement',
      this.elementRef.nativeElement.getElementsByClassName('mySlides')
    );
    if (this.mySlides != null) {
      console.log('test', this.mySlides);
      this.mySlides.nativeElement.style.backgroundColor = 'red';
    }
  }

  ngOnInit(): void {
    this.homeService.getSuggestProduct().subscribe({
      next: (value: Pagination<Product[]>) => {
        this.imageTopTierSuggest = value.data.map((product) => {
          return {
            ...product,
            img:
              product.img != null
                ? `${environment.apiUrl}/images/${product.img}`
                : '/assets/images/noImage.jpg',
          };
        });
      },
    });
  }
}
