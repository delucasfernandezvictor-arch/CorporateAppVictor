import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol } from '@ionic/angular';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  imports: [IonContent, IonGrid, IonRow, IonCol, CommonModule, FormsModule],
})
export class ProductosPage implements OnInit {
  products = signal<Product[]>([]);

  constructor(private productService: ProductsService) {}

  async ngOnInit() {
    this.products.set(await this.productService.getProducts());
  }
}