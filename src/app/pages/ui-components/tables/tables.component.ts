import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { TableService } from './tableService';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

// table 1
export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  budget: number;
  priority: string;
}

const PRODUCT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/products/product-1.png',
    uname: 'iPhone 13 pro max-Pacific Blue-128GB storage',
    budget: 180,
    priority: 'confirmed',
  },
  {
    id: 2,
    imagePath: 'assets/images/products/product-2.png',
    uname: 'Apple MacBook Pro 13 inch-M1-8/256GB-space',
    budget: 90,
    priority: 'cancelled',
  },
  {
    id: 3,
    imagePath: 'assets/images/products/product-3.png',
    uname: 'PlayStation 5 DualSense Wireless Controller',
    budget: 120,
    priority: 'rejected',
  },
  {
    id: 4,
    imagePath: 'assets/images/products/product-4.png',
    uname: 'Amazon Basics Mesh, Mid-Back, Swivel Office',
    budget: 160,
    priority: 'confirmed',
  },
];

@Component({
  selector: 'app-tables',
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './tables.component.html',
})
export class AppTablesComponent {
  displayedColumns: string[] = ['image', 'uname']; // Define table columns
  dataSource1: any[] = []; // Store retrieved user data
  displayedColumns1: string[] = ['index_number','student_name','academic_year', 'phone_number','department','inquiry_type','forwarded_to','updated_status','created_at','remarks' , 'budget'];
  selectedRow: any = null;

  showToast: boolean = false;
  toastMessage: string = '';
  toastType: string = '';  // This will hold the type of the toast (success, error, info)]
  datafiltered: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private userService: TableService,
    private tableService: TableService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar  
  ) {}

  selectRow(row: any): void {
    this.selectedRow = row;
  }
  ngOnInit(){
    this.getData();
    
  }

  getData(){
    this.userService.getInqueries().subscribe({
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
  
  applyFilter(event: Event) {
    console.log("event",event)
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    console.log("filterValue",filterValue)
    this.datafiltered.filter = filterValue;
  }
  

  // Edit row functionality
  editRow(element: any): void {
    console.log(element, "edit records")
    // Open a dialog or form for editing
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: element,
      width: '500px', // Adjust width
      height: '600px', // Adjust height
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
      height: '600px', // Adjust height
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
