import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { Product } from '../products-list.component';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
    <mat-card class="h-full flex flex-col rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
      <img
        mat-card-image
        [src]="product.image"
        [alt]="product.title"
        class="w-full h-48 object-contain p-4 rounded-t-lg"
      />
      <mat-card-content class="flex-1 p-4">
        <h2 class="text-xl font-semibold mb-2 text-gray-800">{{ product.title }}</h2>
        <p class="text-lg font-bold text-primary mb-2">\${{ product.price }}</p>
        <div class="mt-2 text-sm">
          <span [class]="product.stock ? 'text-green-600' : 'text-red-600'">
            {{ product.stock ? product.stock + ' left' : 'Out of stock' }}
          </span>
        </div>
      </mat-card-content>
      <mat-card-actions class="p-4 pt-0">
        <button
          mat-raised-button
          color="primary"
          (click)="cartService.addToCart(product)"
          [disabled]="!product.stock"
          class="w-full py-2 rounded-md text-white font-medium"
        >
          Add to Cart
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: `
    :host {
      display: block;
    }
    mat-card {
      transition: transform 0.2s;
    }
    mat-card:hover {
      transform: translateY(-4px);
    }
  `,
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  cartService = inject(CartService);
}
