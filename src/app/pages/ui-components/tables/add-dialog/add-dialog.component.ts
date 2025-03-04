import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TableService } from '../tableService';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-add-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , MaterialModule],
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  inquiryForm: FormGroup;
  // inquiryTypes: any
  departments: string[] = ['Admission','UPF', 'Pension', 'Academic', 'HR', 'Finance', 'General Admin', 'Personnel', 'MIS', 'Secretariat Office', 'Vice Chairman Office', 'Legal', 'Other'];
  inquiryTypes: string[] = ['Cutoff', 'Normal intake', 'Special intake', 'Disable Intake', 'CGP', 'Late Reg', 'Previous Course back', 'Email or Phone Number Change', 'Mahapola', 'Other'];
  forwardedOptions: string[] = ['Academic', 'HR', 'Finance', 'General Admin', 'Personnel', 'MIS', 'Secretariat Office', 'Vice Chairman Office', 'Legal','Secretariat Office','SAS Shalika', 'AS Amanadee', 'AS Vijini','AS Gihani', 'Other'];
  statusOptions = ['Resolved','Forwarded','Rejected']
  forwordedList : any[] = []
  selectedFiles: File[] = [];
  uploadUrl = 'YOUR_BACKEND_API_URL'; // Replace with your actual API endpoint
  constructor(
    private inquiryService: TableService,
    public dialogRef: MatDialogRef<AddDialogComponent>
  ) {}

  ngOnInit(): void {
    this.getUsersToForword()
    // Initialize form group with validation
    this.inquiryForm = new FormGroup({
      index_number: new FormControl('', [Validators.required,Validators.minLength(7),Validators.maxLength(7)]),
      student_name: new FormControl('', Validators.required),
      phone_number: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{9}$')]),
      academic_year: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      inquiry: new FormControl('', Validators.required),
      forwarded_to: new FormControl(''),
      initial_status_1: new FormControl(''),
      forword_status: new FormControl(''),
      nic_number: new FormControl('', Validators.required),
      student_email: new FormControl('', [Validators.required, Validators.email]),
      // files: new FormControl(''),
      remarks: new FormControl('')

    });
  }

  // ✅ Submit form with files
  onSubmit() {
    if (this.selectedFiles.length === 0) {
      console.error('No files selected');
      return;
    }

    const formData = new FormData();


    // ✅ Append multiple files properly
    this.selectedFiles.forEach((file) => {
      formData.append('files', file, file.name); // Ensure backend expects 'files'
    });

     // ✅ Append all form fields except files
     Object.keys(this.inquiryForm.value).forEach((key) => {
      if (key !== 'files' && this.inquiryForm.value[key]) {
        formData.append(key, this.inquiryForm.value[key]);
      }
    });
    // ✅ Append other required form fields
    // formData.append('nic_number', '123456789');
    // formData.append('student_email', 'asd@gmail.com');
    // formData.append('index_number', '1234567');
    // formData.append('student_name', 'test');
    // formData.append('academic_year', '2025');
    // formData.append('phone_number', '12222');
    // formData.append('department', 'CS');
    // formData.append('inquiry', 'TEXT EXAMPLE');
    // formData.append('remarks', 'remarks exp');
    // formData.append('initial_status_1', 'Resolved');
    // formData.append('initial_status_2', 'Resolved');
    formData.append('forwarded_to', '1');

    // ✅ Debugging: Check FormData contents before sending
    // console.log([...formData.entries()]);

    // ✅ Send request
    this.inquiryService.addInquiry(formData).subscribe(
      (response) => {
        console.log('Files & Data uploaded successfully', response);
        this.selectedFiles = []; // Reset files after upload
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Error uploading files & form data', error);
      }
    );
  }
// }
  


  getUsersToForword(){
    this.inquiryService.getUsersToForword().subscribe({
      next: (data) => {
        console.log("get data : ", data)
        this.forwordedList = data.admin_list;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  
  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFiles = Array.from(event.target.files) as File[];
  
      // Append files to the selectedFiles array
      this.selectedFiles = [...this.selectedFiles, ...selectedFiles];
  
      console.log("Selected Files:", this.selectedFiles); // Debugging
    }
  }
  
  
    // Remove file from the list
    removeFile(index: number) {
      this.selectedFiles.splice(index, 1);
    }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
