import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogueComponentComponent } from './shared Components/dialogue-component/dialogue-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    DialogueComponentComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule,MatDialogModule,MatInputModule,MatFormFieldModule,MatSelectModule
  ]
})
export class SharedModule { }
