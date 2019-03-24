import {Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Injectable, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

/**
 * Generated class for the PlayBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-play-bar',
  templateUrl: 'play-bar.html',
  inputs: [
    'cover',
    'artist',
    'title',
    'isPlaying',
    'isRandom'
  ],
  outputs: [
    'pause',
    'play',
    'next',
    'previous',
    'random'
  ]
})
@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
@Injectable()
export class PlayBarComponent {
  cover;
  title;
  artist;
  isPlaying;
  isRandom;

  pause = new EventEmitter<boolean>();
  play = new EventEmitter<boolean>();
  previous = new EventEmitter<boolean>();
  next = new EventEmitter<boolean>();

  random = new EventEmitter<boolean>();

  constructor() {}

  onPause() {
    this.pause.emit(true);
  }

  onPlay() {
    this.play.emit(true);
  }

  onPrevious() {
    this.previous.emit(true);
  }

  onNext() {
    this.next.emit(true);
  }

  onRandom() {
    this.random.emit(true);
  }
}
