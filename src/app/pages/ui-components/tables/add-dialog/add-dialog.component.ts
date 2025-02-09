import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TableService } from '../tableService';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-dialog',
  imports: [],
  templateUrl: './add-dialog.component.html',
  styleUrl: './add-dialog.component.scss'
})
export class AddDialogComponent {
  inquiryForm: FormGroup;

  constructor(private inquiryService: TableService,public dialogRef: MatDialogRef<AddDialogComponent>) { }

  ngOnInit(): void {
    // Initialize form group with controls
    this.inquiryForm = new FormGroup({
      indexNumber: new FormControl('', Validators.required),
      studentName: new FormControl('', Validators.required),
      contactNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      academicYear: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      inquiryType: new FormControl('', Validators.required),
      forwardedTo: new FormControl('', [Validators.required, Validators.email]),
      remark: new FormControl('')
    });
  }

  // Submit form data
  onSubmit(): void {
    // if (this.inquiryForm.valid) {
      const formData = this.inquiryForm.value;
      console.log(formData);
      // this.inquiryService.submitInquiry(formData).subscribe(
      //   response => {
      //     alert('Data saved successfully!');
      //     this.inquiryForm.reset(); // Reset form after successful submission
      //   },
      //   error => {
      //     console.error('Error:', error);
      //     alert('Failed to save data.');
      //   }
      // );
    // } else {
    //   alert('Please fill in all required fields.');
    // }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
  
   getFormData(): Inquiry | null {
    // Retrieve values from the form
    const indexNumber = (document.getElementById('indexNumber') as HTMLInputElement).value;
    const studentName = (document.getElementById('studentName') as HTMLInputElement).value;
    const contactNumber = (document.getElementById('contactNumber') as HTMLInputElement).value;
    const academicYear = (document.getElementById('academicYear') as HTMLInputElement).value;
    const department = (document.getElementById('department') as HTMLSelectElement).value;
    const inquiryType = (document.getElementById('inquiryType') as HTMLSelectElement).value;
    const forwardedTo = (document.getElementById('forwarded') as HTMLInputElement).value;
    const remark = (document.getElementById('remark') as HTMLTextAreaElement).value;
  
    // Validate that all fields are filled (optional)
    // if (
    //   !indexNumber ||
    //   !studentName ||
    //   !contactNumber ||
    //   !academicYear ||
    //   !department ||
    //   !inquiryType ||
    //   !forwardedTo ||
    //   !remark
    // ) {
    //   console.error('All fields are required.');
    //   return null;
    // }
  
    // Create an instance of the Inquiry model
    const inquiry = new Inquiry(
      indexNumber,
      studentName,
      contactNumber,
      academicYear,
      department,
      inquiryType,
      forwardedTo,
      remark
    );
  
    // Log the model (or pass it to a function for further processing)
    console.log(inquiry);
    return inquiry;
  }

  clickfunc(){
    const inquiry = this.getFormData();
    console.log('Inquiry data:', inquiry);
    var userId = localStorage.getItem('userId');
    var model = {
      'index_number': inquiry?.indexNumber,
      'student_name': inquiry?.studentName,
      'phone_number': inquiry?.contactNumber,
      'academic_year': inquiry?.academicYear,
      'department': inquiry?.department,
      'inquiry_type': inquiry?.inquiryType,
      'forwarded_to': inquiry?.forwardedTo,
      'remarks': inquiry?.remark,
      'user_id':userId,
      'initial_status':"Forwarded",
      'updated_status':"Forwarded"
      };
    this.inquiryService.addInquiry(model).subscribe(
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
  
  // Attach the function to the Confirm button
  //  confirmButton = document.getElementById('confirmButton');
  // if (confirmButton: any) {
  //   confirmButton.addEventListener('click', () => {
  //     const inquiry = this.getFormData();
  //     if (inquiry) {
  //       // Process the inquiry (e.g., send to an API)
  //       console.log('Inquiry data:', inquiry);
  //     }
  //   });
  // }
}



class Inquiry {
  constructor(
    public indexNumber: string,
    public studentName: string,
    public contactNumber: string,
    public academicYear: string,
    public department: string,
    public inquiryType: string,
    public forwardedTo: string,
    public remark: string
  ) {}
}