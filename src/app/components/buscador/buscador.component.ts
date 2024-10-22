import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ExperienciaService } from '../../services/experiencia.service';
import { User } from '../../models/user.model';
import { Experiencia } from '../../models/experiencia.model';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experiencias-filtro',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class BuscadorExperienciasComponent implements OnInit {
  usuarios: User[] = [];
  experiencias: Experiencia[] = [];
  usuarioElegido: string = '';
  mensajeError: string = '';

  constructor(
    private userService: UserService,
    private experienciaService: ExperienciaService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  private obtenerUsuarios(): void {
    this.userService.getUsers().subscribe({
      next: (usuarios) => this.usuariosCargados(usuarios),
      error: (error) => this.mostrarError('No se pudieron cargar los usuarios.', error)
    });
  }

  private usuariosCargados(usuarios: User[]): void {
    this.usuarios = usuarios;
    console.log('Usuarios disponibles:', usuarios);
  }

  private mostrarError(mensaje: string, error: any): void {
    this.mensajeError = mensaje;
    console.error(mensaje, error);
  }

  filtrarExperienciasPorUsuario(): void {
    if (this.usuarioElegidoValido()) {
      this.experienciaService.getExperiencias().subscribe({
        next: (experiencias) => this.experienciasFiltradas(experiencias),
        error: (error) => this.mostrarError('Error al obtener experiencias.', error)
      });
    }
  }

  private usuarioElegidoValido(): boolean {
    if (!this.usuarioElegido) {
      this.mensajeError = 'Por favor, selecciona un usuario válido.';
      return false;
    }
    return true;
  }

  private experienciasFiltradas(experiencias: Experiencia[]): void {
    this.experiencias = experiencias.filter(experiencia => experiencia.owner === this.usuarioElegido);
    console.log(`Experiencias para el usuario ${this.usuarioElegido}:`, this.experiencias);
  }
}
