import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje = '';
  elemento: any;

  constructor( public chatService: ChatService) {

    this.chatService.cargarMensajes()
      .subscribe( () => {

        setTimeout ( () => {
          // Cuando se reciban los mensajes, queremos hacer el scroll
          // Metemos la instruccion en el setTimeout para dar tiempo a que renderize la pagina
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 20);


      })

      ;

  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviarMensaje() {
    console.log('Entro');
    if (this.mensaje.length === 0) {
      return;
    }
    console.log('Paso');

    this.chatService.agregarMensaje (this.mensaje)
      .then ( () => {
        this.mensaje = '';
        console.log('mensaje enviado');
      })
      .catch ( (err) => {
        console.error('Error en el envio', err);
      });

    console.log(this.mensaje);
  }

}
