import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MusicSearchComponent } from './components/music-search/music-search.component';
import { MusicTableComponent } from './components/music-table/music-table.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from './shared/shared.module';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@NgModule({
  declarations: [AppComponent, MusicSearchComponent, MusicTableComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    MatPaginatorModule,
    FormsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    SharedModule,MatFormFieldModule, MatInputModule, MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
