import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css']
})
export class ModificarProductoComponent implements OnInit {
  modifyForm!: FormGroup;
  productId!: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createModifyForm();
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.productService.getProductById(this.productId).subscribe(
        (product: Product) => {
          if (product) {
            this.modifyForm.patchValue({
              nombre: product.nombre,
              descripcion: product.descripcion,
              precio: product.precio
            });
          }
        },
        error => {
          console.error('Error al obtener los detalles del producto:', error);
        }
      );
    });
  }

  createModifyForm(): void {
    this.modifyForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]]
    });
  }

  submitModifyForm(): void {
    if (this.modifyForm.valid) {
      const modifiedProductData = this.modifyForm.value;
      this.productService.updateProduct(this.productId, modifiedProductData).subscribe(
        (response) => {
          console.log('Producto modificado exitosamente:', response);
          this.router.navigate(['/front/home']);        },
        error => {
          console.error('Error al modificar el producto:', error);
        }
      );
    } else {
    }
  }
  
}
