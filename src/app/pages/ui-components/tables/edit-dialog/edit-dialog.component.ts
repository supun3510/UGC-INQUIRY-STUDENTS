import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableService } from '../tableService';
import { state } from '@angular/animations';

@Component({
  selector: 'app-edit-dialog',
  imports: [],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss'
})
export class EditDialogComponent {
  @Output() saveInquiry = new EventEmitter<any>();

  /**
   *
   */
  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public inqurieService: TableService) {
    // console.log(data)
  }
  
  @Input() inquiryData: any = {
    id : this.data.id,
    indexNumber: this.data.index_number,
    studentName: this.data.student_name,
    contactNumber: this.data.phone_number,
    academicYear: this.data.academic_year,
    department: this.data.department,
    inquiryType: this.data.inquiry_type,
    forwardedTo: this.data.forwarded_to,
    updatedStatus: this.data.updated_status,
    remarks: this.data.remarks
  };


  // Toggle to edit mode or save
  // toggleEdit(): void {
  //   this.isEditMode = !this.isEditMode;
  // }

  getFormData(): Inquiry | null {
    // Retrieve values from the form
    const indexNumber = (document.getElementById('indexNumber') as HTMLInputElement).value;
    const studentName = (document.getElementById('studentName') as HTMLInputElement).value;
    const contactNumber = (document.getElementById('contactNumber') as HTMLInputElement).value;
    const academicYear = (document.getElementById('academicYear') as HTMLInputElement).value;
    const department = (document.getElementById('department') as HTMLSelectElement).value;
    const inquiryType = (document.getElementById('inquiryType') as HTMLSelectElement).value;
    const updatedStatus = (document.getElementById('updatedStatus') as HTMLSelectElement).value;
    const forwardedTo = (document.getElementById('forwardedTo') as HTMLSelectElement).value;
    const remarks = (document.getElementById('remarks') as HTMLTextAreaElement).value;
    const id = this.data.id;
  
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
      id,
      indexNumber,
      studentName,
      contactNumber,
      academicYear,
      department,
      inquiryType,
      forwardedTo,
      remarks,
      updatedStatus
    );
  
    // Log the model (or pass it to a function for further processing)
    console.log(inquiry);
    return inquiry;
  }

  
  onCancel(): void {
    this.dialogRef.close(false);
  }
  clickfunc(){
    var userId = localStorage.getItem('userId')
    const inquiry = this.getFormData();
    console.log('Inquiry data:', inquiry);
    var model = {
      'id': inquiry?.id,
      'index_number': inquiry?.indexNumber,
      'student_name': inquiry?.studentName,
      'phone_number': inquiry?.contactNumber,
      'academic_year': inquiry?.academicYear,
      'department': inquiry?.department,
      'inquiry_type': inquiry?.inquiryType,
      'forwarded_to': inquiry?.forwardedTo,
      'remarks': inquiry?.remarks,
      'user_id':userId,
      'updated_status': inquiry?.updatedStatus,
      'initial_status':"Forwarded"
      };
    this.inqurieService.editInquiry(userId,model).subscribe(
      (res: any) => {
        console.log(res);
        // this.dialogRef.close(false);
        this.onCancel();
        // this.snackBar.open('Record updated successfully', 'Close', { duration: 2000 });
        // this.get(); // Refresh table data
      },
      error => {
        // this.snackBar.open('Error updating record', 'Close', { duration: 2000 });
      }
    );
  }

}


class Inquiry {
  constructor(
    public id: number,
    public indexNumber: string,
    public studentName: string,
    public contactNumber: string,
    public academicYear: string,
    public department: string,
    public inquiryType: string,
    public forwardedTo: string,
    public updatedStatus: any,
    public remarks: any
  ) {}
}