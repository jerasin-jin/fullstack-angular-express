import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailService } from './product-details.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, forkJoin } from 'rxjs';
import { ShareService } from '../share';

@Component({
  selector: 'product-detail',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css', '../app.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  // product: Product | undefined;
  imageSrc: any = null;
  productName: string = '';

  productForm = new FormGroup({
    id: new FormControl(0),
    price: new FormControl(0),
    description: new FormControl(''),
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject('ProductDetailService')
    private productDetailService: ProductDetailService,
    @Inject('ShareService') private shareService: ShareService
  ) {}

  async ngOnInit() {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));
    this.productDetailService.getProduct(productIdFromRoute).subscribe({
      next: (data) => {
        console.log('data', data);
        this.productName = data.name;
        this.productForm.setValue({
          id: data.id,
          price: data.price,
          description: data.description ?? '',
        });

        if (data.img != null) {
          this.imageSrc = `${environment.apiUrl}/images/${
            data.img
          }?${Date.now()}`;
        } else {
          this.imageSrc = '/assets/images/noImage.jpg';
        }
      },
      error: (err) => {
        if (err?.status == 401) {
          this.shareService.signOut();
          this.shareService.tokenRedirectExpire({
            keyLocalStorage: ['token', 'shopping'],
          });
        }
      },
    });
  }

  updateProduct() {
    const { id, price, description } = this.productForm.value;

    if (id == null || price == null) return;

    forkJoin({
      updateProduct: this.productDetailService.updateProduct({
        id,
        price,
        description: description ?? '',
      }),
      uploadImage: this.uploadImage(id),
    }).subscribe({
      next: (value) => {
        console.log('value', value);
        this.router.navigate(['products']);
      },
      error: (err) => {
        if (err.status == 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('shopping');
          this.router.navigate(['signIn']);
        }
      },
    });
  }

  readURL(event: any): void {
    if (event.target.files != null && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);

      reader.readAsDataURL(file);
    }
  }

  uploadImage(productId: number): Observable<any> {
    const formData = new FormData();

    formData.append('image', this.imageSrc);
    formData.append('productId', productId.toString());

    return this.productDetailService.uploadImage(formData);
  }
}
