import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { Product } from '../../products-list/products-list.component';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
    <mat-card>
      <div class="flex items-center gap-4 p-4">
        <img [src]="item().image" class="w-20 h-20 object-contain" [alt]="item().title" />
        <div class="flex-1">
          <h3 class="text-lg font-medium">{{ item().title }}</h3>
          <p class="text-gray-600">\${{ item().price }}</p>
        </div>
        <button
          mat-icon-button
          color="warn"
          (click)="cartService.removeFromCart(item())"
          matTooltip="Remove from cart"
        >
          <mat-icon>delete</mat-icon>
        </button>
      </div>
    </mat-card>
  `,
  styles: ``,
})
export class CartItemComponent {
  item = input.required<Product>();
  cartService = inject(CartService);
}
