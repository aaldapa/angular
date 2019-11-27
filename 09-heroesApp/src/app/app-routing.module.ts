/**
 * Modulo creado mediante angular-cli ejecutando desde raiz del proyecto la instruccion:
 * ng generate module appRouting --flat
 *
 * El parametro --flat indica que el modulo se desea crear en la carpeta raiz.
 */
import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { HeroeComponent } from './pages/heroe/heroe.component';

const ROUTES_APP: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'heroe/:id', component: HeroeComponent },
  { path: '**',  pathMatch: 'full', redirectTo: 'heroes'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot ( ROUTES_APP )
  ] ,
  // Para que el modulo se pueda utilizar a su vez en otros modulos es necesario incluirlo
  // el RouterModule en los exports
  exports: [RouterModule]
})
export class AppRoutingModule { }
