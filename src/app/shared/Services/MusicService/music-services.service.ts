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
  //filteredSongs: musicType[];
  filteredSongs:musicType[];

  loadSongData() {
    this.songsArray = JSON.parse(JSON.stringify(songs));
  }

  songFilter(data: searchcQuery): musicType[] {
     this.filteredSongs = this.songsArray.filter((song) => {
      // Filter condition: songQuery matches songName and artistQuery matches artistName

      return (
        song.songName?.toLowerCase().includes(data.musicQuery) &&
        song.artistName?.toLowerCase().includes(data.artistQuery)
      );
     
    });

    this.filteredSongs$.next(this.filteredSongs);
    // this.songsArray=this
    return this.filteredSongs;
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
  }
 generateUUID(): string {
  const uuidPattern: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  return uuidPattern.replace(/[xy]/g, (character) => {
    const random = Math.floor(Math.random() * 16);
    const value = character === 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
  }


  unsort(column:string):musicType[] {
    console.log(column);
    return this.filteredSongs;
  }
  sortDescending(column:string):musicType[] {
    console.log(column);
    console.log(this.filteredSongs);
    
  switch (column){
    case 'songName':
      this.filteredSongs.sort((a, b) => b.songName.localeCompare(a.songName));
      break;
    case 'artistName':
      this.filteredSongs.sort((a, b) => b.artistName.localeCompare(a.artistName));
      break;
    case 'numberOfStreams':
      this.filteredSongs.sort((a, b) => b.numberOfStreams - a.numberOfStreams);
      break;
    case 'releaseYear':
      this.filteredSongs.sort((a, b) => b.releaseYear - a.releaseYear);
      break;
    case 'durationInSeconds':
      this.filteredSongs.sort((a, b) => b.durationInSeconds - a.durationInSeconds);
      break;
    default:
      break;
  }
  return this.filteredSongs;
  }
  sortAscending(column:string):musicType[] {
    console.log(column);
    
  switch (column) {
    case 'songName':
      this.filteredSongs.sort((a, b) => a.songName.localeCompare(b.songName));
      break;
    case 'artistName':
      this.filteredSongs.sort((a, b) => a.artistName.localeCompare(b.artistName));
      break;
    case 'numberOfStreams':
      this.filteredSongs.sort((a, b) => a.numberOfStreams - b.numberOfStreams);
      break;
    case 'releaseYear':
      this.filteredSongs.sort((a, b) => a.releaseYear - b.releaseYear);
      break;
    case 'durationInSeconds':
      this.filteredSongs.sort((a, b) => a.durationInSeconds - b.durationInSeconds);
      break;
    default:
      break;
  }
  return this.filteredSongs;
  }
}
export interface searchcQuery {
  musicQuery: string;
  artistQuery: string;
}


