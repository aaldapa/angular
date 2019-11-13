import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent implements OnInit {

  artist: any = {};
  topTracks: any[] = [];
  loading: boolean;


  constructor(private activateRoute: ActivatedRoute,
              private spotifyService: SpotifyService ) {

    this.loading = true;

    this.activateRoute.params.subscribe ( (params: any) => {
      this.getArtist( params.id);
      this.getTopTrack( params.id);
    });
  }

  getArtist(artistId: string) {
    this.spotifyService.getArtist( artistId)
    .subscribe( (artist: any ) => {
      this.artist = artist;
      console.log(this.artist);
      this.loading = false;
    });
  }

  getTopTrack(artistId: string) {
    this.spotifyService.getTopTrack( artistId)
    .subscribe( (topTracks: any[] ) => {
      this.topTracks = topTracks;
      console.log(topTracks);
      this.loading = false;
    });
  }

  ngOnInit() {
  }

}
