import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  videos: any[] = [];

  videoSeleccionado: any;

  constructor( public youtuveService: YoutubeService) {

    this.youtuveService.getVideos()
      .subscribe( resp => {
        console.log(resp);
        this.videos = resp;

      }

    );
  }

  ngOnInit() {
  }


  verVideo( video: any  ) {
    this.videoSeleccionado = video;
    console.log(video);

    $('#exampleModal').modal();

  }

  cerrarModal() {
    // Para parar el video
    this.videoSeleccionado = null;

    $('#exampleModal').modal('hide');
  }

  cargarMas() {
    this.youtuveService.getVideos()
      .subscribe( resp => {
        this.videos.push.apply(this.videos, resp);
      }

    );
  }

}
