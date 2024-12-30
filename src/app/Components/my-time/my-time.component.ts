import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client, Project, Task, TimeSubmitingService } from 'src/app/Services/timesubmitting.service';

@Component({
  selector: 'app-my-time',
  templateUrl: './my-time.component.html',
  styleUrls: ['./my-time.component.css']
})
export class MyTimeComponent implements OnInit {
 myTimeForm: FormGroup;
  projects: Project[] = [];
  tasks: Task[] = [];
  client: Client | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private timeEntryService: TimeSubmitingService
  ) {
    this.myTimeForm = this.fb.group({
      projectName: ['', Validators.required],
      clientName: [{ value: '', disabled: true }],
      taskName: ['', Validators.required],
      billingType: ['', Validators.required],
      workDate: ['', Validators.required],
      timeWorked: ['', [Validators.required]],
      description: ['', Validators.required],
      clientId: Number,

    });
  }

  ngOnInit(): void {
    this.loadProjects();

    this.myTimeForm.get('projectName')?.valueChanges.subscribe((selectedProjectId) => {
      this.setTaskNames(selectedProjectId);
      this.onProjectSelect(selectedProjectId);
    });
  }
  getBills(projectId: string){
   if(projectId){
    this.timeEntryService.GetBillTypesByProjectId(projectId).subscribe()
   }

  }

  

  loadProjects(): void {
    this.timeEntryService.getProjects().subscribe({
      next: (data: Project[]) => {
        this.projects = data;
        console.log('Projects loaded:', data);
      },
      error: (error) => {
        console.error('Error fetching projects:', error);
      },
    });
  }

  onProjectSelect(projectId: string): void {
    if (projectId) {
      this.timeEntryService.getClientByProjectId(projectId).subscribe({
        next: (clientData: Client) => {
          this.client = clientData;
          console.log('Client data:', this.client);

          this.myTimeForm.patchValue({
            clientName: clientData.clientName,
            clientId : clientData.clientId
          });
        },
        error: (error) => {
          console.error('Error fetching client data:', error);
        },
      });
    }
  }

  setTaskNames(selectedProjectId: any): void {
    const projectId = selectedProjectId ? String(selectedProjectId) : '';
    console.log(projectId);

    if (projectId) {
      this.timeEntryService.getTasksByProjectId(projectId).subscribe({
        next: (data: Task[]) => {
          console.log('Fetched tasks:', data);
          this.tasks = data;
        },
        error: (error) => {
          console.error('Error fetching tasks:', error);
          this.tasks = [];
        },
      });
    } else {
      this.tasks = [];
      this.myTimeForm.get('taskName')?.reset();
    }
  }

  onSubmit(): void {
    if (this.myTimeForm.valid) {
      const formData = this.myTimeForm.getRawValue();
  console.log(formData);
  
  
      this.timeEntryService.submitFormData(formData).subscribe({
        next: (response) => {
          console.log('Data submitted successfully:', response);
  
          this.myTimeForm.reset();
          this.myTimeForm.get('clientName')?.setValue('');
        },
        error: (error) => {
          console.error('Error submitting form:', error);
        },
      });
    }
  }
  

  navigatetoMyTime(): void {
    this.router.navigate(['my-time']);
  }

  navigatetoHome(): void {
    this.router.navigate(['TimeCharts']);
  }

  navigatetoClient(): void {
    this.router.navigate(['clients']);
  }

  navigatetoProject(): void {
    this.router.navigate(['projects']);
  }

  navigatetoEmployee(): void {
    this.router.navigate(['employees']);
  }
}
