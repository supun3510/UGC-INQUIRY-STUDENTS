import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
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
  ],
  templateUrl: './tables.component.html',
})
export class AppTablesComponent {
  displayedColumns: string[] = ['image', 'uname']; // Define table columns
  dataSource: any[] = []; // Store retrieved user data
  displayedColumns1: string[] = ['student_name','academic_year', 'phone_number','department','inquiry_type','initial_status', 'created_at' , 'budget'];
  selectedRow: any = null;

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
    this.userService.getUsers().subscribe({
      next: (data) => {
        console.log("get data : ", data)
        this.dataSource = data.inquiries;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }


  // Edit row functionality
  editRow(element: any): void {
    console.log(element, "edit records")
    // Open a dialog or form for editing
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: element
    });
   
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Save the changes after closing the dialog
        this.updateRow(result);
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
        // Save the changes after closing the dialog
        this.updateRow(result);
      }
    });
  }

  // Update row data
  updateRow(updatedData: any): void {
    this.tableService.updateUser(updatedData).subscribe(
      () => {
        this.snackBar.open('Record updated successfully', 'Close', { duration: 2000 });
        this.getData(); // Refresh table data
      },
      error => {
        this.snackBar.open('Error updating record', 'Close', { duration: 2000 });
      }
    );
  }

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
        this.saveNewRow(result);
      }
    });
  }

  // Save new row data
  saveNewRow(newData: any): void {
    console.log("add data",newData)
    this.tableService.addUser(newData).subscribe(
      () => {
        this.snackBar.open('Record added successfully', 'Close', { duration: 2000 });
        this.getData(); // Refresh table data
      },
      error => {
        this.snackBar.open('Error adding record', 'Close', { duration: 2000 });
      }
    );
  }
}
