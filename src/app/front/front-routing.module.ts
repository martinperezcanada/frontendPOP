import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';
import { CrearProductoComponent } from './pages/crear-producto/crear-producto.component';
import { ModificarProductoComponent } from './pages/modificar-producto/modificar-producto.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'product/:id', component: DetalleProductoComponent },
  { path: 'crearProducto', component: CrearProductoComponent },
  { path: 'modificar/:id', component: ModificarProductoComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: '**', redirectTo: 'crearProducto' },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
