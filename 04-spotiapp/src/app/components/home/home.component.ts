import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  newReleases: any [] = [];
  loading: boolean;
  error: boolean;
  errormsg: string;

  constructor(private spotifyService: SpotifyService) {

    this.loading = true;
    this.error = false;

    this.spotifyService.getNewReleases()
    .subscribe(
      (data: any) => {
        console.log(data);
        this.newReleases = data;
        this.loading = false;
      },
      (errorClk) => {
          console.log(errorClk);
          this.error = true;
          this.loading = false;
          this.errormsg = errorClk.error.error.message;
      });
  }

  ngOnInit() {
  }

}
