import { Component, Inject } from '@angular/core';
import { TableService } from '../tableService';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  imports: [],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent {
 constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public inqurieService: TableService) {
    // console.log(data)
  }
  clickfunc(){
    this.inqurieService.deleteInquiry(this.data).subscribe(
      (res: any) => {
        console.log(res);
        this.onCancel();
        // this.snackBar.open('Record updated successfully', 'Close', { duration: 2000 });
        // this.get(); // Refresh table data
      },
      error => {
        // this.snackBar.open('Error updating record', 'Close', { duration: 2000 });
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  
}
