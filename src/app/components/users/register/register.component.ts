
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

 formulario: FormGroup;
 service = inject(UsersService)
 constructor(){
  this.formulario = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  })
 }

 async onSubmit(){
  const response = await this.service.register(this.formulario.value);
  alert('Usuario creado exitosamente');

  
 }
}
