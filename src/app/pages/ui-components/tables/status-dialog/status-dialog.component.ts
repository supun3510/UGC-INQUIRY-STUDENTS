import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TableService } from '../tableService';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';

interface ExistingFile {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  url?: string;
}

interface ExistingFile {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  url?: string;
}

@Component({
  selector: 'app-status-dialog',
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.scss']
})
export class StatusDialogComponent implements OnInit {
  inquiryForm: FormGroup;
  statusOptions: string[] = [
    'Need 1 week',
    'Need 2 weeks',
    'Need 3 weeks',
    'Need a month',
    'Need more than one month',
    'Not eligible',
    'Resolved'
  ];

  selectedFiles: File[] = [];
  existingFiles: ExistingFile[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public inqurieService: TableService
  ) {

  }

  ngOnInit(): void {
    this.inquiryForm = this.fb.group({
      initial_status_2: ['', Validators.required]
    });
    // this.loadExistingFiles(this.data?.id);
  }

  onSubmit() {
    if (this.inquiryForm.valid) {
      const model = {
        id: this.data?.id,
        initial_status_2: this.inquiryForm.value.initial_status_2
      }
      

      this.inqurieService.updateStatus(model).subscribe({
        next: (res: any) => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error updating status:', error);
        }
      });
    }
  }
}