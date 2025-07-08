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
    <mat-toolbar class="fixed top-0 left-0 right-0 z-50 h-16 px-4 md:px-8 py-2 shadow-lg bg-primary text-white">
      <div class="container mx-auto flex items-center justify-between w-full">
        <a mat-button routerLink="/" class="text-2xl md:text-3xl font-bold tracking-tight hover:text-gray-100 transition-colors">
          My Store
        </a>
        <a mat-button routerLink="/cart" 
           class="text-base md:text-lg font-medium flex items-center gap-2 hover:bg-primary-dark transition-colors px-4 py-2 rounded">
          <span class="font-bold">Cart</span>
          <span class="bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{{ cartItemCount() }}</span>
        </a>
      </div>
    </mat-toolbar>
    <div class="h-16"></div> <!-- Spacer to prevent content from going under fixed header -->
  `,
  styles: [`
    :host {
      display: block;
    }
    .bg-primary {
      background: linear-gradient(to right, #1e3a8a, #2563eb);
    }
    .hover\:bg-primary-dark:hover {
      background-color: rgba(37, 99, 235, 0.8);
    }
    .bg-accent {
      background-color: #fbbf24;
    }
    .text-white {
      color: #ffffff;
    }
    .font-bold {
      font-weight: 700;
    }
    .shadow-lg {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
  `],
})
export class HeaderComponent {
  cartService = inject(CartService);
  cartItemCount = computed(() => this.cartService.cart().length);
}
