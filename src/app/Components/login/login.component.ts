import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;  

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      

      const loginRequest = {
        email: this.loginForm.value.email, 
        password: this.loginForm.value.password
      };
      localStorage.setItem('Email',loginRequest.email)

      this.authService.login(loginRequest.email, loginRequest.password).subscribe(
        response => {
           
          console.log('Login successful');
          localStorage.setItem('jwtToken', response.token.jwtToken);
          localStorage.setItem('role', response.token.roleName); 
          console.log(response);
          
          // if (this.selectedRole === 'User') {
          //   this.router.navigate(['my-time']);
          // } else if (this.selectedRole === 'Admin') {
          //   this.router.navigate(['admin']);
          // }


         // if(response.token.roleName === 'Admin')
          this.router.navigate(['TimeCharts']);
        //  else          
         // this.router.navigate(['user-timecharts']);
        },
        error => {
        
          console.error('Login failed', error);
          alert('Login failed: ' + (error.error.message || 'An error occurred'));
        }
      );
    }
  }
  signInWithMicrosoft(){

  }
//   signInWithMicrosoft() {
//     this.msalService.loginPopup().subscribe({
//       next: (response) => {
//         console.log('Microsoft login successful', response);
//         localStorage.setItem('msalToken', response.accessToken);
//         this.router.navigate(['/TimeCharts']);  
//       },
//       error: (error) => {
//         console.error('Microsoft login error', error);
//         alert('Microsoft login failed');
//       }
//     });
// }
}

