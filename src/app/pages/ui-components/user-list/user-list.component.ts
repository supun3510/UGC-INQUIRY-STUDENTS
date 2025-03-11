import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TableService } from '../tables/tableService';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AddDialogComponent } from '../tables/add-dialog/add-dialog.component';
import { AppSideRegisterComponent } from '../../authentication/side-register/side-register.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-user-list',
  imports: [ MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  dataSource1: any[] = [];
  datafiltered: any;
  displayedColumns1: string[] = ['Email','First Name','Last Name', 'Phone Number','Username'];
  selectedRow: any = null;

  showToast: boolean = false;
  toastMessage: string = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private userService: TableService,
    private tableService: TableService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar  
  ) {}

  ngOnInit(){
    this.getData()
  }
  selectRow(row: any): void {
    this.selectedRow = row;
  }

  addUser(){
    // Open a dialog for adding new user
    const dialogRef = this.dialog.open(AppSideRegisterComponent, {
      width: '500px',
      disableClose: true // Prevent closing when clicking outside
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.dialogRef.close(true);
        // Refresh the user list after adding
        this.getData();
      }
    });
  }
  
  getData(){
    this.userService.getUsersToForword().subscribe({
      next: (data) => {
        console.log("get data : ", data);
        // Sort admin_list by id in ascending order
        this.dataSource1 = data.admin_list.sort((a: any, b: any) => b.id - a.id);
        console.log("get data : ", this.dataSource1);
        
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
  
}
