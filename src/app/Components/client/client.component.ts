import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
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

  columnDefs = [
    { 
      headerCheckboxSelection: true, 
      checkboxSelection: true, 
      width: 50 
    },
    { headerName: 'ClientId', field: 'clientId', sortable: true, filter: true },
    { headerName: 'Client Name', field: 'clientName', sortable: true, filter: true },
  ];

  rowData = [
    { clientId: '1', clientName: 'BHP' },
    { clientId: '2', clientName: 'Albemarle' },
    { clientId: '3', clientName: 'Bosch' },
    { clientId: '4', clientName: 'Nokia' },
  ];

  isModalVisible = false;
  isEditMode = false; 
  clientForm = { clientId: '', clientName: '' };

  onGridReady(params: any) {
    this.gridOptions.api = params.api;
    this.gridOptions.columnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }

  openAddClientForm() {
    this.clientForm = { clientId: '', clientName: '' }; 
    this.isEditMode = false;
    this.isModalVisible = true;
    setTimeout(() => {
      document.querySelector('.modal-overlay')?.classList.add('open');
    }, 10);
  }

  openEditClientForm() {
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

  onSubmitClientForm() {
    if (this.gridOptions.api) {
      const selectedNodes = this.gridOptions.api.getSelectedNodes();
      if (this.isEditMode && selectedNodes.length > 0) {
        const selectedNode = selectedNodes[0];
        selectedNode.setData(this.clientForm); 
      } else if (!this.isEditMode) {
        this.rowData.push(this.clientForm);
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
