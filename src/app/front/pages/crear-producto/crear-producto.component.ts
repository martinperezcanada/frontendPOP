import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  createForm!: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9 ]*')]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      precio: ['', [Validators.required, Validators.min(0), Validators.max(1000), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      imagen: ['']
    });
  }

  submitForm(): void {
    if (this.createForm.valid) {
      const newProductData = this.createForm.value;
      this.productService.createProduct(newProductData).subscribe(
        (response: Product) => {
          console.log('Producto creado:', response);
          this.router.navigate(['/front/home']);
        },
        error => {
          console.error('Error al crear el producto:', error);
        }
      );
    } else {
    }
  }
}
