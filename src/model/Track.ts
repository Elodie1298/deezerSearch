import {Artist} from "./Artist";

export class Track {
  id: string;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  isrc: string;
  link: string;
  duration: string;
  track_position: number;
  disk_number: number;
  rank: string;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  artist: Artist;
}
