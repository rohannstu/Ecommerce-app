import { Component, inject, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponent } from './product-card/product-card.component';
import { MaterialModule } from '../../material.module';
import { ProductService } from '../../services/product.service';

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  stock?: number;
  category?: string;
};

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ProductCardComponent
  ],
  template: `
    <div class="p-8">
      <div class="mb-6 flex gap-4">
        <mat-form-field appearance="fill">
          <mat-label>Category</mat-label>
          <mat-select [formControl]="categoryControl">
            <mat-option value="all">All Categories</mat-option>
            <mat-option value="clothing">Clothing</mat-option>
            <mat-option value="accessories">Accessories</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="fill" class="flex-1">
          <mat-label>Search products</mat-label>
          <input matInput [formControl]="searchControl" placeholder="Type to search...">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <app-product-card *ngFor="let product of filteredProducts()" [product]="product" />
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductsListComponent {
  private productService = inject(ProductService);
  
  categoryControl = new FormControl('all');
  searchControl = new FormControl('');
  
  filteredProducts = this.productService.getFilteredProducts;

  ngOnInit() {
    this.categoryControl.valueChanges.subscribe(value => {
      this.productService.setCategory(value || 'all');
    });
    this.searchControl.valueChanges.subscribe(value => {
      this.productService.setSearchQuery(value || '');
    });
  }
}
