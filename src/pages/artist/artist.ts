import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Artist} from "../../model/Artist";
import {Album} from "../../model/Album";
import {DeezerApiProvider} from "../../providers/deezer-api/deezer-api";
import {AlbumPage} from "../album/album";

/**
 * Generated class for the ArtistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-artist',
  templateUrl: 'artist.html',
})
export class ArtistPage {
  artist: Artist;
  albums: Album[] = new Array<Album>();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private api: DeezerApiProvider)
  {
    this.artist = navParams.get('artist');
    this.getItems();
  }

  getItems() {
    this.api.getAlbumList(this.artist.id)
      .then( (albums: Album[]) => {
          this.albums = albums;
        },
        (err) => console.log(err))
  }

  goToAlbum(album: Album) {
    this.navCtrl.push(AlbumPage, {album: album, artist: this.artist});
  }

}
