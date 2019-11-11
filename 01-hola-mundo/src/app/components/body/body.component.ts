import {Component} from '@angular/core';

@Component({
    selector: 'app-body',
    templateUrl: './body.component.html'
})
export class BodyComponent {
    mostrar = true;

    frase: any = {
        message: 'Un gran poder conlleva una gran responsabilidad',
        author: 'Ben Parker'
    };

    personajes: string [] = ['Spiderman', 'Octopus' , 'Venom'];

    mostrarMensaje(person: string) {
        console.log('Has hecho click en: ' + person);
    }

}
