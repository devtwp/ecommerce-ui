import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListadoHamburguesasComponent } from './components/listado-hamburguesas/listado-hamburguesas.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hamburguesas', component: ListadoHamburguesasComponent }  // Configura la ruta inicial 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
