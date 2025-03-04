export interface FileData {
  id?: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadDate: Date;
  url?: string;
  data?: File | Blob;
}

export interface FileUploadResponse {
  success: boolean;
  file: FileData;
  message?: string;
} 