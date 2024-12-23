import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project, TimeSubmitingService } from 'src/app/Services/timesubmitting.service';
@Component({
  selector: 'app-admin-time',
  templateUrl: './admin-time.component.html',
  styleUrls: ['./admin-time.component.css'],
})
export class AdminTimeComponent implements OnInit {
  myTimeForm: FormGroup;
  projects: Project[] = [];
  tasks: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private timeEntryService: TimeSubmitingService
  ) {
    this.myTimeForm = this.fb.group({
      projectName: ['', Validators.required],
      taskName: ['', Validators.required],
      clientName: [{ value: '', disabled: true }],
      billingType: ['', Validators.required],
      workDate: ['', Validators.required],
      timeWorked: ['', [Validators.required]],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.timeEntryService.getProjects().subscribe((data) => {
      this.projects = data; 
    });
  }

  setTaskNames(): void {
    const selectedProjectId = this.myTimeForm.get('projectName')?.value; 
    if (selectedProjectId) {
      this.timeEntryService.getTasksByProjectId(selectedProjectId).subscribe((data) => {
        this.tasks = data;
        this.myTimeForm.get('taskName')?.reset(); 
      });
    }
  }

  onSubmit(): void {
    if (this.myTimeForm.valid) {
      const formData = this.myTimeForm.getRawValue();
      this.timeEntryService.submitFormData(formData).subscribe(
        (response) => {
          console.log('Data submitted successfully:', response);
        },
        (error) => {
          console.error('Error submitting form:', error);
        }
      );
    }
  }

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
}
