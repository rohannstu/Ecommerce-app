import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Order Summary</mat-card-title>
      </mat-card-header>
      
      <mat-card-content class="mt-4">
        <div class="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>\${{ subtotal() }}</span>
        </div>
        <div class="flex justify-between mb-2">
          <span>Shipping</span>
          <span>\${{ shipping() }}</span>
        </div>
        <mat-divider class="my-4"></mat-divider>
        <div class="flex justify-between font-bold">
          <span>Total</span>
          <span>\${{ total() }}</span>
        </div>
      </mat-card-content>
      
      <mat-card-actions align="end">
        <button
          mat-raised-button
          color="primary"
          [disabled]="!cartService.cart().length"
          (click)="checkout()"
        >
          Proceed to Checkout
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: ``,
})
export class OrderSummaryComponent {
  cartService = inject(CartService);
  router = inject(Router);

  subtotal = computed(() => {
    return this.cartService.cart().reduce((total, item) => total + item.price, 0).toFixed(2);
  });

  shipping = computed(() => {
    return this.cartService.cart().length ? '5.99' : '0.00';
  });

  total = computed(() => {
    return (parseFloat(this.subtotal()) + parseFloat(this.shipping())).toFixed(2);
  });

  checkout() {
    // In a real app, this would navigate to checkout
    this.cartService.cart.set([]);
    this.router.navigate(['/']);
  }
}
