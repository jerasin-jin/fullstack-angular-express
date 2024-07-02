import { Component, Inject, OnInit } from '@angular/core';
import { ProductForm, Product } from '../../interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DbProductCreateService } from './db-product-create.service';
import { decodeToken } from '../../util';
import { ShareService } from '../share';
import { Router } from '@angular/router';

@Component({
  selector: 'app-db-product-create',
  templateUrl: './db-product-create.component.html',
  styleUrls: ['./db-product-create.component.css'],
})
export class DbProductCreateComponent implements OnInit {
  constructor(
    @Inject('DbProductCreateService')
    private dbProductCreateService: DbProductCreateService,
    @Inject('ShareService') private shareService: ShareService,
    private router: Router
  ) {}

  public productForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    price: new FormControl(0),
    description: new FormControl(null),
    status: new FormControl('0'),
    weightPriority: new FormControl(0),
    image: new FormControl(null),
    categoryId: new FormControl(1),
    available: new FormControl(0),
  });
  public productItemForm: ProductForm[] = [];
  public loadProductItemForm = false;

  ngOnInit(): void {
    this.dbProductCreateService.getCategories().subscribe({
      next: (value) => {
        this.productItemForm = [
          { name: 'Product Name', key: 'name', type: 'text' },
          { name: 'Product Price', key: 'price', type: 'number' },
          { name: 'Product Available', key: 'available', type: 'number' },
          { name: 'Product Description', key: 'description', type: 'text' },
          {
            name: 'Product Status',
            key: 'status',
            type: 'checkbox',
          },
          {
            name: 'Product Weight Priority',
            key: 'weightPriority',
            type: 'number',
          },
          {
            name: 'Category Name',
            key: 'categoryId',
            type: 'dropdown',
            value,
          },
          { name: 'Product Image', key: 'image', type: 'file' },
        ];
        this.loadProductItemForm = true;
      },
      error: (err) => {
        console.error('err', err);
        if (err.status == 401) {
          this.shareService.signOut();
        }
      },
    });
  }

  public async onChildFormSubmitted(formData: any) {
    console.log('Data from Child:', formData);

    if (formData?.categoryId != null) {
      const categoryId: number = parseInt(formData?.categoryId);
      await this.createProduct({ ...formData, categoryId });
    }
  }

  private async createProduct(data: Product) {
    const jwt = localStorage.getItem('token');
    if (jwt == null) throw 'Error Token';
    const token = decodeToken(jwt);

    const available = data?.available;
    delete data?.available;

    const product = {
      ...data,
      status: parseInt(data?.status as any) as any,
      createBy: token.email,
    };

    console.log('product', product);

    this.dbProductCreateService.createProduct(product).subscribe({
      next: (value) => {
        this.dbProductCreateService
          .createWareHouse({
            amount: available,
            productId: value?.id,
            createBy: token.email,
          })
          .subscribe({
            next: (value) => {
              this.router.navigate(['dashboard/products']);
            },
          });
      },
      error: (err) => {
        if (err.status == 401) {
          this.shareService.signOut();
        }
      },
    });
  }
}
