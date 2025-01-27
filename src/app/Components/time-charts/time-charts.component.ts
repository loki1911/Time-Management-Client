import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-time-charts',
  templateUrl: './time-charts.component.html',
  styleUrls: ['./time-charts.component.css']
})
export class TimeChartsComponent implements OnInit {
  selectedRole: any;
  isProfileMenuOpen = false;
  chartData : any[] = [];
  email : string | null = '';
  errorMessage = '';
  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  changePassword() {
    console.log('Change password clicked');
   
  }

  logout() {
    localStorage.removeItem('email'); 
    this.router.navigate(['login']); 
  }

  emailId: string | null = localStorage.getItem('Email');  

  gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 10,
    rowSelection: 'multiple',
    suppressRowClickSelection: true
  };

  columnDefs = [
    { 
      headerCheckboxSelection: true, 
      checkboxSelection: true, 
      width: 50 
    },
    { headerName: 'Employee Email', field: 'employeeEmail', sortable: true, filter: true },
    { headerName: 'Project Name', field: 'projectName', sortable: true, filter: true },
    { headerName: 'Client Name', field: 'clientName', sortable: true, filter: true },
    { headerName: 'Activity Code', field: 'activityCode', sortable: true, filter: true },
    { headerName: 'Task Description', field: 'taskDescription', sortable: true, filter: true },
    { headerName: 'Hours & Mins', field: 'hoursAndMins', sortable: true, filter: true },
    { headerName: 'Date', field: 'date', sortable: true, filter: true }
  ];

  rowData: any[] = []; 

  constructor(private router: Router, private employeeService: EmployeeService) {}

  ngOnInit() {
   var us =  localStorage.getItem('role');
   this.selectedRole= us;

    if (this.emailId) {
      this.fetchTaskData(this.emailId);  
    } else {
      console.error('No email found in local storage');
    }
    this.fetchWorkDetails();
  }
  fetchWorkDetails(): void {
    if (this.emailId) {
      this.employeeService.getWorkDetails(this.emailId).subscribe(
        (data) => {
          this.chartData = data;
          this.errorMessage = ''; 
        },
        (error) => {
          this.errorMessage = 'Unable to fetch data. Please try again later.';
          console.error(error);
        }
      );
    } else {
      this.errorMessage = 'Email is missing from local storage.';
    }
  }

  fetchTaskData(email: string) {
    this.employeeService.getTasksByEmail(email).subscribe(
      (data: any) => {
        console.log(data);
        
        this.rowData = data.map((task: any) => ({
          employeeEmail: task.employeeEmailId,
          projectName: task.projectName,
          clientName: task.clientName,
          activityCode : task.billingName,
          taskDescription: task.taskDescription,
          hoursAndMins: task.timeWorked, 
          date: task.date
        }));
        if (this.gridOptions.api) {
          this.gridOptions.api.setRowData(this.rowData);  
        }
      },
      (error) => {
        console.error('Error fetching task data:', error);
      }
    );
  }

  navigatetoMyTime() {
    if (this.selectedRole === 'User') {
      this.router.navigate(['my-time']);
    } else if (this.selectedRole === 'Admin') {
      this.router.navigate(['admin']);
    }
  }

  navigatetoClient() {
    this.router.navigate(['clients']);
  }

  navigatetoProject() {
    this.router.navigate(['projects']);
  }

  navigatetoEmployee() {
    this.router.navigate(['employees']);
  }

  navigatetoHome() {
    this.router.navigate(['TimeCharts']);
  }

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
  }

  getBarHeight(hours: number): string {
    const maxHeight = 300;
    const maxHours = 12;  
    return `${(hours / maxHours) * maxHeight}px`;
  }

  getBarColor(hours: number): string {
    if (hours >= 8) {
      return 'green';
    } else if (hours >= 5) {
      return 'yellow';
    } else {
      return 'red';
    }
  }
}
