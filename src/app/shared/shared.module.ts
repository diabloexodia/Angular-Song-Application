import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogueComponentComponent } from './shared Components/dialogue-component/dialogue-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DeleteComponentComponent } from './shared Components/delete-component/delete-component.component';

@NgModule({
  declarations: [
    DialogueComponentComponent,
    DeleteComponentComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule,MatDialogModule,MatInputModule,MatFormFieldModule,MatSelectModule
  ]
})
export class SharedModule { }
