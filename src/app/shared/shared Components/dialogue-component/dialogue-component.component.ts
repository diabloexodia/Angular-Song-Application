import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      releaseYear : this.formBuilder.control('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      durationInSeconds : this.formBuilder.control('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      numberOfStreams : this.formBuilder.control('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    });
  }
  onAdd() {
    this.dialogRef.close(this.DialogueForm.value); // Pass form data back to the main component
  }
}
