import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {


  constructor( private router : Router) {
    
  }
  navigatetoMyTime() {
    this.router.navigate(['my-time']);
  }

  navigatetoHome() {
    this.router.navigate(['TimeCharts']);
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
  gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 10,
    rowSelection: 'multiple',
    suppressRowClickSelection: true
  };

  employeeForm = { employeeId: '', emailId: '', employeeName: '', designation: '', department: '', workedHours: '', role: '' };


  columnDefs = [
    { 
      headerCheckboxSelection: true, 
      checkboxSelection: true, 
      width: 50 
    },
    { headerName: 'EmployeeId', field: 'employeeId', sortable: true, filter: true },
    { headerName: 'Employee Email', field: 'emailId', sortable: true, filter: true },
    { headerName: 'Employee Name', field: 'employeeName', sortable: true, filter: true },
    { headerName: 'Designation', field: 'designation', sortable: true, filter: true },
    { headerName: 'Department', field: 'department', sortable: true, filter: true },
    { headerName: 'Worked Hours', field: 'workedHours', sortable: true, filter: true },
    { headerName: 'Role', field: 'role', sortable: true, filter: true },






  ];

  rowData = [
   
      { employeeId: '1', emailId: 'lokesh@konaai.com', employeeName: 'lokesh', designation: 'Trainee', department: 'Development', workedHours: '40', role: 'Admin' },
      { employeeId: '2', emailId: 'kavya@konaai.com', employeeName: 'Kavya', designation: 'Trainee', department: 'Development', workedHours: '40', role: 'user' },
      { employeeId: '3', emailId: 'vaishnavi@konaai.com', employeeName: 'Vaishnavi', designation: 'Trainee', department: 'Development', workedHours: '40', role: 'Admin' },
      { employeeId: '4', emailId: 'teja@konaai.com', employeeName: 'Teja', designation: 'Trainee', department: 'Development', workedHours: '40', role: 'user' },
      { employeeId: '5', emailId: 'vishnu@konaai.com', employeeName: 'Vishnu', designation: 'Trainee', department: 'DB', workedHours: '40', role: 'user' }
    
    

  ];

  isModalVisible = false;
  isEditMode = false; 
  clientForm = { clientId: '', clientName: '' };

  onGridReady(params: any) {
    this.gridOptions.api = params.api;
    this.gridOptions.columnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }

  openAddEmployeeForm() {
    this.clientForm = { clientId: '', clientName: '' }; 
    this.isEditMode = false;
    this.isModalVisible = true;
    setTimeout(() => {
      document.querySelector('.modal-overlay')?.classList.add('open');
    }, 10);
  }

  openEditEmployeeForm() {
    if (this.gridOptions.api) {
      const selectedNodes = this.gridOptions.api.getSelectedNodes();
      setTimeout(() => {
        document.querySelector('.modal-overlay')?.classList.add('open');
      }, 10);
      if (selectedNodes.length > 0) {
        const selectedNode = selectedNodes[0];
        this.clientForm = { ...selectedNode.data }; 
        this.isEditMode = true;
        this.isModalVisible = true;
      } else {
        alert('Please select a client to edit');
      }
    }
  }
  onSubmitEmployeeForm() {
    if (this.gridOptions.api) {
      const selectedNodes = this.gridOptions.api.getSelectedNodes();
      if (this.isEditMode && selectedNodes.length > 0) {
        const selectedNode = selectedNodes[0];
        selectedNode.setData(this.clientForm); 
      } else if (!this.isEditMode) {
        this.rowData.push(this.employeeForm);
        this.gridOptions.api.setRowData(this.rowData);
      }
    }

    this.closeModal(); 
  }

  closeModal() {
    document.querySelector('.modal-overlay')?.classList.remove('open');
  setTimeout(() => {
    this.isModalVisible = false;
  }, 300);
  }
}
