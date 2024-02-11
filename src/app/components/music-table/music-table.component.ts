import {
  Component,
  Input,
} from '@angular/core';
import { MusicServicesService } from '../../shared/Services/MusicService/music-services.service';
import { Observable, map } from 'rxjs';
import { musicType } from '../../shared/models/musicType.interface';
@Component({
  selector: 'app-music-table',
  templateUrl: './music-table.component.html',
  styleUrls: ['./music-table.component.scss'],
})
export class MusicTableComponent {
  constructor(private musicService: MusicServicesService) {}

 
  songsArray: musicType[];
  filteredSongs: musicType[];
  displayedColumns: string[] = [
    '',
    'id',
    'Song Name',
    'Artist Name',
    'Number Of Streams',
    'Release Year',
    'Duration In Seconds',
  ];

  @Input() songs: musicType[];
}
