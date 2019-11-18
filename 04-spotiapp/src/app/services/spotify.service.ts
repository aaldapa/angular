import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

const api = 'https://api.spotify.com/v1/';
const token = 'BQB873mslPfJvpxPbjpzfHRk4Nz2Q1MkN7D3mkuV-hz-X_zsBZa5Knx3GjufZ9WDI7Ursh0wIhbIybqfOPg';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private http: HttpClient) {
    console.log('Spotify Services levantado!');
  }


  getNewReleases() {
    return this.getQuery('browse/new-releases?country=ES&limit=20')
            .pipe( map( (data: any) => {
              return data.albums.items;
            }));
  }

  searchArtists(term: string) {

      return this.getQuery(`search?q=${term}&type=artist&market=ES&offset=0&limit=20`)
              .pipe( map( (data: any) => {
                 return data.artists.items;
               }));
  }

  getArtist(artistId: string) {

      return this.getQuery(`artists/${artistId}`);
  }

  getTopTrack(artistId: string) {
    return this.getQuery(`artists/${artistId}/top-tracks?country=ES`)
              .pipe( map( (data: any) => {
                return data.tracks;
              }));
  }

  getQuery( query: string) {

    const url = `https://api.spotify.com/v1/${query}`;
    const  headers = new HttpHeaders({
      Authorization : 'Bearer ' + token
    });

    return this.http.get(url, {headers});
  }

}
