import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  productId!: number;
  product!: Product | null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam ? +idParam : -1; 
    this.getProductDetails(this.productId);
  }

  getProductDetails(productId: number): void {
    this.productService.getProductById(productId).subscribe(
      (product: Product) => {
        this.product = product;
        console.log('Detalles del producto:', this.product);
      },
      (error) => {
        console.error('Error al obtener los detalles del producto:', error);
      }
    );
  }
}
