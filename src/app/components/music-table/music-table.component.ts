import {
  Component,
  Input,
} from '@angular/core';
import { MusicServicesService } from '../../shared/Services/MusicService/music-services.service';

import { musicType } from '../../shared/models/musicType.interface';
@Component({
  selector: 'app-music-table',
  templateUrl: './music-table.component.html',
  styleUrls: ['./music-table.component.scss'],
})
export class MusicTableComponent {
unsort(column:string) {
 column = column.charAt(0).toLowerCase() + column.slice(1).replace(/\s+/g, '');
 this.songs=this.musicService.unsort(column);
  
}
sortDescending(column:string) {
  column = column.charAt(0).toLowerCase() + column.slice(1).replace(/\s+/g, '');

  this.songs=this.musicService.sortDescending(column);
  
}
sortAscending(column:string) {
  column = column.charAt(0).toLowerCase() + column.slice(1).replace(/\s+/g, '');
 
  this.songs=this.musicService.sortAscending(column);
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

  @Input() songs: musicType[];
}
