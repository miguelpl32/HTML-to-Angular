import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos(): any {

    return new Promise((resolve, reject) => {

      this.http.get('https://angular-html-5f5be.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {

          this.productos = resp;
          this.cargando = false;
          resolve();
        });


    });
  }

  getProducto(id: string): any {
    return this.http.get(`https://angular-html-5f5be.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string): any {
    if (this.productos.length === 0) {
      this.cargarProductos().then(() => {

        this.filtrarProductos(termino);

      });
    } else {
      this.filtrarProductos(termino);
    }

  }

  private filtrarProductos(termino: string): any {
    this.productosFiltrado = [];
    termino = termino.toLowerCase();

    this.productos.forEach(prod => {

      const tituloLower = prod.titulo.toLowerCase();
      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);
      }

    });
  }
}
