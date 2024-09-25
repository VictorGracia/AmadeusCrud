import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CrudService } from './services/crud.service';
import { Cliente } from './models/cliente.model';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, CurrencyPipe],
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  clientes: Cliente[] = [];
  newCliente: Cliente = {
    fechaNacimiento: new Date(),
    saldo: 0,
    esActivo: true
  };
  editingCliente: Cliente | null = null;

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.crudService.getClientes().subscribe(
      data => this.clientes = data,
      error => console.error('Error fetching clientes', error)
    );
  }

  addCliente(): void {
    this.crudService.createCliente(this.newCliente).subscribe(
      () => {
        this.loadClientes();
        this.newCliente = {
          fechaNacimiento: new Date(),
          saldo: 0,
          esActivo: true
        };
      },
      error => console.error('Error adding cliente', error)
    );
  }

  editCliente(cliente: Cliente): void {
    this.editingCliente = { ...cliente };
  }

  updateCliente(): void {
    if (this.editingCliente && this.editingCliente.id) {
      this.crudService.updateCliente(this.editingCliente.id, this.editingCliente).subscribe(
        () => {
          this.loadClientes();
          this.editingCliente = null;
        },
        error => console.error('Error updating cliente', error)
      );
    }
  }

  deleteCliente(id: number | undefined): void {
    if (id !== undefined) {
      this.crudService.deleteCliente(id).subscribe(
        () => this.loadClientes(),
        error => console.error('Error deleting cliente', error)
      );
    } else {
      console.error('Cannot delete cliente with undefined id');
    }
  }

  cancelEdit(): void {
    this.editingCliente = null;
  }
}