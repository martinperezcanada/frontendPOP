import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent implements OnInit {
  products: Product[] = [];
  currentPage: number = 1;
  pageSize: number = 12;
  totalPages: number = 0;

  constructor(
    private productService: ProductService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }

  loadProducts(): void {
    const filters = {
      orderByPrice: 'asc', 
    };

    this.productService.getAllProducts(this.currentPage, this.pageSize, filters)
        .subscribe(
            (response: any) => {
                this.products = response.data;
                console.log('Products on page', this.currentPage, ':', this.products);
            },
            (error) => {
                console.error('Error al obtener los productos:', error);
            }
        );
    this.loadTotalPages();
  }

  loadTotalPages(): void {
    this.productService.getAllProductsCount()
      .subscribe(
        (response: any) => {
          this.totalPages = Math.ceil(response.count / this.pageSize);
        },
        (error) => {
          console.error('Error al obtener el número total de productos:', error);
        }
      );
  }

  goToProductDetail(productId: number): void {
    this.router.navigate(['/front/product/', productId]);
    console.log("Product ID: ", productId);
  }

  modifyProduct(productId: number): void {
    this.router.navigate(['/front/modificar/', productId]);
    console.log("Modificar producto con ID:", productId);
  }

  deleteProduct(productId: number): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px',
      data: { productId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(productId)
          .subscribe(
            () => {
              console.log('Producto eliminado con éxito:', productId);
              this.loadProducts();
            },
            error => {
              console.error('Error al eliminar el producto:', error);
            }
          );
      }
    });
  }

  getPaginationArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
