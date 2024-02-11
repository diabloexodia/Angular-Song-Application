import {

  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MusicSearchComponent } from './components/music-search/music-search.component';
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


  title = 'SongApp';

  length = this.musicService.songsArray.length;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  DialogueForm:FormGroup;
  showPageSizeOptions = true;
  showFirstLastButtons = true;

selectedIds: string[] = [];
  pageEvent: PageEvent;
  songsArray: musicType[];
  displayedRows: musicType[];
  constructor(private musicService: MusicServicesService,private dialog: MatDialog) {}
  updateDisplayedRows(startPage: number, endPage: number) {
    this.displayedRows = this.filteredSongs.slice(startPage, endPage);
  }
  addItem(event:string[]){
    this.selectedIds=event;
  }
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
  filteredSongs: musicType[];
  ngOnInit(): void {
    this.displayedRows = songs
    this.filteredSongs = this.musicService.songFilter({
      musicQuery: '',
      artistQuery: '',
    }
    );
    const startPage = this.pageIndex * this.pageSize;
  const endPage = startPage + this.displayedRows.length;
  this.updateDisplayedRows(startPage, endPage);

  this.musicService.filteredSongs$.subscribe((data) => {
    this.filteredSongs = data;
    this.updateDisplayedRows(startPage, endPage);
  });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  addButtonDialogue(){
    this.dialog.open(DialogueComponentComponent).afterClosed().subscribe(data => {
      if (data) {
        this.DialogueForm = data; // Receive form data from dialogue
        console.log('Received form data:', data);
        this.musicService.addNewSong(data);
      }
    });

  }


}
