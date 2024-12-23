import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-time',
  templateUrl: './my-time.component.html',
  styleUrls: ['./my-time.component.css']
})
export class MyTimeComponent implements OnInit {
  myTimeForm: FormGroup;
  sideNavOpen = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.myTimeForm = this.fb.group({
      projectName: ['', Validators.required],
      taskName: ['', Validators.required],
      clientName: [{ value: '', disabled: true }],
      billingType: ['', Validators.required],
      workDate: ['', Validators.required],
      timeWorked: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  toggleSideNav() {
    this.sideNavOpen = !this.sideNavOpen;
    const sideNav = document.getElementById('sideNav');
    const mainContent = document.querySelector('.main-content');
    
    if (this.sideNavOpen) {
      sideNav?.classList.add('open');
      mainContent?.classList.add('shifted');
    } else {
      sideNav?.classList.remove('open');
      mainContent?.classList.remove('shifted');
    }
  }

  navigatetoMyTime() {
    this.router.navigate(['my-time']);
    console.log('Navigated to My Time');
  }

  navigatetoHome(){
    this.router.navigate(['TimeCharts']);
  }

  // Method to set client name dynamically based on project selection
  // setClientName() {
  //   const projectName = this.myTimeForm.get('projectName')?.value;

  //   if (projectName) {
  //     this.timeEntryService.getClientName(projectName).subscribe(
  //       (response) => {
  //         if (response && response.clientName) {
  //           this.myTimeForm.get('clientName')?.setValue(response.clientName);
  //         } else {
  //           console.log('Client not found');
  //         }
  //       },
  //       (error) => {
  //         console.error('Error fetching client name:', error);
  //       }
  //     );
  //   }
  // }

  // Submit form data to the backend
  // onSubmit() {
  //   if (this.myTimeForm.valid) {
  //     console.log('Form submitted:', this.myTimeForm.value);

  //     // Send form data to backend
  //     this.timeEntryService.submitFormData(this.myTimeForm.value).subscribe(
  //       (response) => {
  //         console.log('Data submitted successfully:', response);
  //       },
  //       (error) => {
  //         console.error('Error submitting form:', error);
  //       }
  //     );
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }
}
