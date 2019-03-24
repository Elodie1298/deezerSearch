import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {DeezerApiProvider} from "../../providers/deezer-api/deezer-api";
import {Artist} from "../../model/Artist";
import {ArtistPage} from "../artist/artist";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  artists: Artist[] = new Array<Artist>();

  constructor(
    public navCtrl: NavController,
    private api: DeezerApiProvider)
  { }

  getItems(event: Event) {
    // @ts-ignore
    let query = event.target.value;
    this.api.getArtistList(query)
      .then( (artists: Artist[]) => {
        this.artists = artists;
      },
        (err) => console.log(err))
  }

  goToArtist(artist: Artist) {
    this.navCtrl.push(ArtistPage, {artist: artist});
  }
}
