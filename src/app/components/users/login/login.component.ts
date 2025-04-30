import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  formulario: FormGroup;
  service = inject(UsersService)
  constructor(
    private router: Router
  ){
   this.formulario = new FormGroup({
     email: new FormControl(),
     password: new FormControl()
   })
  }
 
  public onSubmit() {
    if (this.formulario.valid) {
      this.service.login(this.formulario.value).subscribe({
        next: (response) => {
          const token = response.token;
          const idUser = response.userId;
          if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('userId', idUser);
            this.router.navigate(['dashboard']); 
            alert('Inicio Exitoso');

          }
        },
        error: (err) => {
          console.error('Login error', err);
          
        }
      });
    }
  }
 }
