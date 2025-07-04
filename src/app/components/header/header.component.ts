import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  template: `
    <mat-toolbar color="primary">
      <a mat-button routerLink="/" class="text-2xl">My Store</a>
      <span class="flex-1"></span>
      <a mat-button routerLink="/cart">
        <mat-icon [matBadge]="cartItemCount()" matBadgeColor="accent">
          shopping_cart
        </mat-icon>
        Cart
      </a>
    </mat-toolbar>
  `,
  styles: ``,
})
export class HeaderComponent {
  cartService = inject(CartService);
  cartItemCount = computed(() => this.cartService.cart().length);
}
