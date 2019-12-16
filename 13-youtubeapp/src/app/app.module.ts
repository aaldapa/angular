import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// Para realizar peticiones http a una API
import { HttpClientModule } from '@angular/common/http';
import { VideoYoutubePipe } from './pipes/video-youtube.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    VideoYoutubePipe
  ],
  imports: [
    BrowserModule,

    // Importo el modulo http cliente para realizar llamadas http
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
