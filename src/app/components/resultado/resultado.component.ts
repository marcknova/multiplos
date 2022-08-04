import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/Result';
import { ResultadoService } from 'src/app/services/resultado.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  listResultados: Result[] = [];
  menor : number;
  constructor(private _resultado: ResultadoService,
              private toastr: ToastrService) {
    this.menor = 0;
   }

  ngOnInit(): void {
    this.obtenerResultados();
  }
  
  obtenerResultados(){
    this._resultado.obtenerResultador().subscribe(data => {
      this.listResultados = [];
      data.forEach((element : any) => {
        this.listResultados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    });
  }

  eliminarResultado(id: any) {
    this._resultado.eliminarResultado(id).then(() => {
      this.toastr.error('El Resultado Fue Eliminado Con Exito!', 'Registro Eliminado');
    }, error => {
      this.toastr.error('Ups... ocurrio un error!', 'Error');
      console.log(error);
    })
  }

}
