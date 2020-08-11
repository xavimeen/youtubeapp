import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from "rxjs/operators";
import { YoutubeResponse } from '../models/youtube.models';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'Ingrese acá su apiKey';
  // ID del canal de Youtube para cargar videos, en este caso elegí CdeCiencia
  private playList = 'UU52hytXteCKmuOzMViTK8_w';
  nextPageToken = '';

  constructor( private http: HttpClient) { }

  getVideos() {

    const url = `${this.youtubeUrl}/playlistItems`;

    const params = new HttpParams()
            .set('part', 'snippet')
            .set('key', `${this.apiKey}`)
            .set('playlistId', `${this.playList}`)
            .set('maxResults', '10')
            .set('pageToken', this.nextPageToken);

    return this.http.get<YoutubeResponse>(url, { params })
              .pipe(

                map( (data) => {
                  this.nextPageToken = data.nextPageToken;
                  // console.log(this.nextPageToken);
                  return data.items;
                }),

                map( items => items.map( video => video.snippet ) )

              );
  
  }



}
