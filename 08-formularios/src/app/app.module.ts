import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { AppRoutingModule } from './app.routes';

// Para trabajar con formularios es necesario importar FormsModule
import { FormsModule} from '@angular/forms';

// Para la aproximacion por data necetamos importar ademas del FormsModule:
import { ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { TemplateComponent } from './components/template/template.component';
import { DataComponent } from './components/data/data.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    DataComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Necesario para la aproximacion por template
    ReactiveFormsModule,  // Necesario ademas de FormsModule para  la aproximacion por data
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
