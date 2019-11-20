import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

import { USUARIO_ROUTES } from './components/usuario/usuario.routes';
// import { UsuarioNuevoComponent } from './components/usuario/usuario-nuevo.component';
// import { UsuarioDetalleComponent } from './components/usuario/usuario-detalle.component';
// import { UsuarioEditarComponent } from './components/usuario/usuario-editar.component';



const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'usuario/:id', component: UsuarioComponent,
        children: USUARIO_ROUTES
        /*Saco esta configuración a usuario.routes.ts
        [
            { path: 'nuevo', component: UsuarioNuevoComponent },
            { path: 'editar', component: UsuarioEditarComponent },
            { path: 'detalle', component: UsuarioDetalleComponent },

            // ruta por defecto
            {path: '**', pathMatch: 'full', redirectTo: 'nuevo'}
        ]
        */
    },

    // ruta por defecto
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {}



