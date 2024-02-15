import { Component } from '@angular/core';
import { MusicServicesService } from '../../Services/MusicService/music-services.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-component',
  templateUrl: './delete-component.component.html',
  styleUrls: ['./delete-component.component.scss']
})
export class DeleteComponentComponent {



  constructor(private musicService:MusicServicesService,    private dialogRef: MatDialogRef<DeleteComponentComponent> ){
    
  }

  deletedSelectedSongs(){
    this.dialogRef.close(true);
  }
  cancelDeletion() {
 this.dialogRef.close(false);
    }
}
