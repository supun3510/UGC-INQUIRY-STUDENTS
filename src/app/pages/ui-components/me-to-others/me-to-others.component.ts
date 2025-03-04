import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewChild } from '@angular/core';
import { TableService } from '../tables/tableService';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environment';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialModule } from 'src/app/material.module'; 
import { AddDialogComponent } from '../tables/add-dialog/add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StatusDialogComponent } from '../tables/status-dialog/status-dialog.component';
import { EditDialogComponent } from '../tables/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '../tables/delete-dialog/delete-dialog.component';
@Component({
  selector: 'app-me-to-others',
  imports: [ MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,],
  templateUrl: './me-to-others.component.html',
  styleUrl: './me-to-others.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Add this line
})
export class MeToOthersComponent {
  private apiUrl = environment.baseURL + '/users/me-to-others';
  displayedColumns: string[] = ['image', 'uname']; // Define table columns
  dataSource1: any[] = []; // Store retrieved user data
  displayedColumns1: string[] = ['index_number','student_name','academic_year', 'phone_number','department','inquiry_type','forwarded_to','updated_status','created_at','remarks' , 'budget'];
  selectedRow: any = null;
  forwordedList : any[] = []
  showToast: boolean = false;
  toastMessage: string = '';
  toastType: string = '';  // This will hold the type of the toast (success, error, info)]
  datafiltered: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // @Input() childData: any[] = [];
  constructor(private userService: TableService,
    private tableService: TableService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar  
  ) {}

  selectRow(row: any): void {
    this.selectedRow = row;
  }
  ngOnInit(){
    // alert('tables')
    this.getData();
    // this.dataSource1 = this.childData;
    this.getUsersToForword()
  }

    // Method to get the user name by their ID or identifier
    getForwardedUserName(forwardedId: any): string {
      const user = this.forwordedList.find(user => user.id == forwardedId); 
      console.log("user",user)// Assuming 'id' is the key
      return user ? user.first_name + " " + user.last_name : '-';  // Return user name or 'Unknown' if not found
    }
  getData(){
    this.userService.getInqueriesMeToOthers().subscribe({
      next: (data) => {
        console.log("get data : ", data)
        this.dataSource1 = data.inquiries;

          
  this.datafiltered = new MatTableDataSource(this.dataSource1); // Replace ELEMENT_DATA with your actual data array
  this.datafiltered.paginator = this.paginator;
  this.datafiltered.sort = this.sort;
  // this.datafiltered = dataSource2.filterPredicate = (data, filter) => {
  //   return data.student_name.toLowerCase().includes(filter);
  // };
  
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  getUsersToForword(){
    this.userService.getUsersToForword().subscribe({
      next: (data) => {
        console.log("get data : ", data)
        this.forwordedList = data.admin_list;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  
  applyFilter(event: Event) {
    console.log("event",event)
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    console.log("filterValue",filterValue)
    this.datafiltered.filter = filterValue;
  }
  
  statusUpdate(element: any){
    console.log(element, "edit records")
    // Open a dialog or form for editing
    const dialogRef = this.dialog.open(StatusDialogComponent, {
      data: element,
      disableClose: true, // Prevent closing when clicking outside
    });
   
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Save the changes after closing the dialog
        // this.updateRow(result);
        this.showToastMessage('Status updated successfully','success');
        this.getData(); // Refresh table data
      }
    });
  }

  // Edit row functionality
  editRow(element: any): void {
    console.log(element, "edit records")
    // Open a dialog or form for editing
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: element,
      width: '500px', // Adjust width
      height: '550px', // Adjust height
      disableClose: true, // Prevent closing when clicking outside
    });
   
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Save the changes after closing the dialog
        // this.updateRow(result);
        this.showToastMessage('Record edit successfully','success');
        this.getData(); // Refresh table data
      }
    });
  }

   // Edit row functionality
   deleteRow(element: any): void {
    console.log(element, "edit records")
    // Open a dialog or form for editing
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: element
    });
   
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showToastMessage('Record delete successfully','error');
        // Save the changes after closing the dialog
        this.getData(); // Refresh table data
      }
    });
  }

  // Update row data
  // updateRow(updatedData: any): void {
  //   this.tableService.updateUser(updatedData).subscribe(
  //     () => {
  //       this.snackBar.open('Record updated successfully', 'Close', { duration: 2000 });
  //       this.getData(); // Refresh table data
  //     },
  //     error => {
  //       this.snackBar.open('Error updating record', 'Close', { duration: 2000 });
  //     }
  //   );
  // }

  // Delete row functionality
  // deleteRow(id: number): void {
  //   if (confirm('Are you sure you want to delete this record?')) {
  //     this.tableService.deleteInquiry(id).subscribe(
  //       () => {
  //         this.snackBar.open('Record deleted successfully', 'Close', { duration: 2000 });
  //         this.getData(); // Refresh table data
  //       },
  //       error => {
  //         this.snackBar.open('Error deleting record', 'Close', { duration: 2000 });
  //       }
  //     );
  //   }
  // }

  // Add new user
  addRow(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '500px', // Adjust width
      height: '550px', // Adjust height
      disableClose: true, // Prevent closing when clicking outside
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showToastMessage('Record added successfully','success');
        this.getData(); // Refresh table data
      }
    });
  }

  // // Save new row data
  // saveNewRow(newData: any): void {
  //   console.log("add data",newData)
  //   this.tableService.addUser(newData).subscribe(
  //     () => {
  //       this.snackBar.open('Record added successfully', 'Close', { duration: 2000 });
  //       this.getData(); // Refresh table data
  //     },
  //     error => {
  //       this.snackBar.open('Error adding record', 'Close', { duration: 2000 });
  //     }
  //   );
  // }


    
   // Method to show success toast
   showToastMessage(message: string , type: string) {
    this.toastMessage = message;
    this.showToast = true;
    this.toastType = type
    // Hide toast after 3 seconds
    setTimeout(() => {
      this.showToast = false;
      // this.onCancel();
    }, 3000);
  }

   // Method to close toast manually
closeToast() {
  this.showToast = false;
}
}
