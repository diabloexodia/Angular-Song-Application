import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicSearchComponent } from './music-search.component';

describe('MusicSearchComponent', () => {
  let component: MusicSearchComponent;
  let fixture: ComponentFixture<MusicSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MusicSearchComponent]
    });
    fixture = TestBed.createComponent(MusicSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
