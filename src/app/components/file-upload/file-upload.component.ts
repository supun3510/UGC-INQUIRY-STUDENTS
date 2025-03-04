import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { FileData } from '../../interfaces/file.interface';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  template: `
    <div class="file-upload-container">
      <!-- Upload Section -->
      <div class="upload-section">
        <input
          type="file"
          #fileInput
          (change)="onFileSelected($event)"
          style="display: none"
          multiple
        />
        <button mat-raised-button color="primary" (click)="fileInput.click()">
          Choose Files
        </button>
        
        <!-- Upload Progress -->
        <div *ngIf="uploadProgress > 0 && uploadProgress < 100" class="progress-bar">
          <mat-progress-bar mode="determinate" [value]="uploadProgress"></mat-progress-bar>
          <span>{{ uploadProgress }}%</span>
        </div>
      </div>

      <!-- Files List -->
      <div class="files-list">
        <h3>Uploaded Files</h3>
        <mat-list>
          <mat-list-item *ngFor="let file of files$ | async">
            <mat-icon mat-list-icon>attachment</mat-icon>
            <div mat-line>{{file.fileName}}</div>
            <div mat-line>Size: {{formatFileSize(file.fileSize)}}</div>
            <button mat-icon-button (click)="downloadFile(file)">
              <mat-icon>download</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deleteFile(file)">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-list-item>
        </mat-list>
      </div>
    </div>
  `,
  styles: [`
    .file-upload-container {
      padding: 20px;
    }
    
    .upload-section {
      margin-bottom: 20px;
    }
    
    .progress-bar {
      margin-top: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .files-list {
      margin-top: 20px;
    }
  `]
})
export class FileUploadComponent implements OnInit {
  files$ = this.fileService.files$;
  uploadProgress = 0;

  constructor(private fileService: FileService) {}

  ngOnInit() {}

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      Array.from(files).forEach(file => {
        this.uploadFile(file);
      });
    }
  }

  uploadFile(file: File) {
    this.fileService.uploadFile(file).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = event.progress;
        } else if (event.type === HttpEventType.Response) {
          this.uploadProgress = 0;
          // Handle successful upload
          console.log('File uploaded successfully');
        }
      },
      error: (error) => {
        console.error('Upload failed:', error);
        this.uploadProgress = 0;
      }
    });
  }

  downloadFile(file: FileData) {
    if (file.id) {
      this.fileService.downloadFile(file.id).subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
    }
  }

  deleteFile(file: FileData) {
    if (file.id) {
      this.fileService.deleteFile(file.id).subscribe({
        next: () => {
          console.log('File deleted successfully');
        },
        error: (error) => {
          console.error('Delete failed:', error);
        }
      });
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
} 