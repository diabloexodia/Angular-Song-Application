import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MusicServicesService } from '../../shared/Services/MusicService/music-services.service';

import { MusicType } from '../../shared/models/musicType.interface';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-music-table',
  templateUrl: './music-table.component.html',
  styleUrls: ['./music-table.component.scss'],
})
export class MusicTableComponent {
  pageEvent: PageEvent;
  datasource: null;
  pageIndex: number;
  pageSize = 10;

  length: number;
  startPage = 0;
  endPage = this.startPage + this.pageSize;
  @Output() newItemEvent = new EventEmitter<string[]>();

  // gets the filteredrows$ from app component
  displayedRows: MusicType[];
  @Input() dateformat = false;
  selectedIds: string[] = [];
  songsArray: MusicType[];
  filteredSongs: MusicType[];
  displayedColumns: string[] = [
    '',
    'Song Name',
    'Artist Name',
    'Number Of Streams',
    'Release Year',
    'Duration In Seconds',
  ];

  constructor(private musicService: MusicServicesService) {
    this.musicService.filteredSongs$.subscribe((data) => {
      this.filteredSongs = data;

      this.sliceAndDisplay(
        this.pageSize,
        this.startPage,
        this.endPage,
        this.filteredSongs.length
      );
    });
  }

  /**
   * Utility function to convert time to MM:SS
   * @param durationInSeconds
   * @returns
   */
  convertToMMSS(durationInSeconds: number): string {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }
  /**
   * This function checks if the id is already present in the selectedIds[]
   * @param id
   * @returns boolean
   */
  isSelected(id: string): boolean {
    return this.selectedIds.includes(id);
  }

  /**
   * This function pushes the id of the checked songs into the selectedIds[] which has to be deleted
   * and then emits it as '@Output'
   * @param id
   * @param event
   */
  updateSelectedIds(id: string, event: Event): void {
    const target = event.target as HTMLInputElement; // Type-cast event.target to HTMLInputElement

    //Checks if the HTML Checkbox is in checked state
    if (target.checked && !this.selectedIds.includes(id)) {
      this.selectedIds.push(id);
    } else if (!target.checked && this.selectedIds.includes(id))
      this.selectedIds = this.selectedIds.filter((element) => element !== id);
    this.newItemEvent.emit(this.selectedIds);
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    console.log(event);
    this.startPage = event.pageIndex * this.pageSize;
    this.endPage = this.startPage + this.pageSize;
    length = event.length;

    this.sliceAndDisplay(
      this.pageSize,
      this.startPage,
      this.endPage,
      this.filteredSongs.length
    );
  }

  sliceAndDisplay(
    pageSize: number,
    startPage: number,
    endPage: number,
    length: number
  ) {
    this.displayedRows = this.filteredSongs.slice(startPage, endPage);
    this.pageSize = pageSize;
    this.length = length;
  }

  /**
   * This funtion unsorts the displayed rows by calling music services
   * @param column
   */
  unsort(column: string): void {
    column =
      column.charAt(0).toLowerCase() + column.slice(1).replace(/\s+/g, '');
    this.sliceAndDisplay(
      this.pageSize,
      this.startPage,
      this.endPage,
      this.filteredSongs.length
    );
  }

  /**
   * This funtion sorts the rows in descending order by calling music services
   * @param column
   */
  sortDescending(column: string): void {
    column =
      column.charAt(0).toLowerCase() + column.slice(1).replace(/\s+/g, '');

    this.displayedRows = this.musicService.sortDescending(
      column,
      this.displayedRows
    );
  }

  /**
   * This funtion sorts the displayed rows in ascending order by calling the music function
   * @param column
   */
  sortAscending(column: string): void {
    column =
      column.charAt(0).toLowerCase() + column.slice(1).replace(/\s+/g, '');

    this.displayedRows = this.musicService.sortAscending(
      column,
      this.displayedRows
    );
  }
}
