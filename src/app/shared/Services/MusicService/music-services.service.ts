import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MusicType } from '../../models/musicType.interface';
import { songs } from '../../../../assets/songs1';
@Injectable({
  providedIn: 'root',
})
export class MusicServicesService {
  songSearchSubject$: Subject<searchcQuery> = new Subject<searchcQuery>();
  filteredSongs$: Subject<MusicType[]> = new Subject<MusicType[]>();
  songsArray: MusicType[] = songs;
  filteredSongs: MusicType[];

  currentSearch:searchcQuery;

  localStorageKey = 'savedSongs'; // Define a clear key for storage
  /**
   * This function loads ALL the song swhen the page is displayed
   */

  constructor() {
    this.loadSongData();
  }

  searchQuery(searchQuery:searchcQuery){
    this.songSearchSubject$.next(searchQuery);
  }
  /**
   * Converts the songs1.ts file present in 'assets' folder into JSON object
   */
  loadSongData(): void {
    // console.log(this.songsArray.length);
    const storedSongs = sessionStorage.getItem(this.localStorageKey);
    if (storedSongs) {
      this.songsArray = JSON.parse(storedSongs);
    } else {
      this.songsArray = JSON.parse(JSON.stringify(songs));
    }
    console.log(this.songsArray.length);
  }

  /**
   * Saves the current song data to local storage
   */
  saveSongDataToLocalStorage(): void {
    sessionStorage.setItem(this.localStorageKey, JSON.stringify(this.songsArray));
  }

  /**
   * This function filters the songs based on the searched 'artistName' and 'songName'
   * @param data
   * @returns an arry of songs of MusicType
   */
  songFilter(data: searchcQuery): MusicType[] {
    this.currentSearch=data;
    this.filteredSongs = this.songsArray.filter((song) => {
      return (
        song.songName?.toLowerCase().includes(data.musicQuery) &&
        song.artistName?.toLowerCase().includes(data.artistQuery)
      );
    });
    this.filteredSongs$.next(this.filteredSongs);
    return this.filteredSongs;
  }

  /**
   * This function extracts the value from the form fields and pushes the new song into the filteredSongs$ subject
   * @param newSong
   */
  addNewSong(newSong: MusicType): void {
    console.log(newSong);
    const newSongwithID: MusicType = {
      id: this.generateUUID(),
      songName: newSong.songName,
      artistName: newSong.artistName,
      numberOfStreams: newSong.numberOfStreams,
      releaseYear: newSong.releaseYear,
      durationInSeconds: newSong.durationInSeconds,
    };
    this.songsArray.unshift(newSongwithID);
    this.filteredSongs$.next(this.songsArray);
   

    this.saveSongDataToLocalStorage();
  }

  /**
   * This funtion generates a 16 digit UUID pattern using RegEx
   * @returns string
   */
  generateUUID(): string {
    const uuidPattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
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
  unsort(column: string,displayedRows: MusicType[]): MusicType[] {
    console.log(column);
  //  this.filteredSongs$.next(this.filteredSongs);
    return this.filteredSongs;
  }

  /**
   *  This function sorts the displayed rows in descending order and pushes into the filteredSongs$ subject
   * @param column
   * @param displayedRows
   * @returns sorted array
   */
  sortDescending(column: string, displayedRows: MusicType[]): MusicType[] {
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
    // this.filteredSongs$.next(displayedRows);
    // return this.filteredSongs;
    return displayedRows;
  }

  /**
   * this function sorts hte displayed
   * @param column
   * @param displayedRows
   * @returns sorted array
   */
  sortAscending(column: string, displayedRows: MusicType[]): MusicType[] {
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
    // this.filteredSongs$.next(displayedRows);
    // return this.filteredSongs;

    return displayedRows;
  }

  /**
   * This function removes the songs whose id matches the ids inside the selectedIds[]
   * @param selectedIds
   */
  deleteSelected(selectedIds: string[]): void {
    this.songsArray = this.songsArray.filter(
      (song) => !selectedIds.includes(song.id)

    );

    this.songFilter(this.currentSearch);

//     this.songFilter({musicQuery:this.songSearchSubject$[0],artistQuery:this.songSearchSubject$[1]})
// console.log("asd",this.songSearchSubject$[0]);

    // this.filteredSongs$.next(this.songsArray)
    this.saveSongDataToLocalStorage();
  }
}
export interface searchcQuery {
  musicQuery: string;
  artistQuery: string;
}
