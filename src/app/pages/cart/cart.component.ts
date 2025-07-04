import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from './cart-item/cart-item.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    CartItemComponent,
    OrderSummaryComponent
  ],
  template: `
    <div class="p-6 max-w-4xl mx-auto">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Shopping Cart</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          @if (cartItems().length) {
            <div class="flex flex-col md:flex-row gap-6">
              <div class="flex-1">
                <div class="flex flex-col gap-4">
                  @for (item of cartItems(); track item.id) {
                    <app-cart-item [item]="item" />
                  }
                </div>
              </div>
              
              <div class="md:w-80">
                <app-order-summary />
              </div>
            </div>
          } @else {
            <div class="text-center py-8">
              <mat-icon class="text-6xl text-gray-400">shopping_cart</mat-icon>
              <p class="mt-4 text-lg text-gray-600">Your cart is empty</p>
              <button mat-raised-button color="primary" routerLink="/" class="mt-4">
                Continue Shopping
              </button>
            </div>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: ``,
})
export class CartComponent {
  private cartService = inject(CartService);
  cartItems = computed(() => this.cartService.cart());
}
