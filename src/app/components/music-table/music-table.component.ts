import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
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
  @Input() displayedRows: musicType[];
selectedIds:string[]=[];
isSelected(id: string): boolean {
  return this.selectedIds.includes(id);
}

updateSelectedIds(id: string, event: Event) {

 
  
  const target = event.target as HTMLInputElement; // Type-cast event.target to HTMLInputElement
  if (target.checked) {
    if (!this.selectedIds.includes(id) ) {
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
unsort(column:string) {
 column = column.charAt(0).toLowerCase() + column.slice(1).replace(/\s+/g, '');
 this.displayedRows=this.musicService.unsort(column,this.displayedRows);
  
}
sortDescending(column:string) {
  column = column.charAt(0).toLowerCase() + column.slice(1).replace(/\s+/g, '');

  this.displayedRows=this.musicService.sortDescending(column,this.displayedRows);
  
}
sortAscending(column:string) {
  column = column.charAt(0).toLowerCase() + column.slice(1).replace(/\s+/g, '');
 
  this.displayedRows=this.musicService.sortAscending(column,this.displayedRows);
}
  constructor(private musicService: MusicServicesService) {}

 
  songsArray: musicType[];
  filteredSongs: musicType[];
  displayedColumns: string[] = [
    '',
    ' Id',
    'Song Name',
    'Artist Name',
    'Number Of Streams',
    'Release Year',
    'Duration In Seconds',
  ];

  
  
  
}
