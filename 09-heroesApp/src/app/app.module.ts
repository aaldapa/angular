import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Para trabajar con rutas
import { AppRoutingModule } from './app-routing.module';

// Para trabajar con formularios
import { FormsModule } from '@angular/forms';

// Para realizar peticiones http a una API
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HeroesComponent } from './pages/heroes/heroes.component';


@NgModule({
  declarations: [
    AppComponent,
    HeroeComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    // Importo mi modulo de rutas para utilizarlo en la aplicacion
    AppRoutingModule,
    // Importo el modulo de formularios para trabajar con aprox. template
    FormsModule,
    // Importo el modulo http cliente para realizar llamadas http
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
