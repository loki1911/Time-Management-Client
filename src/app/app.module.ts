import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminTimeComponent } from './Components/admin-time/admin-time.component';
import { ClientComponent } from './Components/client/client.component';
import { EmployeesComponent } from './Components/employees/employees.component';
import { TimeChartsComponent } from './Components/time-charts/time-charts.component';
import { MyTimeComponent } from './Components/my-time/my-time.component';
import { ProjectComponent } from './Components/project/project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AdminTimeComponent,
    ClientComponent,
    EmployeesComponent,
    TimeChartsComponent,
    MyTimeComponent,
    ProjectComponent,
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    HttpClientModule,
    BrowserAnimationsModule, 
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
