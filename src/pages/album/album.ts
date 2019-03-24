import {Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Album} from "../../model/Album";
import {Track} from "../../model/Track";
import {DeezerApiProvider} from "../../providers/deezer-api/deezer-api";
import {Media, MediaObject} from "@ionic-native/media";
import {PlayBarComponent} from "../../components/play-bar/play-bar";
import {ComponentsModule} from "../../components/components.module";
import {Artist} from "../../model/Artist";


/**
 * Generated class for the AlbumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-album',
  templateUrl: 'album.html',
})
@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  imports: [
    PlayBarComponent,
    ComponentsModule
  ]
})
export class AlbumPage {
  album: Album;
  tracks: Track[];
  file: MediaObject;

  currentTrack: Track;

  cover: string;
  title: string = "";
  artist: Artist;

  isPlaying: boolean = false;
  isRandom: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private api: DeezerApiProvider,
              private media: Media) {
    this.album = navParams.get("album");
    this.artist = navParams.get("artist");
    this.currentTrack = new Track();
    this.getItems();
    navCtrl.viewWillUnload.subscribe(
      _ => {
        if (this.file != null) {
          this.file.stop();
          this.file.release();
        }
      }
    )
  }

  getItems(): void {
    this.api.getTrackList(this.album.id)
      .then( (tracks: Track[]) => {
          this.tracks = tracks;
          this.artist = tracks[0].artist;
        },
        (err) => console.log(err))
  }

  itemSelected(track: Track):void {
    if (this.file != null) {
      this.file.stop()
    }
    this.file = this.media.create(track.preview);
    this.file.play();
    this.currentTrack = track;
    this.isPlaying = true;
    this.file.onStatusUpdate.subscribe(
      status => {
        if (status == 4) {
          this.isPlaying = false;
        }
      }
    )
  }

  getRandom(max: number): number {
    return Math.floor((Math.random() * Math.floor(max)));
  }

  onPlay() {
    if (this.file == null) {
      this.currentTrack = this.tracks[this.getRandom(this.tracks.length)];
      this.file = this.media.create(this.currentTrack.preview);
    }
    this.isPlaying = true;
    this.file.play()
  }

  onPause() {
    this.file.pause();
    this.isPlaying = false;
  }

  onPrevious() {
    if (this.file != null) {
      this.file.stop();
    }
    let prev: number;
    if (this.isRandom) {
      prev = this.getRandom(this.tracks.length);
    }
    else {
      prev = (this.findTrackNumber(this.currentTrack)-1) % this.tracks.length;
      if (prev<0) {
        prev += this.tracks.length;
      }
    }
    this.currentTrack = this.tracks[prev];
    this.file = this.media.create(this.currentTrack.preview);
    this.file.play();
    this.isPlaying = true;
    this.file.onStatusUpdate.subscribe(
      status => {
        if (status == 4) {
          this.isPlaying = false;
        }
      }
    )
  }

  onNext() {
    if (this.file != null) {
      this.file.stop();
    }
    let next: number;
    if (this.isRandom) {
      next = this.getRandom(this.tracks.length);
    }
    else {
      next = (this.findTrackNumber(this.currentTrack)+1) % this.tracks.length;
    }
    this.currentTrack = this.tracks[next];
    this.file = this.media.create(this.currentTrack.preview);
    this.file.play();
    this.isPlaying = true;
    this.file.onStatusUpdate.subscribe(
      status => {
        if (status == 4) {
          this.isPlaying = false;
        }
      }
    )
  }

  onRandom() {
    this.isRandom = !this.isRandom;
  }

  findTrackNumber(track: Track): number {
    for (let i=0 ; i<this.tracks.length ; i++) {
      if (this.tracks[i].id == track.id) {
        console.log('track nb : ', i);
        console.log(track);
        return i;
      }
    }
    return 0;
  }
}
