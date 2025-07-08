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
    <div class="p-8 bg-white rounded-lg shadow-md">
      <div class="mb-6 flex flex-col md:flex-row md:items-center">
        <mat-form-field appearance="outline" class="w-full md:w-64 gradient-form-field md:mr-4 category-button">
          <mat-label>Category</mat-label>
          <mat-select [formControl]="categoryControl">
            <mat-option value="all">All Categories</mat-option>
            <mat-option value="clothing">Clothing</mat-option>
            <mat-option value="accessories">Accessories</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="flex-1 gradient-form-field">
          <mat-label>Search products</mat-label>
          <input matInput [formControl]="searchControl" placeholder="Type to search...">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <app-product-card *ngFor="let product of filteredProducts()" [product]="product" />
      </div>
    </div>
  `,
  styles: [`
    .mat-mdc-select-panel {
      background-color: white !important;
    }
    .gradient-form-field .mat-mdc-form-field-flex {
      background: linear-gradient(to right, #1e3a8a, #2563eb);
      color: white;
    }
    .gradient-form-field .mat-mdc-form-field-label,
    .gradient-form-field .mat-mdc-select-value,
    .gradient-form-field .mat-mdc-text-field-wrapper .mat-mdc-form-field-input,
    .gradient-form-field .mat-mdc-select-arrow,
    .gradient-form-field .mat-icon {
      color: white !important;
      font-weight: bold;
    }
    .gradient-form-field .mat-mdc-form-field-outline {
      border-color: white !important;
    }
    .category-button .mat-mdc-select-arrow {
      display: none;
    }
    .category-button .mat-mdc-text-field-wrapper {
      padding: 0 16px; /* Adjust padding to make it look more like a button */
    }
  `]
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
