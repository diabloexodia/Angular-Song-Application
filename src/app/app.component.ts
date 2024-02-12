import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MusicServicesService } from './shared/Services/MusicService/music-services.service';
import { musicType } from './shared/models/musicType.interface';
import { PageEvent } from '@angular/material/paginator';
import { songs } from 'src/assets/songs1';
import { MatDialog } from '@angular/material/dialog';
import { DialogueComponentComponent } from './shared/shared Components/dialogue-component/dialogue-component.component';
import { FormGroup } from '@angular/forms';

AppRoutingModule;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  dateformat:boolean = false;
switchFormat() {
this.dateformat=!this.dateformat;
}
  title = 'SongApp';

  length = this.musicService.songsArray.length;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  DialogueForm: FormGroup;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  selectedIds: string[] = [];
  pageEvent: PageEvent;
  songsArray: musicType[];
  displayedRows: musicType[];
  filteredSongs: musicType[];

  constructor(
    private musicService: MusicServicesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.displayedRows = songs;
    this.filteredSongs = this.musicService.songFilter({
      musicQuery: '',
      artistQuery: '',
    });
    const startPage = this.pageIndex * this.pageSize;
    const endPage = startPage + this.displayedRows.length;
    this.updateDisplayedRows(startPage, endPage);

    this.musicService.filteredSongs$.subscribe((data) => {
      this.filteredSongs = data;
      this.updateDisplayedRows(startPage, endPage);
    });
  }

  /**
   * updates the page number of the paginator
   * @param startPage 
   * @param endPage 
   */
  updateDisplayedRows(startPage: number, endPage: number) {
    this.displayedRows = this.filteredSongs.slice(startPage, endPage);
  }

/**
 * 
 * @param event Pushes the id of the song into the selectedIds [] 
 */
  addItem(event: string[]) {
    this.selectedIds = event;
    console.log(event);
    
  }

  /**
   * Calls the deleteSelected function from the musicService 
   */
  deleteSelected() {
    this.musicService.deleteSelected(this.selectedIds);

    this.musicService.filteredSongs$.subscribe((data) => {
      this.filteredSongs = data;
    });
    this.musicService.filteredSongs$.subscribe((data) => {
      this.filteredSongs = data;
      // this.updateDisplayedRows(startPage, endPage);
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    const startPage = e.pageIndex * e.pageSize;
    const endPage = startPage + e.pageSize;

    this.updateDisplayedRows(startPage, endPage);
  }
  
  /**
   * This function calls add functionality in musicServices
   */
  addButtonDialogue() {
    this.dialog
      .open(DialogueComponentComponent)
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.DialogueForm = data; // Receive form data from dialogue
          console.log('Received form data:', data);
          this.musicService.addNewSong(data);
        }
      });
      this.musicService.filteredSongs$.subscribe((data) => {
        this.filteredSongs = data;
      });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }
 
 
}
