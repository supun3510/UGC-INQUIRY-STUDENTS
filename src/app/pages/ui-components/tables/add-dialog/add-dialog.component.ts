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
  statusOptions = ['Resolved','In Progress','Forwarded']
  constructor(
    private inquiryService: TableService,
    public dialogRef: MatDialogRef<AddDialogComponent>
  ) {}

  ngOnInit(): void {
    // Initialize form group with validation
    this.inquiryForm = new FormGroup({
      index_number: new FormControl('', [Validators.required,Validators.minLength(7),Validators.maxLength(7)]),
      student_name: new FormControl('', Validators.required),
      phone_number: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{9}$')]),
      academic_year: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      inquiry_type: new FormControl('', Validators.required),
      forwarded_to: new FormControl('', [Validators.required]),
      updated_status: new FormControl('', Validators.required),
      remarks: new FormControl('')


    });
  }

  // Submit form data
  onSubmit(): void {
    if (this.inquiryForm.valid) {
      const formData = this.inquiryForm.value;
      console.log('Form Submitted:', formData);

      this.inquiryService.addInquiry({ 
        ...formData, 
        user_id: localStorage.getItem('userId'), 
        initial_status: "Forwarded", 
        // updated_status: "Forwarded",
        inquiry_time: new Date(),
        created_at: new Date()
      }).subscribe(
        (res: any) => {
          console.log('Success:', res);
          // alert('Data saved successfully!');
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error:', error);
          // alert('Failed to save data.');
        }
      );
    } else {
      // alert('Please fill in all required fields.');
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
