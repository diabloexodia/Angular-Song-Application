import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MusicServicesService } from '../../shared/Services/MusicService/music-services.service';
import { AppComponent } from 'src/app/app.component';
import { musicType } from '../../shared/models/musicType.interface';
@Component({
  selector: 'app-music-table',
  templateUrl: './music-table.component.html',
  styleUrls: ['./music-table.component.scss'],
})
export class MusicTableComponent {
  @Output() newItemEvent = new EventEmitter<string[]>();

  // gets the filteredrows$ from app component
  @Input() displayedRows: musicType[];
  @Input() dateformat:boolean=false;
  selectedIds: string[] = [];
  songsArray: musicType[];
  filteredSongs: musicType[];
  displayedColumns: string[] = [
    '',
    'Song Name',
    'Artist Name',
    'Number Of Streams',
    'Release Year',
    'Duration In Seconds',
  ];

  constructor(private musicService: MusicServicesService) {}

  convertToMMSS(durationInSeconds: number): string {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
   * @param id
   * @param event
   */
  updateSelectedIds(id: string, event: Event) {
    const target = event.target as HTMLInputElement; // Type-cast event.target to HTMLInputElement

    //Checks if the HTML Checkbox is in checked state
    if (target.checked) {
      if (!this.selectedIds.includes(id)) {
        this.selectedIds.push(id);
      }
    } else {
      const index = this.selectedIds.indexOf(id);
      if (index > -1) {
        this.selectedIds.splice(index, 1);
      }
    }
    this.newItemEvent.emit(this.selectedIds);
  }

  /**
   * This funtion unsorts the displayed rows by calling music services
   * @param column
   */
  unsort(column: string) {
    column =
      column.charAt(0).toLowerCase() + column.slice(1).replace(/\s+/g, '');
    this.displayedRows = this.musicService.unsort(column, this.displayedRows);
  }

  /**
   * This funtion sorts the rows in descending order by calling music services
   * @param column
   */
  sortDescending(column: string) {
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
  sortAscending(column: string) {
    column =
      column.charAt(0).toLowerCase() + column.slice(1).replace(/\s+/g, '');

    this.displayedRows = this.musicService.sortAscending(
      column,
      this.displayedRows
    );
  }
}
