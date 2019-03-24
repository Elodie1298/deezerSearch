import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {ArtistPage} from "../pages/artist/artist";
import {AlbumPage} from "../pages/album/album";
import {PlayBarComponent} from "../components/play-bar/play-bar";
import {ComponentsModule} from "../components/components.module";
import {DeezerApiProvider} from "../providers/deezer-api/deezer-api";
import {HttpClientModule} from "@angular/common/http";
import {Media} from "@ionic-native/media";
import {HTTP} from "@ionic-native/http";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ArtistPage,
    AlbumPage,
    PlayBarComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ArtistPage,
    AlbumPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DeezerApiProvider,
    Media,
    HTTP
  ]
})
export class AppModule {}
