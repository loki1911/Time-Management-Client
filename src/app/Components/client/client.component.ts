import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { TimeSubmitingService } from 'src/app/Services/timesubmitting.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  constructor(private router: Router, private timeEntryService: TimeSubmitingService) {}

  rowData: any[] = [];
  isModalVisible = false;
  isEditMode = false; 
  clientForm = { clientId: '', clientName: '' };

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

  ngOnInit(): void {
    this.ClientsData();
  }

  ClientsData() {
    this.timeEntryService.getClientData().subscribe((data: any[]) => {
      this.rowData = data;
      console.log(this.rowData);
      if (this.gridOptions.api) {
        this.gridOptions.api.setRowData(this.rowData);
      }
    });
  }

  navigatetoMyTime() {
    this.router.navigate(['admin']);
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
      if (selectedNodes.length > 0) {
        const selectedNode = selectedNodes[0];
        this.clientForm = { ...selectedNode.data }; 
        this.isEditMode = true;
        this.isModalVisible = true;
        setTimeout(() => {
          document.querySelector('.modal-overlay')?.classList.add('open');
        }, 10);
      } else {
        alert('Please select a client to edit');
      }
    }
  }

  onSubmitClientForm() {
    if (this.isEditMode) {
      this.timeEntryService.updateClient(this.clientForm.clientId, this.clientForm.clientName).subscribe(
        (response) => {
          console.log('Client updated successfully:', response);
          if (this.gridOptions.api) {
            const selectedNodes = this.gridOptions.api.getSelectedNodes();
            if (selectedNodes.length > 0) {
              const selectedNode = selectedNodes[0];
              selectedNode.setData(this.clientForm);
            }
          }
          this.closeModal();
        },
        (error) => {
          console.error('Error updating client:', error);
        }
      );
    } else {
      this.timeEntryService.addClient(this.clientForm.clientName).subscribe(
        (response) => {
          console.log('Client added successfully:', response);
          const newClient = { clientId: response.clientId, clientName: response.clientName }; 
          this.rowData.push(newClient);
          if (this.gridOptions.api) {
            this.gridOptions.api.setRowData(this.rowData);
          }
          this.closeModal();
        },
        (error) => {
          console.error('Error adding client:', error);
        }
      );
    }
  }

  closeModal() {
    document.querySelector('.modal-overlay')?.classList.remove('open');
    setTimeout(() => {
      this.isModalVisible = false;
    }, 300);
  }
}
