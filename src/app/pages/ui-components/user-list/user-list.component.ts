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
  displayedColumns1: string[] = ['index_number','student_name','academic_year', 'phone_number','department','inquiry_type','forwarded_to','updated_status','created_at','remarks' , 'budget'];
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

  selectRow(row: any): void {
    this.selectedRow = row;
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
  
}
