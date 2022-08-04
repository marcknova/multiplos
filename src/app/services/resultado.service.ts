import { Result } from './../models/Result';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {

  constructor(private firebase: AngularFirestore){}

  guardarMultiplos(resultado: Result): Promise<any> {
    return this.firebase.collection('resultado').add(resultado);
  }

  obtenerResultador(): Observable<any> {
    return this.firebase.collection('resultado').snapshotChanges();
  }

  eliminarResultado(id: string): Promise<any> {
    return this.firebase.collection('resultado').doc(id).delete();
  }
}
