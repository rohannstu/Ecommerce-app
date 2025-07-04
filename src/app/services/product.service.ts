import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../pages/products-list/products-list.component';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';
  private productsSignal = signal<Product[]>([]);
  private categoryFilter = signal<string>('all');
  private searchQuery = signal<string>('');

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  private loadProducts() {
    this.http.get<any[]>(this.apiUrl).subscribe(products => {
      const transformedProducts = products.map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        image: p.image,
        category: p.category,
        stock: Math.floor(Math.random() * 20)
      }));
      this.productsSignal.set(transformedProducts);
    });
  }

  setCategory(category: string) {
    this.categoryFilter.set(category);
  }

  setSearchQuery(query: string) {
    this.searchQuery.set(query);
  }

  getFilteredProducts = computed(() => {
    const products = this.productsSignal();
    const category = this.categoryFilter();
    const search = this.searchQuery().toLowerCase();

    return products.filter(p => {
      const matchesCategory = category === 'all' || p.category === category;
      const matchesSearch = !search || p.title.toLowerCase().includes(search);
      return matchesCategory && matchesSearch;
    });
  });
}
