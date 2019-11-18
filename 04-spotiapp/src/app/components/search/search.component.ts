import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  artists: any[] = [];
  loading: boolean;

  constructor( private spotifyService: SpotifyService) {
    this.loading = false;
  }

  ngOnInit() {
  }

  search(term: string) {
    if (term.length > 1) {

      this.loading = true;
      this.spotifyService.searchArtists(term)
        .subscribe( (data: any) => {
          console.log(data);
          this.artists = data;
          this.loading = false;
        });
    } else {
      this.artists = [];
      this.loading = false;
    }
  }

}
