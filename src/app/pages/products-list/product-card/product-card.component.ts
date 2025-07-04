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
    <mat-card class="h-full flex flex-col">
      <img
        mat-card-image
        [src]="product.image"
        [alt]="product.title"
        class="w-full h-48 object-contain p-4"
      />
      <mat-card-content class="flex-1">
        <h2 class="text-lg font-bold mb-2">{{ product.title }}</h2>
        <p class="text-gray-600">\${{ product.price }}</p>
        <div class="mt-2">
          <span [class]="product.stock ? 'text-green-500' : 'text-red-500'">
            {{ product.stock ? product.stock + ' left' : 'Out of stock' }}
          </span>
        </div>
      </mat-card-content>
      <mat-card-actions>
        <button
          mat-raised-button
          color="primary"
          (click)="cartService.addToCart(product)"
          [disabled]="!product.stock"
          class="w-full"
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
