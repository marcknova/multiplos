import { ResultadoService } from 'src/app/services/resultado.service';
import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/Result';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  cantidad: number;
  cantidadIncorrecta: boolean;
  color: string;
  loading : boolean;
  menor : number;
  result: any[] = [];

  constructor(private _resultado: ResultadoService,
              private toastr: ToastrService) { 
    this.cantidad = 0;
    this.menor = 0;
    this.cantidadIncorrecta = false;
    this.color = '';
    this.loading = false;
  }

  ngOnInit(): void {}

  //Buscamos el multiplo del numero que se ingresa si no conincide en los 3 casos
  //incluye solo un texto que dira sin multiplos
  buscarMultiplo (valor: number) {
    if(valor % 3 == 0){
      this.result.push(3);
    } 
    if(valor % 5 == 0){
      this.result.push(5);
    } 
    if(valor % 7 == 0){
      this.result.push(7);
    } else { 
      if(valor % 3 != 0 && valor % 5 != 0 && valor % 7 != 0) {
        this.result.push('Sin multiplos');
      }
    } 
  }

  //Mediante Math.min busco el numero menor de la lista y hago una validacion si el numero es igual a uno de los 3 casos asigno un cstring que tiene el color que usare en el style de la lista
  agregarColor(menor: any) {
    if(menor === 3 ) {
      this.color = 'green';
    } 
    if(menor === 5 ) {
      this.color = 'red';
    }
    if(menor === 7 ) {
      this.color = 'blue';
    } else {
      if(menor != 3 && menor != 5 && menor != 7) {
        this.color = 'black';
      }
    } 
    
  }

  //metodo que ejecuta en caso de que el numero sea mayor a 0 cada uno de los metodos y validaciones, use un modelo en el cual el objeto tendra el valor inicial, los multiplos y el color que se le asigno, use toastr que es una libreria que manda mensajes dependiendo el caso son ventanas que muestran el texto que se les asigna
  agregar() {
      if(this.cantidad > 0 ) {
        this.cantidadIncorrecta = false;
        this.buscarMultiplo(this.cantidad);
        this.menor = Math.min(...this.result);
        this.agregarColor(this.menor);
        this.loading = true;
        const DATA : Result = {
          numero: this.cantidad,
          resultado: this.result,
          color: this.color,
        }
        this._resultado.guardarMultiplos(DATA).then(() => {
          this.loading = false;
          this.toastr.success('La Operacion fue Realizada con Exito!', 'Operacion Registrada')
        }, error => {
          this.loading = false;
          this.toastr.error('Ups... Ocurrrio Un Error', 'Error');
          console.log(error);
        })
        this.result= [];
      } else {
        this.cantidadIncorrecta = true;
      }
  }
}


// const firebaseConfig = {
//   apiKey: "AIzaSyBcdzhwmqdyNVWGAxxaHauZ979BuHljNLw",
//   authDomain: "numerosmultiplos.firebaseapp.com",
//   projectId: "numerosmultiplos",
//   storageBucket: "numerosmultiplos.appspot.com",
//   messagingSenderId: "245450560596",
//   appId: "1:245450560596:web:fa85b421fc5e45882909c1"
// };