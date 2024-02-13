import { Component, OnInit } from '@angular/core';
import { MusicServicesService } from '../../shared/Services/MusicService/music-services.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-music-search',
  templateUrl: './music-search.component.html',
  styleUrls: ['./music-search.component.scss'],
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

  /**
   * This function initializes the reactive forms and creates a 
   * subscriptoin for every value change in the form
   */
  initializeForm(): void {
    this.musicForm = this.formBuilder.group({
      musicQuery: this.formBuilder.control(''),
      artistQuery: this.formBuilder.control(''),
    });
    const s = this.musicForm.valueChanges.subscribe((data) => {
      this.musicService.songFilter(data);
    });

    // this.subscriptions.push(s)
  }
}
