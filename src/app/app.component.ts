import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MusicServicesService } from './shared/Services/MusicService/music-services.service';
import { MusicType } from './shared/models/musicType.interface';
import { PageEvent } from '@angular/material/paginator';
import { songs } from 'src/assets/songs1';
import { MatDialog } from '@angular/material/dialog';
import { DialogueComponentComponent } from './shared/shared Components/dialogue-component/dialogue-component.component';
import { FormGroup } from '@angular/forms';
import { DeleteComponentComponent } from './shared/shared Components/delete-component/delete-component.component';
import { Subscription, elementAt } from 'rxjs';
AppRoutingModule;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit,OnDestroy {
  dateformat  = false;

  title = 'SongApp';

  length = this.musicService.songsArray.length;
  pageSize = 10;
  pageIndex = 0;
  DialogueForm: FormGroup;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  selectedIds: string[] = [];
  pageEvent: PageEvent;
  songsArray: MusicType[];
  subscriptions:Subscription[]=[];
  // Input event emitter which is being emitted to table-component
  displayedRows: MusicType[];

  // Stores the filtered songs
  filteredSongs: MusicType[];


 
  constructor(
    private musicService: MusicServicesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

   // Initial calling when the page loads for the first time
    this.filteredSongs = this.musicService.songFilter({
      musicQuery: '',
      artistQuery: '',
    });
    const startPage = this.pageIndex * this.pageSize;
    const endPage = this.pageSize;
    this.updateDisplayedRows(startPage, endPage);
    
    // Creating the subsription for the filtered data and stores in filteredSongs
   const filteredSongsSubscription=  this.musicService.filteredSongs$.subscribe((data) => {
      this.filteredSongs = data;
      this.updateDisplayedRows(0, this.pageSize);
    });

    this.subscriptions.push(filteredSongsSubscription);
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(element=>{
        element.unsubscribe();
      })
  }

  /**
   * Function to switch the format of the time to MM:SS
   */
  switchFormat():void {
    this.dateformat = !this.dateformat;
  }
  
  /**
   * This function assigns displayedRows[] only the rows which 
   * has to be displayed from the filteredSongs
   * @param startPage
   * @param endPage 
   */
  updateDisplayedRows(startPage: number, endPage: number):void {
    this.displayedRows = this.filteredSongs.slice(startPage, endPage);
  }

  /**
   *
   * @param event recieves an array of selectedIds from the table-component via Event Emitter
   * and assigns it to selectedIds[]
   */
  addItem(event: string[]):void {
    this.selectedIds = event;
    console.log(event);
  }


  /**
   * This function is involked whenever there is an (event) in the paginator
   * @param e PageEvent parameter
   */
  handlePageEvent(e: PageEvent):void {
   
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    const startPage = e.pageIndex * e.pageSize;
    let endPage = startPage + e.pageSize;
    if(endPage > this.length)
    endPage = this.length;
    this.updateDisplayedRows(startPage, endPage);
  }

  /**
   * This function calls add functionality in musicServices
   */
  addButtonDialogue():void {
    const AdddialogBOXSubscription =this.dialog
      .open(DialogueComponentComponent)
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.DialogueForm = data; // Receive form data from dialogue
          this.musicService.addNewSong(data);
          this.length=this.musicService.songsArray.length+1;
        }
      });
   
      this.subscriptions.push(AdddialogBOXSubscription)
    
  }
  

    /**
     * Calls the deleteSelected function from the musicService
     */
    deleteSelected() :void{

      const deleteDialogBoxSubscription= this.dialog.open(DeleteComponentComponent).afterClosed().subscribe((data)=>{
        if(data ==true){
  
          this.musicService.deleteSelected(this.selectedIds);
           this.selectedIds=[];
          this.length=this.length-this.selectedIds.length;
        }
      else if(data == false)
      alert("Song successfully deleted !");
      })
      
      this.subscriptions.push(deleteDialogBoxSubscription);
    }
  

}
