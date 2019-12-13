import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { AppRoutingModule } from './app.routes';

// Para realizar peticiones http a una API
import { HttpClientModule } from '@angular/common/http';

// Para trabajar con formularios es necesario importar FormsModule
import { FormsModule} from '@angular/forms';


// Para realizar peticiones jsonp
import { HttpClientJsonpModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/shared/navbar/navbar.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { PeliculaCardComponent } from './components/pelicula-card/pelicula-card.component';
import { ImagenPipe } from './pipes/imagen.pipe';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LoadingComponent } from './components/loading/loading.component';
import { GaleriaComponent } from './components/galeria/galeria.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PeliculaComponent,
    BuscarComponent,
    PeliculaCardComponent,
    ImagenPipe,
    LoadingComponent,
    GaleriaComponent
  ],
  imports: [
    BrowserModule,
    // Importo mi modulo de rutas para utilizarlo en la aplicacion
    AppRoutingModule,
    // Para trabajar con formularios es necesario importar FormsModule
    FormsModule,
    // Importo el modulo http cliente para realizar llamadas http
    HttpClientModule,
    // Importo el modulo para poder realizar llamadas jsonp
    HttpClientJsonpModule

  ],
  providers: [
    // Para cambiar la locale en toda la aplicacion
    {provide : LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    // Para cambiar la locale en toda la aplicacion
    registerLocaleData(localeEs, 'es');
  }

 }
