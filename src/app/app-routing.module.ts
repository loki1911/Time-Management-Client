import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeChartsComponent } from './Components/time-charts/time-charts.component';
import { MyTimeComponent } from './Components/my-time/my-time.component';
import { ClientComponent } from './Components/client/client.component';
import { EmployeesComponent } from './Components/employees/employees.component';
import { AdminTimeComponent } from './Components/admin-time/admin-time.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuard } from './auth.guard';
import { ProjectComponent } from './Components/project/project.component';
import { UserTimeChartsComponent } from './Components/user-time-charts/user-time-charts.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path: 'TimeCharts',component:TimeChartsComponent, canActivate: [AuthGuard] },
  {path:'my-time',component:MyTimeComponent},
  {path:'clients',component:ClientComponent},
  {path:'projects',component:ProjectComponent},
  {path:'employees',component:EmployeesComponent},
  {path:'admin',component:AdminTimeComponent},
  {path:'user-timecharts',component:UserTimeChartsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
