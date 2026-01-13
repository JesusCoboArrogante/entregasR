import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

type Producto = 'Pistola' | 'Baget';

interface Item {
  producto: string;
  precioUnit: number;
  cantidad: number;
  total: number;
  checked: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('JesusCobo_Panaderica');

  readonly pan: Producto[] = ['Pistola', 'Baget'];
  readonly precios: number[] = [0.40, 0.50];

  items: Item[] = [];
  superTotal = 0;

  form = new FormGroup({
    producto: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    cantidad: new FormControl<number>(1, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    precio: new FormControl<number>(0, { nonNullable: true }),
  });

  precioPan() {
    const producto = this.form.value.producto ?? '';
    const cantidad = Number(this.form.value.cantidad ?? 0);

    if (!producto || cantidad <= 0) {
      this.form.patchValue({ precio: 0 });
      return;
    }

    const idx = this.pan.indexOf(producto as Producto);
    if (idx === -1) {
      this.form.patchValue({ precio: 0 });
      return;
    }

    const precioFinal = cantidad * this.precios[idx];
    this.form.patchValue({ precio: Number(precioFinal.toFixed(2)) });
  }

  agregarProducto() {
    const producto = (this.form.value.producto ?? '').trim();
    const cantidad = Number(this.form.value.cantidad ?? 0);
    const total = Number(this.form.value.precio ?? 0);

    if (!producto || cantidad <= 0 || total <= 0) return;

    const precioUnit = total / cantidad;

    const existente = this.items.find(
      it =>
        it.producto === producto &&
        it.precioUnit.toFixed(2) === precioUnit.toFixed(2)
    );

    if (existente) {
      existente.cantidad += cantidad;
      existente.total = Number((existente.total + total).toFixed(2));
    } else {
      this.items.push({
        producto,
        precioUnit: Number(precioUnit.toFixed(2)),
        cantidad,
        total: Number(total.toFixed(2)),
        checked: false,
      });
    }

    this.recalcularTotal();
    this.reestablecer();
  }

  reestablecer() {
    this.form.reset({ producto: '', cantidad: 1, precio: 0 });
  }

  borrarSeleccionados() {
    this.items = this.items.filter(it => !it.checked);
    this.recalcularTotal();
  }

  generarTicket() {
    let ticket = '====== Horno de Mordor ======\n';
    ticket += new Date().toLocaleString() + '\n-----------------------------\n';

    for (const it of this.items) {
      ticket += `${it.producto}   x${it.cantidad}  ${it.precioUnit.toFixed(
        2
      )}€ = ${it.total.toFixed(2)}€\n`;
    }

    ticket += '-----------------------------\n';
    ticket += `TOTAL: ${this.superTotal.toFixed(2)}€\n`;
    ticket += '=============================';

    alert(ticket);
  }

  private recalcularTotal() {
    this.superTotal = Number(
      this.items.reduce((acc, it) => acc + it.total, 0).toFixed(2)
    );
  }
}
