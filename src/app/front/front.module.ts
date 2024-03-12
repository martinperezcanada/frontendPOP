import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontRoutingModule } from './front-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CardModule } from 'primeng/card';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardProductComponent } from './components/card-product/card-product.component';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';
import { CrearProductoComponent } from './pages/crear-producto/crear-producto.component';
import { RouterModule } from '@angular/router';
import { ModificarProductoComponent } from './pages/modificar-producto/modificar-producto.component';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PersonalizadoPipe } from './pipes/personalizado.pipe';



@NgModule({
  declarations: [
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    CardProductComponent,
    DetalleProductoComponent,
    CrearProductoComponent,
    ModificarProductoComponent,
    ConfirmacionComponent,
    PersonalizadoPipe,

  ],
  imports: [
    CommonModule,
    FrontRoutingModule,
    SharedModule,
    CardModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ]
})
export class FrontModule { }
