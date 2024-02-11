import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, filter, map, tap } from 'rxjs';
import { musicType } from '../../models/musicType.interface';
import { songs } from '../../../../assets/songs1';
//import { readFileSync, writeFileSync } from 'fs';
@Injectable({
  providedIn: 'root',
})
export class MusicServicesService implements OnInit {
  ngOnInit(): void {
    this.loadSongData();
  }
  constructor() {}

  songSearchSubject$: Subject<searchcQuery> = new Subject<searchcQuery>();
  filteredSongs$: Subject<musicType[]> = new Subject<musicType[]>();
  songsArray: musicType[] = songs;
  filteredSongs: musicType[];

  loadSongData() {
    this.songsArray = JSON.parse(JSON.stringify(songs));
  }

  songFilter(data: searchcQuery): musicType[] {
    const filteredSongs: musicType[] = this.songsArray.filter((song) => {
      // Filter condition: songQuery matches songName and artistQuery matches artistName

      return (
        song.songName?.toLowerCase().includes(data.musicQuery) &&
        song.artistName?.toLowerCase().includes(data.artistQuery)
      );
    });

    this.filteredSongs$.next(filteredSongs);
    return filteredSongs;
  }

  handler(data: searchcQuery) {
    this.songSearchSubject$.next(data);
  }

  addNewSong(newSong:musicType){
    console.log(newSong);
    let newSongwithID: musicType = {
      id: this.generateUUID(),
      songName: newSong.songName,
      artistName: newSong.artistName,
      numberOfStreams: newSong.numberOfStreams,
      releaseYear: newSong.releaseYear,
      durationInSeconds: newSong.durationInSeconds
    };
  
    this.songsArray.unshift(newSongwithID);
    console.log(newSongwithID);
    
    
    // const updatedSongsString = `export const songs = ${JSON.stringify(this.songsArray, null, 2)};\n`;
    // writeFileSync('./assets/songs1.ts', updatedSongsString, );
  }
 generateUUID(): string {
  const uuidPattern: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  return uuidPattern.replace(/[xy]/g, (character) => {
    const random = Math.floor(Math.random() * 16);
    const value = character === 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
  }
}
export interface searchcQuery {
  musicQuery: string;
  artistQuery: string;
}


