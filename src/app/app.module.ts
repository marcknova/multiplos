import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ResultadoComponent } from './components/resultado/resultado.component';
import { ResultadoService } from './services/resultado.service';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ResultadoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ToastrModule,
    ToastrModule.forRoot(),
  ],
  providers: [ResultadoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
