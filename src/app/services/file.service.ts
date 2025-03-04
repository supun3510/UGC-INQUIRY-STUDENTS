import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environment';
import { FileData, FileUploadResponse } from '../interfaces/file.interface';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private filesSubject = new BehaviorSubject<FileData[]>([]);
  public files$ = this.filesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadFiles(); // Load files when service initializes
  }

  // Get all files
  private loadFiles() {
    this.http.get<FileData[]>(`${environment.baseURL}/files`)
      .subscribe({
        next: (files) => {
          this.filesSubject.next(files);
        },
        error: (error) => {
          console.error('Error loading files:', error);
          this.filesSubject.next([]);
        }
      });
  }

  // Upload a file
  uploadFile(file: File): Observable<FileUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<FileUploadResponse>(
      `${environment.baseURL}/files/upload`,
      formData,
      {
        reportProgress: true,
        observe: 'events'
      }
    ).pipe(
      map(event => this.getEventMessage(event, file)),
      tap((response: any) => {
        if (response.type === HttpEventType.Response) {
          const currentFiles = this.filesSubject.value;
          this.filesSubject.next([...currentFiles, response.body.file]);
        }
      })
    );
  }

  // Download a file
  downloadFile(fileId: string): Observable<Blob> {
    return this.http.get(`${environment.baseURL}/files/${fileId}/download`, {
      responseType: 'blob'
    });
  }

  // Delete a file
  deleteFile(fileId: string): Observable<any> {
    return this.http.delete(`${environment.baseURL}/files/${fileId}`).pipe(
      tap(() => {
        const currentFiles = this.filesSubject.value;
        this.filesSubject.next(currentFiles.filter(file => file.id !== fileId));
      })
    );
  }

  // Get file details
  getFileDetails(fileId: string): Observable<FileData> {
    return this.http.get<FileData>(`${environment.baseURL}/files/${fileId}`);
  }

  // Get all files
  getAllFiles(): Observable<FileData[]> {
    return this.files$;
  }

  // Helper method to process upload events
  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return { type: HttpEventType.Sent, message: `Uploading file "${file.name}"...` };
      case HttpEventType.UploadProgress:
        const percentDone = event.total ? Math.round(100 * event.loaded / event.total) : 0;
        return { type: HttpEventType.UploadProgress, message: `${file.name} is ${percentDone}% uploaded.`, progress: percentDone };
      case HttpEventType.Response:
        return event;
      default:
        return event;
    }
  }
} 