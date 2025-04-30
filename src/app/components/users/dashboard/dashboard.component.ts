import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  tareas: any[] = [];
  tareasFiltradas: any[] = [];
  filtroEstado: string = '';
  mostrarFormulario = false;
  tareaSeleccionada: any | null = null;

  formulario = {
    title: '',
    description: '',
    status: 'pending' as any['status'],
    user_id: 0
  };

  constructor(private taskService: UsersService) { }

  ngOnInit() {
    this.cargarTareas();
  }

  public cargarTareas() {
    this.taskService.getTasks().subscribe((data: any) => {
      this.tareas = data;
      this.filtrarTareas();
    });
  }

  public filtrarTareas() {
    this.tareasFiltradas = this.filtroEstado
      ? this.tareas.filter(t => t.status === this.filtroEstado)
      : this.tareas;
  }

  public abrirFormulario(task?: any) {
    this.mostrarFormulario = true;
    this.tareaSeleccionada = task || null;
    if (task) {
      this.formulario = { ...task };
    } else {
      this.formulario = { title: '', description: '', status: 'pending', user_id: 0 };
    }
  }

  public cerrarFormulario() {
    this.mostrarFormulario = false;
    this.tareaSeleccionada = null;
  }

  public guardarTarea() {
    const userId = localStorage.getItem('userId');

    if (this.tareaSeleccionada) {
      this.taskService.updateTask(this.tareaSeleccionada.id, this.formulario).subscribe(() => {
        alert('Tarea actualizada exitosamente');
        this.cargarTareas();
        this.cerrarFormulario();
      });
    } else {
      if (userId) {
        this.formulario.user_id = Number(userId);
      }
      this.taskService.createTask(this.formulario).subscribe(() => {
        alert('Tarea guardada exitosamente');

        this.cargarTareas();
        this.cerrarFormulario();
      });
    }
  }

  public editarTarea(task: any) {
    this.abrirFormulario(task);
  }

  public eliminarTarea(id: string) {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        alert('Tarea eliminada exitosamente');
        this.cargarTareas();
      });
    }
  }
}