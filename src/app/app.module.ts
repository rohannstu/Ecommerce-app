import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { routes } from './app.routes';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductCardComponent } from './pages/products-list/product-card/product-card.component';
import { CartComponent } from './pages/cart/cart.component';
import { CartItemComponent } from './pages/cart/cart-item/cart-item.component';
import { OrderSummaryComponent } from './pages/cart/order-summary/order-summary.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forRoot(routes),
    AppComponent,
    CartComponent,
    CartItemComponent,
    OrderSummaryComponent,
    HeaderComponent,
    ButtonComponent,
    PrimaryButtonComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
