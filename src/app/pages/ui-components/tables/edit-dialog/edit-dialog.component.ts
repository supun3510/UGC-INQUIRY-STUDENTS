import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableService } from '../tableService';
import { state } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-dialog',
  imports: [CommonModule, MaterialModule,ReactiveFormsModule],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss'
})
export class EditDialogComponent {
  inquiryForm: FormGroup;
  departments = ['Admission', 'Academic', 'HR', 'Finance', 'General Admin', 'Personnel', 'MIS', 'Secretariat Office', 'Chairman Office', 'Legal', 'Other'];
  inquiryTypes = ['Cutoff', 'Normal intake', 'Special intake', 'Disable Intake', 'CGP', 'Late Reg', 'Previous Course back', 'Email or Phone No Change', 'Mahapola', 'Other'];
  forwardedOptions = ['Cutoff', 'Normal intake', 'Special intake', 'Disable Intake', 'CGP', 'Late Reg', 'Previous Course back', 'Email or Phone No Change', 'Mahapola', 'Other'];
  statusOptions = ['Resolved','In Progress','Forwarded']
  constructor(
    private inquiryService: TableService, 
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // Initialize form group with validation
    this.inquiryForm = new FormGroup({

      index_number: new FormControl(this.data?.index_number , [Validators.required,Validators.minLength(7),Validators.maxLength(7)]),
      student_name: new FormControl(this.data?.student_name , Validators.required),
      phone_number: new FormControl(this.data?.phone_number , [
        Validators.required,
        Validators.pattern('^[0-9]{9}$')
      ]),
      academic_year: new FormControl(this.data?.academic_year , Validators.required),
      department: new FormControl(this.data?.department , Validators.required),
      inquiry_type: new FormControl(this.data?.inquiry_type , Validators.required),
      forwarded_to: new FormControl(this.data?.forwarded_to , [Validators.required]),
      remarks: new FormControl(this.data?.remarks , [Validators.required]),
      initial_status: new FormControl(this.data?.initial_status),
      updated_status: new FormControl(this.data?.updated_status),
      inquiryTime: new FormControl(this.data?.inquiry_time ),
      createdAt: new FormControl(this.data?.created_at ),
      updatedAt: new FormControl(this.data?.updated_at),
      user_id: new FormControl(this.data?.user_id )
    });
  }

  // Submit or update form data
  onSubmit(): void {
    if (this.inquiryForm.valid) {
      const formData = this.inquiryForm.value;
      console.log('Form Submitted:', formData);

      if (this.data) {
        // Assuming this.data.id contains the record ID you want to update
const formData = {
  ...this.inquiryForm.value, // Get the form values
  id: this.data.id // Add the id to the formData
};
        this.inquiryService.editInquiry(this.data.id, formData).subscribe(
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
      } else {
        this.inquiryService.addInquiry({ 
          ...formData, 
          id:this.data.id,
          user_id: localStorage.getItem('userId'), 
          initial_status: "Forwarded", 
          updated_status: "Forwarded" 
        }).subscribe(
          (res: any) => {
            console.log('Add Success:', res);
            // alert('Data saved successfully!');
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Add Error:', error);
            // alert('Failed to save data.');
          }
        );
      }
    } else {
      // alert('Please fill in all required fields.');
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
}