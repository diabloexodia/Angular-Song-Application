import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogueComponentComponent } from './shared Components/dialogue-component/dialogue-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    DialogueComponentComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule,MatDialogModule
  ]
})
export class SharedModule { }
