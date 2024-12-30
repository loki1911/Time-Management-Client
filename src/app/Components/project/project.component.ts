import { FactoryTarget } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { ProjectService } from 'src/app/Services/project.service';
import { TimeSubmitingService } from 'src/app/Services/timesubmitting.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
 
  constructor(private router: Router, private projectService: ProjectService
    ,private timesubmittingService : TimeSubmitingService,
    private fb: FormBuilder 
  ) {

  }
  initializeForm() {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      clientId: ['', Validators.required],
      projectDepartment: ['', Validators.required],
      projectManager: ['', Validators.required],
      projectDescription: ['', Validators.required],
    });
     
   
  }
  
  managers: any[] = [];
  departments: any[] = [];
  clients: any[] = [];
  
  gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 10,
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
  };

  projectForm!: FormGroup; 

  columnDefs = [
    { headerCheckboxSelection: true, checkboxSelection: true, width: 50 },
    { headerName: 'Project Name', field: 'projectName', sortable: true, filter: true },
    { headerName: 'Client ID', field: 'clientId', sortable: true, filter: true },
    { headerName: 'Project Department', field: 'projectDepartment', sortable: true, filter: true },
    { headerName: 'Project Manager', field: 'projectManager', sortable: true, filter: true },
    { headerName: 'Project Description', field: 'projectDescription', sortable: true, filter: true },
  ];

  rowData: any[] = [];
   isModalVisible = false;
  isEditMode = false;


  ngOnInit() {
    this.initializeForm();
    this.loadProjects();
    this.loadClients();
    this.loadManagers();
    this.loadDepartments();
  }

  loadClients() {
    this.timesubmittingService.getClientData().subscribe(
      (data) => {
        this.clients = data.map((client: any) => ({
          clientId: client.clientId,
          clientName: client.clientName,
        }));
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
    );
  }
  
  loadManagers() {
    this.timesubmittingService.getManagerData().subscribe(
      (data) => {
        console.log('Data received for managers:', data);
        this.managers = data.map((manager: any) => ({
          ProjectManagerId: manager.projectManagerId,
          EmployeeName: manager.employeeName,
        }));
      },
      (error) => {
        console.error('Error fetching managers:', error);
      }
    );
  }
  loadDepartments() {
    this.timesubmittingService.getDepartmentData().subscribe(
      (data) => {
        console.log('Data received for departments:', data);
        this.departments = data.map((department: any) => ({
          DepartmentId: department.departmentId,
          DepartmentName: department.departmentName,
        }));
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }
  

  
  
  onManagerSelected(event: any) {
    if (event) {
      this.projectForm.controls['projectManager'].setValue(event);
    } else {
      this.projectForm.controls['projectManager'].setValue('');
    }
  }
  onDepartmentSelected(event: any) {
    if (event) {
      this.projectForm.controls['projectDepartment'].setValue(event);
    } else {
      this.projectForm.controls['projectDepartment'].setValue('');
    }
  }

  onClientSelected(event: any) {
    if (event) {
      this.projectForm.controls['clientId'].setValue(event);
    } else {
      this.projectForm.controls['clientId'].setValue('');
    }
  }


  loadProjects() {
    this.projectService.getProjects().subscribe(
      (data) => {
        this.rowData = data.map((project: any) => ({
          projectName: project.projectName,
          clientId: project.clientID,
          projectDepartment: project.departmentName || 'N/A',
          projectManager: project.projectManager || project.employeeName || 'Unassigned',
          projectDescription: project.projectDescription,
        }));

        console.log('Mapped rowData:', this.rowData);

        if (this.gridOptions.api) {
          this.gridOptions.api.setRowData(this.rowData);
        }
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
  

  projectId :any;
  openEditProjectForm() {
    if (this.gridOptions.api) {
      const selectedNodes = this.gridOptions.api.getSelectedNodes();
      if (selectedNodes.length > 0) {
        const selectedNode = selectedNodes[0];
        this.projectForm.patchValue({

          projectId : selectedNode.data.projectId,
          clientID: selectedNode.data.clientID,
          ProjectName : selectedNode.data.projectName,
          ProjectManager: selectedNode.data.ProjectManager,
          ProjectDepartment: selectedNode.data.projectDepartment,
          ProjectDescription: selectedNode.data.projectDescription,
        });
        console.log(this.projectForm);
        
        this.projectId = selectedNodes[0].data.employeeID
        console.log(this.projectForm.value)
        this.isEditMode = true;
        this.isModalVisible = true;
        setTimeout(() => {
          document.querySelector('.modal-overlay')?.classList.add('open');
        }, 10);
      } else {
        alert('Please select a project to edit.');
      }
    }
  }
  
  onSubmitProjectForm() {
    const project = {
      projectId : this.projectId,
      clientID: this.projectForm.value.clientId,
      departmentID: this.projectForm.value.projectDepartment,
      projectManagerID: this.projectForm.value.projectManager,
      projectDescription: this.projectForm.value.projectDescription,
      ProjectName : this.projectForm.value.projectName
    };
    console.log(project);
    
    if (this.isEditMode) {
      this.projectService.updateProject(project).subscribe(
        () => this.loadProjects(),
        (error) => console.error('Error updating project:', error)
      );
    } else {
      this.projectService.addProject(project).subscribe(
        () => this.loadProjects(),
        (error) => console.error('Error adding project:', error)
      );
    }
    this.closeModal();
  }


  openAddProjectForm() {
    this.projectForm.reset(); 
    this.isEditMode = false;
    this.isModalVisible = true;
    setTimeout(() => {
      document.querySelector('.modal-overlay')?.classList.add('open');
    }, 10);
  }

  onGridReady(params: any) {
    this.gridOptions.api = params.api;
    this.gridOptions.columnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }

  closeModal() {
     document.querySelector('.modal-overlay')?.classList.remove('open');
    setTimeout(() => {
      this.isModalVisible = false;
    }, 300);
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
}
