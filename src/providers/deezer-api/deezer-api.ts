import { Injectable } from '@angular/core';
import {Artist} from "../../model/Artist";
import {Album} from "../../model/Album";
import {Track} from "../../model/Track";
import {HTTP} from "@ionic-native/http";

/*
  Generated class for the DeezerApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeezerApiProvider {
  artistSearchUrl: string = "https://api.deezer.com/2.0/search/artist?q=";
  albumSearchUrl: string = "https://api.deezer.com/2.0/search/album?q=artist:";
  trackSearchUrl: string = "https://api.deezer.com/2.0/album/";

  // headers = {Authorization: "OAuth: token"};
  // headers = {'Content-Type': 'application/json'};
  // params: any = {id: 12, message: "test"};
  headers = {};
  params = {};

  constructor(public http: HTTP) {
    console.log('Hello DeezerApiProvider Provider');
  }

  getArtistList(query: string): Promise<Artist[]> {
    let url = this.artistSearchUrl + "'" + query + "'";
    console.log(url);
    return new Promise<Artist[]>((resolve, reject) => {
      this.http.get(url, this.params, this.headers)
        .then((data: any) => {
            resolve(JSON.parse(data.data).data);
          })
        .catch((err) => {
            reject(err);
          }
        );
    });
  }

  getAlbumList(artist: string): Promise<Album[]> {
    let url = this.albumSearchUrl + "'" + artist + "'";
    console.log(url);
    return new Promise<Album[]>((resolve, reject) => {
      this.http.get(url, this.params, this.headers)
        .then((data: any) => {
          resolve(JSON.parse(data.data).data);
          })
        .catch((err) => {
            reject(err);
          }
        );
    });
  }

  getTrackList(albumId: number): Promise<Track[]> {
    let url = this.trackSearchUrl + albumId + "/tracks";
    console.log(url);
    return new Promise<Track[]>((resolve, reject) => {
      this.http.get(url, this.params, this.headers)
        .then((data: any) => {
          resolve(JSON.parse(data.data).data);
          })
        .catch((err) => {
            reject(err);
          }
        );
    });
  }
}

//////////////////////////////////////////////:

// import {HttpClient, HttpHeaders} from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import {Artist} from "../../model/Artist";
// import {Album} from "../../model/Album";
// import {Track} from "../../model/Track";
//
// /*
//   Generated class for the DeezerApiProvider provider.
//
//   See https://angular.io/guide/dependency-injection for more info on providers
//   and Angular DI.
// */
// @Injectable()
// export class DeezerApiProvider {
//   artistSearchUrl: string = "https://api.deezer.com/2.0/search/artist?q=";
//   albumSearchUrl: string = "https://api.deezer.com/2.0/search/album?q=artist:";
//   trackSearchUrl: string = "https://api.deezer.com/2.0/album/";
//
//   private header = new HttpHeaders()
//     .set('Content-Type', 'application/json');
//
//
//   constructor(public http: HttpClient) {
//     console.log('Hello DeezerApiProvider Provider');
//   }
//
//   getArtistList(query: string): Promise<Artist[]> {
//     let url = this.artistSearchUrl + "'" + query + "'";
//     console.log(url);
//     return new Promise<Artist[]>((resolve, reject) => {
//       this.http.get(url, {headers: this.header})
//         .subscribe((data: any) => {
//             resolve(data.data);
//           },
//           (err) => {
//             reject(err);
//           }
//         );
//     });
//   }
//
//   getAlbumList(artist: string): Promise<Album[]> {
//     let url = this.albumSearchUrl + "'" + artist + "'";
//     console.log(url);
//     return new Promise<Album[]>((resolve, reject) => {
//       this.http.get(url, {headers: this.header})
//         .subscribe((data: any) => {
//             resolve(data.data);
//           },
//           (err) => {
//             reject(err);
//           }
//         );
//     });
//   }
//
//   getTrackList(albumId: number): Promise<Track[]> {
//     let url = this.trackSearchUrl + albumId + "/tracks";
//     console.log(url);
//     return new Promise<Track[]>((resolve, reject) => {
//       this.http.get(url, {headers: this.header})
//         .subscribe((data: any) => {
//             resolve(data.data);
//           },
//           (err) => {
//             reject(err);
//           }
//         );
//     });
//   }
// }
