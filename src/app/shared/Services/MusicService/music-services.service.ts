import { Injectable, OnInit } from '@angular/core';
import {  Subject } from 'rxjs';
import { musicType } from '../../models/musicType.interface';
import { songs } from '../../../../assets/songs1';
@Injectable({
  providedIn: 'root',
})
export class MusicServicesService implements OnInit {

  songSearchSubject$: Subject<searchcQuery> = new Subject<searchcQuery>();
  filteredSongs$: Subject<musicType[]> = new Subject<musicType[]>();
  songsArray: musicType[] = songs;
  filteredSongs: musicType[];
  
  ngOnInit(): void {
    this.loadSongData();
  }
  constructor() {}



  loadSongData() {
    this.songsArray = JSON.parse(JSON.stringify(songs));
  }

  songFilter(data: searchcQuery): musicType[] {
    this.filteredSongs = this.songsArray.filter((song) => {
      return (
        song.songName?.toLowerCase().includes(data.musicQuery) &&
        song.artistName?.toLowerCase().includes(data.artistQuery)
      );
    });

    this.filteredSongs$.next(this.filteredSongs);

    return this.filteredSongs;
  }

  handler(data: searchcQuery) {

    this.songFilter(data);
  }
  
  /**
   * This function extracts the value from the form fields and pushes the new song into the filteredSongs$ subject
   * @param newSong 
   */
  addNewSong(newSong: musicType) {
    console.log(newSong);
    let newSongwithID: musicType = {
      id: this.generateUUID(),
      songName: newSong.songName,
      artistName: newSong.artistName,
      numberOfStreams: newSong.numberOfStreams,
      releaseYear: newSong.releaseYear,
      durationInSeconds: newSong.durationInSeconds,
    };

    this.songsArray.unshift(newSongwithID);
    this.filteredSongs$.next(this.filteredSongs);
    
  }

  /**
   * This funtion generates a 16 digit pattern
   * @returns string
   */
  generateUUID(): string {
    const uuidPattern: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return uuidPattern.replace(/[xy]/g, (character) => {
      const random = Math.floor(Math.random() * 16);
      const value = character === 'x' ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  }

  /**
   * 
   * @param column this funtion unsorts the  displayedRows and pushes into the filteredSongs$ subject
   * @param displayedRows 
   * @returns 
   */
  unsort(column: string, displayedRows: musicType[]): musicType[] {
    console.log(column);
    this.filteredSongs$.next(this.filteredSongs);
    return this.filteredSongs;
  }

  /**
   *  This function sorts the displayed rows in descending order and pushes into the filteredSongs$ subject
   * @param column 
   * @param displayedRows 
   * @returns sorted array
   */
  sortDescending(column: string, displayedRows: musicType[]): musicType[] {
    console.log(column);
    console.log(this.filteredSongs);

    switch (column) {
      case 'songName':
        displayedRows.sort((a, b) => b.songName.localeCompare(a.songName));
        break;
      case 'artistName':
        displayedRows.sort((a, b) => b.artistName.localeCompare(a.artistName));
        break;
      case 'numberOfStreams':
        displayedRows.sort((a, b) => b.numberOfStreams - a.numberOfStreams);
        break;
      case 'releaseYear':
        displayedRows.sort((a, b) => b.releaseYear - a.releaseYear);
        break;
      case 'durationInSeconds':
        displayedRows.sort((a, b) => b.durationInSeconds - a.durationInSeconds);
        break;
      default:
        break;
    }
    this.filteredSongs$.next(displayedRows);
    return this.filteredSongs;
  }

  /**
   * this function sorts hte displayed 
   * @param column 
   * @param displayedRows 
   * @returns sorted array
   */
  sortAscending(column: string, displayedRows: musicType[]): musicType[] {
    console.log(column);

    switch (column) {
      case 'songName':
        displayedRows.sort((a, b) => a.songName.localeCompare(b.songName));
        break;
      case 'artistName':
        displayedRows.sort((a, b) => a.artistName.localeCompare(b.artistName));
        break;
      case 'numberOfStreams':
        displayedRows.sort((a, b) => a.numberOfStreams - b.numberOfStreams);
        break;
      case 'releaseYear':
        displayedRows.sort((a, b) => a.releaseYear - b.releaseYear);
        break;
      case 'durationInSeconds':
        displayedRows.sort((a, b) => a.durationInSeconds - b.durationInSeconds);
        break;
      default:
        break;
    }
    this.filteredSongs$.next(displayedRows);
    return this.filteredSongs;
  }

  /**
   * This function removes the songs whose id matches the ids inside the selectedIds[]
   * @param selectedIds 
   */
  deleteSelected(selectedIds: string[]) {

    // Alert box displayed for confirmation
    if (confirm('Are you sure you want to delete ?'))
      this.filteredSongs$.next(
        this.songsArray.filter((song) => !selectedIds.includes(song.id))
      );
  }
}
export interface searchcQuery {
  musicQuery: string;
  artistQuery: string;
}
