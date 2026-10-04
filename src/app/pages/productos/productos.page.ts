import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonGrid, IonRow, IonCol } from '@ionic/angular';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  imports: [IonContent, IonGrid, IonRow, IonCol, CommonModule],
})
export class ProductosPage implements OnInit {
  private readonly productService = inject(ProductsService);
  products = signal<Product[]>([]);

  async ngOnInit() {
    this.products.set(await this.productService.getProducts());
  }
}
