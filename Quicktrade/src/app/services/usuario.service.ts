import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { IUsuario } from '../interfaces';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable()

export class UsuarioService {
  constructor(private _db: AngularFireDatabase) { }

  cantidad:number=0;

  getUsuario(uid) {
    let ref = this._db.database.ref("usuarios/" + uid);
    return ref;
  }

  cantidadMeGusta(uid){
    let ref = this._db.database.ref("favoritos/" + uid);
    ref.once("value", snapshot=>{
      this.cantidad = snapshot.numChildren();
    }
    );
    return this.cantidad;
  }

  getUsuarios() {
    let id = null;
    let ref = this._db.database.ref("usuarios");
    return ref;
    /*ref.orderByChild("usuarios").equalTo(nomusu);
    ref.once("value", snapshot=>{
        snapshot.forEach(child => {
          if(child.val().nombre = nomusu){
            id = child.val().id;
          }
      });
    });
    return id;*/
  }
}