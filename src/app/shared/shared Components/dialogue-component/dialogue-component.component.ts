import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialogue-component',
  templateUrl: './dialogue-component.component.html',
  styleUrls: ['./dialogue-component.component.scss']
})
export class DialogueComponentComponent {
  DialogueForm:FormGroup;

  constructor(private formBuilder:FormBuilder,private dialogRef: MatDialogRef<DialogueComponentComponent>){
    this.intiateDialogueForm();
  }

  intiateDialogueForm(){
    this.DialogueForm = this.formBuilder.group({
      songName :this.formBuilder.control('',Validators.required),
      artistName :this.formBuilder.control('',Validators.required),
      releaseYear :this.formBuilder.control('',Validators.required),
      durationInSeconds :this.formBuilder.control('',Validators.required),
      numberOfStreams :this.formBuilder.control('',Validators.required),
    });
  }
  onAdd() {
    this.dialogRef.close(this.DialogueForm.value); // Pass form data back to the main component
  }
}
