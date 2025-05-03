import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableService } from '../tableService';
import { state } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'environment';

@Component({
  selector: 'app-edit-dialog',
  imports: [CommonModule, MaterialModule,ReactiveFormsModule],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss'
})
export class EditDialogComponent {
  inquiryForm: FormGroup;
  departments: string[] = ['Admission','Chairman office','UPF', 'Pension', 'Academic', 'HR', 'Finance', 'General Admin', 'Personnel', 'MIS', 'Secretariat Office', 'Vice Chairman Office', 'Legal', 'Other'];
  inquiryTypes: string[] = ['Cutoff','Recognition Letter', 'Normal intake', 'Special intake', 'Disable Intake', 'CGP', 'Late Reg', 'Previous Course back', 'Email or Phone Number Change', 'Mahapola', 'Other'];
  forwardedOptions: string[] = ['Academic', 'HR', 'Finance', 'General Admin', 'Personnel', 'MIS', 'Secretariat Office', 'Vice Chairman Office', 'Legal','Secretariat Office','SAS Shalika', 'AS Amanadee', 'AS Vijini','AS Gihani', 'Other'];
   statusOptions = ['Resolved','In Progress','Forwarded']
   selectedFiles: File[] = [];
   baseURL = environment.baseURL;
   forwordedList : any[] = []
  constructor(
    private inquiryService: TableService, 
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  
  ngOnInit(): void {
    this.getUsersToForword()
    // Initialize form group with validation
    this.inquiryForm = new FormGroup({

      index_number: new FormControl(this.data?.index_number , [Validators.minLength(7),Validators.maxLength(7)]),
      student_name: new FormControl(this.data?.student_name , Validators.required),
      phone_number: new FormControl(this.data?.phone_number , [
        Validators.required,
        Validators.pattern('^[0-9]{9}$')
      ]),
      academic_year: new FormControl(this.data?.academic_year),
      department: new FormControl(this.data?.department , Validators.required),
      inquiry: new FormControl(this.data?.inquiry , Validators.required),
      forwarded_to: new FormControl(this.data?.forwarded_to , [Validators.required]),
      remarks: new FormControl(this.data?.remarks),
      initial_status_1: new FormControl(this.data?.initial_status_1),
      updated_status: new FormControl(this.data?.updated_status),
      inquiryTime: new FormControl(this.data?.inquiry_time ),
      createdAt: new FormControl(this.data?.created_at ),
      updatedAt: new FormControl(this.data?.updated_at),
      user_id: new FormControl(this.data?.user_id ),
      nic_number: new FormControl(this.data?.nic_number,[
        Validators.required,
        Validators.pattern('^([0-9]{9}[vVxX]|[0-9]{12})$')
      ]),
      student_email: new FormControl(this.data?.student_email)
    });

    this.selectedFiles = this.data?.attachment_urls || [];
  }
  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFiles = Array.from(event.target.files) as File[];
  
      // Append files to the selectedFiles array
      this.selectedFiles = [...this.selectedFiles, ...selectedFiles];
      
  
      console.log("Selected Files:", this.selectedFiles); // Debugging
      
    // alert("calling 1")
    const formData = new FormData();


    // ✅ Append multiple files properly
    selectedFiles.forEach((file) => {
      formData.append('files', file, file.name); // Ensure backend expects 'files'
    });

    //  // ✅ Append all form fields except files
    //  Object.keys(this.inquiryForm.value).forEach((key) => {
    //   if (key !== 'files' && this.inquiryForm.value[key]) {
    //     formData.append(key, this.inquiryForm.value[key]);
    //   }
    // });
    // ✅ Append other required form fields
    formData.append('id', this.data.id);

     // ✅ Send request
     this.inquiryService.editInquiryFile(formData).subscribe({
      next: (response) => {
        console.log('Files & Data uploaded successfully', response);
        // this.selectedFiles = []; // Reset files after upload
        // this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error uploading files & form data', error);
      }
    });
    }

  }
  
  
    // Remove file from the list
    deleteFile(index: number , name: any) {
      this.selectedFiles.splice(index, 1);
      const formData = {
        "file_name": name,
"id":this.data.id
      }

      // formData.append('file_name', name);
      // formData.append('id', this.data.id);
      this.inquiryService.deleteInquiryFile(formData).subscribe({
        next: (res: any) => {
          // this.dialogRef.close(true);
          // this.snackBar.open('Record updated successfully', 'Close', { duration: 2000 });
          // this.get(); // Refresh table data
        },
        error: error => {
          // this.snackBar.open('Error updating record', 'Close', { duration: 2000 });
        }
      });
    }

  // Submit or update form data
  onSubmit(): void {
    if (this.inquiryForm.valid) {
      // const formData = new FormData();
      var model = {
        nic_number:this.inquiryForm.value.nic_number,
        // student_email:this.inquiryForm.value.student_email,
        index_number:this.inquiryForm.value.index_number, 
        student_name:this.inquiryForm.value.student_name,
        academic_year:this.inquiryForm.value.academic_year,
        phone_number:this.inquiryForm.value.phone_number,
        department:this.inquiryForm.value.department,
        inquiry:this.inquiryForm.value.inquiry,
        remarks:this.inquiryForm.value.remarks,
        id:this.data.id
      }

        this.inquiryService.editInquiry(this.data.id, model).subscribe(
          (res: any) => {
            console.log('Update Success:', res);
            // alert('Data updated successfully!');
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Update Error:', error);
            // alert('Failed to update data.');
          }
        );
      }
    
    


// class Inquiry {
//   constructor(
//     public id: number,
//     public indexNumber: string,
//     public studentName: string,
//     public contactNumber: string,
//     public academicYear: string,
//     public department: string,
//     public inquiryType: string,
//     public forwardedTo: string,
//     public updatedStatus: any,
//     public remarks: any
//   ) {}
}
onCancel(): void {
  this.dialogRef.close(false);
}
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

}