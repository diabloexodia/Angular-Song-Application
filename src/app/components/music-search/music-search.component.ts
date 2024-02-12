import { Component, Injectable, OnInit } from '@angular/core';
import { MusicServicesService } from '../../shared/Services/MusicService/music-services.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
@Component({
  selector: 'app-music-search',
  templateUrl: './music-search.component.html',
  styleUrls: ['./music-search.component.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class MusicSearchComponent implements OnInit {
  musicForm: FormGroup;
  musicquery = new FormControl();
  artistquery = new FormControl();
  constructor(
    private musicService: MusicServicesService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.musicForm = this.formBuilder.group({
      musicQuery: this.formBuilder.control(''),
      artistQuery: this.formBuilder.control(''),
    });
    this.musicForm.valueChanges.subscribe((data) => {
      this.musicService.handler(data);
    });
  }
}
