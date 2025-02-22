import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductModalComponent } from './components/modals/product-modal/product-modal.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HeroComponent } from './components/hero/hero.component';
import { MenuComponent } from './components/menu/menu.component';
import { ListadoHamburguesasComponent } from './components/listado-hamburguesas/listado-hamburguesas.component';
import { RouterModule, Routes } from '@angular/router';
import { IngredienteCardComponent } from './components/ingrediente-card/ingrediente-card.component';
import { HttpClientModule } from '@angular/common/http';
import { CarritoComponent } from './components/carrito/carrito.component';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { PedidoModalComponent } from './components/modals/pedido-modal/pedido-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HeroComponent,
    MenuComponent,
    ProductCardComponent,
    ProductModalComponent,
    ListadoHamburguesasComponent,
    IngredienteCardComponent,
    CarritoComponent,
    NavComponent,
    PedidoModalComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgxPaginationModule,
    MatPaginatorModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
