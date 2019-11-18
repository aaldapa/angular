import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Para cambiar la locale en toda la aplicacion
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { AppComponent } from './app.component';
import { CapitalizadoPipe } from './pipes/capitalizado.pipe';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { ContrasenaPipe } from './pipes/contrasena.pipe';


@NgModule({
  declarations: [
    AppComponent,
    CapitalizadoPipe,
    DomseguroPipe,
    ContrasenaPipe
  ],
  imports: [
    BrowserModule
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
