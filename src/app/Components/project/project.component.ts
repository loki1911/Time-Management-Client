import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  constructor(private router: Router) {}

  navigatetoMyTime() {
    this.router.navigate(['my-time']);
  }

  navigatetoHome() {
    this.router.navigate(['TimeCharts']);
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

  gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 10,
    rowSelection: 'multiple',
    suppressRowClickSelection: true
  };

  projectForm = { projectName: '', clientId: '', projectDepartment: '', projectManager: '', taskName: '' };

  columnDefs = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 50
    },
    { headerName: 'Project Name', field: 'projectName', sortable: true, filter: true },
    { headerName: 'Client ID', field: 'clientId', sortable: true, filter: true },
    { headerName: 'Project Department', field: 'projectDepartment', sortable: true, filter: true },
    { headerName: 'Project Manager', field: 'projectManager', sortable: true, filter: true },
    { headerName: 'Task Name', field: 'taskName', sortable: true, filter: true }
  ];

  rowData = [
    { projectName: 'BHP Project', clientId: '1', projectDepartment: 'Development', projectManager: 'RamaKrishna', taskName: 'Testing' },
    { projectName: 'DXC Project', clientId: '2', projectDepartment: 'Database', projectManager: 'Lohitha', taskName: 'Testing' },
    { projectName: 'Nokia Project', clientId: '3', projectDepartment: 'Engineering Design', projectManager: 'Srinath', taskName: 'Testing' },
    { projectName: 'Vodafone Project', clientId: '4', projectDepartment: 'Quality Assurance', projectManager: 'Trainee', taskName: 'Testing' },
    { projectName: 'Bosch Project', clientId: '5', projectDepartment: 'Development', projectManager: 'RamaKrishna', taskName: 'Testing' }
  ];

  isModalVisible = false;
  isEditMode = false;

  onGridReady(params: any) {
    this.gridOptions.api = params.api;
    this.gridOptions.columnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }

  openAddProjectForm() {
    this.projectForm = { projectName: '', clientId: '', projectDepartment: '', projectManager: '', taskName: '' };
    this.isEditMode = false;
    this.isModalVisible = true;
    setTimeout(() => {
      document.querySelector('.modal-overlay')?.classList.add('open');
    }, 10);
  }

  openEditProjectForm() {
    if (this.gridOptions.api) {
      const selectedNodes = this.gridOptions.api.getSelectedNodes();
      if (selectedNodes.length > 0) {
        const selectedNode = selectedNodes[0];
        this.projectForm = { ...selectedNode.data };
        this.isEditMode = true;
        this.isModalVisible = true;
        setTimeout(() => {
          document.querySelector('.modal-overlay')?.classList.add('open');
        }, 10);
      } else {
        alert('Please select a project to edit');
      }
    }
  }

  onSubmitProjectForm() {
    if (this.gridOptions.api) {
      if (this.isEditMode) {
        const selectedNodes = this.gridOptions.api.getSelectedNodes();
        if (selectedNodes.length > 0) {
          const selectedNode = selectedNodes[0];
          selectedNode.setData(this.projectForm); 
        }
      } else {
        this.rowData.push({ ...this.projectForm });
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
