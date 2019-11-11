import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/shared/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroeComponent } from './components/heroe/heroe.component';
import { FindedHeroesComponent } from './components/finded-heroes/finded-heroes.component';


const ROUTES: Routes = [
    // Lista de rutas a las que navega la aplicacion  (apuntan a cada componente que seran paginas)
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'heroes', component: HeroesComponent },
    { path: 'heroe/:id', component: HeroeComponent },
    { path: 'findedheroes/:term', component: FindedHeroesComponent },
    // Si la ruta tecleada no se encuentra entre las configuradas encima, va a esta ruta
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
    // Para el envio de parametros en url
    // imports: [RouterModule.forRoot(ROUTES, {useHash: true})],
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

