import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Department, EmployeeService, Role } from 'src/app/Services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private fb: FormBuilder  
  ) {}

  departments: Department[] = [];
  roles: Role[] = [];
  gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 10,
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
  };

  employeeForm!: FormGroup;

  columnDefs = [
    { headerCheckboxSelection: true, checkboxSelection: true, width: 50 },
    { headerName: 'Employee Email', field: 'employeeEmailId', sortable: true, filter: true },
    { headerName: 'Employee Name', field: 'employeeName', sortable: true, filter: true },
    { headerName: 'Designation', field: 'designation', sortable: true, filter: true },
    { headerName: 'Department', field: 'departmentName', sortable: true, filter: true },
    { headerName: 'Role', field: 'roleName', sortable: true, filter: true },
  ];

  rowData: any[] = []; 
  isModalVisible = false;
  isEditMode = false;

  ngOnInit() {
    this.initializeForm();
    this.fetchEmployees();
    this.loadDepartments();
    this.loadRoles();
  }

  initializeForm() {
    this.employeeForm = this.fb.group({
      employeeId : Number,
      emailId: ['', [Validators.required, Validators.email]], 
      employeeName: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required], 
      role: ['', Validators.required],  
     
    });
  }

  loadDepartments() {
    this.employeeService.getDepartmentData().subscribe(
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



  loadRoles() {
    this.employeeService.getRoleData().subscribe(
      (data) => {
        console.log('Data received for roles:', data);
        this.roles = data.map((role: any) => ({
          RoleId: role.roleId,
          RoleName: role.roleName,
        }));
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  onRoleSelected(event: any) {
    if (event) {
      const selectedRole = this.roles.find((role) => role.RoleId === event);
      this.employeeForm.patchValue({ role: selectedRole?.RoleName || '' });
    } else {
      this.employeeForm.patchValue({ role: '' });
    }
  }

  fetchEmployees() {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.rowData = data;
        console.log(this.rowData);

        if (this.gridOptions.api) {
          this.gridOptions.api.setRowData(this.rowData);
        }
      },
      (error) => {
        console.error('Error fetching employee data:', error);
      }
    );
  }

  openAddEmployeeForm() {
    this.employeeForm.reset();
    this.isEditMode = false;
    this.isModalVisible = true;
    setTimeout(() => {
      document.querySelector('.modal-overlay')?.classList.add('open');
    }, 10);
  }
employeeId :any;
  openEditEmployeeForm() {
    if (this.gridOptions.api) {
      const selectedNodes = this.gridOptions.api.getSelectedNodes();
      if (selectedNodes.length > 0) {
        const selectedNode = selectedNodes[0];
        this.employeeForm.patchValue({

          employeeID : selectedNode.data.employeeID,
          emailId: selectedNode.data.employeeEmailId,
          employeeName: selectedNode.data.employeeName,
          designation: selectedNode.data.designation,
          department: selectedNode.data.departmentName,
          role: selectedNode.data.roleName,
        });
        this.employeeId = selectedNodes[0].data.employeeID
        console.log(this.employeeForm.value)
        this.isEditMode = true;
        this.isModalVisible = true;
        setTimeout(() => {
          document.querySelector('.modal-overlay')?.classList.add('open');
        }, 10);
      } else {
        alert('Please select an employee to edit');
      }
    }
  }

  onSubmitEmployeeForm() {
    const employeeData = {
      EmployeeID : this.employeeId,
      EmployeeEmailId: this.employeeForm.value.emailId,
      EmployeeName: this.employeeForm.value.employeeName,
      EmployeeDesignation: this.employeeForm.value.designation,
      DepartmentID: this.employeeForm.value.department, 
      RoleId: this.employeeForm.value.role, 
    };
    console.log(employeeData);

    if (this.isEditMode) {
      this.employeeService.updateEmployee(employeeData).subscribe(
        (response) => {
          console.log('Employee updated successfully:', response);
          this.fetchEmployees();
          this.closeModal();
        },
        (error) => {
          console.error('Error updating employee:', error);
        }
      );
    } else {
      this.employeeService.createEmployee(employeeData).subscribe(
        (response) => {
          console.log('Employee created successfully:', response);
          this.fetchEmployees();
          this.closeModal();
        },
        (error) => {
          console.error('Error creating employee:', error);
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
}
