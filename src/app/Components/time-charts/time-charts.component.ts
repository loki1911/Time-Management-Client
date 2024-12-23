import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-time-charts',
  templateUrl: './time-charts.component.html',
  styleUrls: ['./time-charts.component.css']
})
export class TimeChartsComponent {


  chartData = [
    { date: '2024-12-01', hours: 8 },
    { date: '2024-12-02', hours: 5 },
    { date: '2024-12-03', hours: 7 },
    { date: '2024-12-04', hours: 6 },
    { date: '2024-12-05', hours: 9 },
    { date: '2024-12-06', hours: 4 },
    { date: '2024-12-07', hours: 10 },
  ];
  selectedRole: string = 'User';

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
    { headerName: 'Task Type', field: 'taskType', sortable: true, filter: true },
    { headerName: 'Task Description', field: 'taskDescription', sortable: true, filter: true },
    { headerName: 'Hours & Mins', field: 'hoursAndMins', sortable: true, filter: true },
    { headerName: 'Date', field: 'date', sortable: true, filter: true }
  ];

  rowData = [
    {
      employeeEmail: 'lokesh@konaai.com',
      projectName: 'time management',
      clientName: 'Dcube',
      activityCode: 'billing',
      taskType: 'Development',
      taskDescription: 'Fixing bugs in the system',
      hoursAndMins: '3:30 ',
      date: '2024-12-20'
    },
    {
      employeeEmail: 'kavya@konaai.com',
      projectName: 'time management',
      clientName: 'Dcube',
      activityCode: 'billing',
      taskType: 'Development',
      taskDescription: 'Fixing bugs in the system',
      hoursAndMins: '4:00 ',
      date: '2024-12-21'
    },
    {
      employeeEmail: 'teja@konaai.com',
      projectName: 'time management',
      clientName: 'Dcube',
      activityCode: 'billing',
      taskType: 'Development',
      taskDescription: 'Fixing bugs in the system',
      hoursAndMins: '3:00 ',
      date: '2024-12-19'
    },
    {
      employeeEmail: 'vaishnavi@konaai.com',
      projectName: 'time management',
      clientName: 'Dcube',
      activityCode: 'billing',
      taskType: 'Development',
      taskDescription: 'Fixing bugs in the system',
      hoursAndMins: '5:00',
      date: '2024-12-18'
    },
    {
      employeeEmail: 'vishnu@konaai.com',
      projectName: 'time management',
      clientName: 'Dcube',
      activityCode: 'billing',
      taskType: 'Development',
      taskDescription: 'Fixing bugs in the system',
      hoursAndMins: '4:00 ',
      date: '2024-12-23'
    },
    {
      employeeEmail: 'loki@konaai.com',
      projectName: 'time management',
      clientName: 'Dcube',
      activityCode: 'billing',
      taskType: 'Development',
      taskDescription: 'Fixing bugs in the system',
      hoursAndMins: '3:30 ',
      date: '2024-12-20'
    }
  ];

  constructor(private router: Router) {}
  navigatetoMyTime() {
    if (this.selectedRole === 'User') {
      this.router.navigate(['my-time']);
    } else if (this.selectedRole === 'Admin') {
      this.router.navigate(['admin']);
    }
  }
  
  navigatetoClient(){
    this.router.navigate(['clients'])
  }
  navigatetoProject(){
    this.router.navigate(['projects'])
  }
  navigatetoEmployee(){
    this.router.navigate(['employees'])
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
