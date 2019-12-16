import { Injectable } from '@angular/core';

// Para realizar peticiones http a una API
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyBcwL8rIHKEkRbbGxiO9huH0p0DDmUujE8';
  private playlist  = 'UUKxSyexzXcPmuQH5gLhJCZA';
  private nextPageToken = '';

  constructor( public http: HttpClient ) { }

getVideos() {
  const url = `${this.youtubeUrl}/playlistItems`;
  let params  = new  HttpParams()
  .set('part', 'snippet')
  .set('maxResults', '10')
  .set('playlistId', this.playlist)
  .set('key', this.apiKey);

  if (this.nextPageToken) {
    params = params.set('pageToken', this.nextPageToken );
  }


  return this.http.get( url, { params })
    .pipe(
      map( (resp: any) => {
       console.log(resp);
       this.nextPageToken = resp.nextPageToken;

       const videos: any[] = [];

       for (const video of resp.items) {
         const snippet = video.snippet;
         videos.push ( snippet);

       }

       return videos;
     })
   );
}

}
