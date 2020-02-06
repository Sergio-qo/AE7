import { Injectable } from '@angular/core';
import { ITecnologia } from '../interfaces';
import { IInmobiliaria } from '../interfaces';
import { IHogar } from '../interfaces';
import { IMotor } from '../interfaces';
import { IProducto } from '../interfaces';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()



export class ProductoService{

    /*productos: (ITecnologia | IInmobiliaria | IHogar | IMotor)[] = [
        {
          "id" : 1,
        "nombre" : "casa1",
        "descripcion" : "casa1",
        "categoria" : "hogar",
        "precio" : 500000
        },
    
        {
        "id" : 2,
        "nombre" : "casa1",
        "descripcion" : "casa1",
        "categoria" : "tecnologia",
        "estado":"Usado",
        "precio" : 500
        },
      ];

    getProductos():(ITecnologia | IInmobiliaria | IHogar | IMotor)[] {
        return this.productos;
    }

    getProductoById(id):(ITecnologia | IInmobiliaria | IHogar | IMotor) {
        
        let producto:(ITecnologia | IInmobiliaria | IHogar | IMotor) = null;
        
        this.productos.forEach(element => {
            if(element.id == id){
                producto = element;
            }
        });
        return producto;
    }*/

    constructor(private _db:AngularFireDatabase){}
key:string = "";
    setProducto(producto:(ITecnologia | IInmobiliaria | IHogar | IMotor)){
        let ref = this._db.database.ref("productos");
        ref.push(producto);
    }

    getProductos(){
        let ref = this._db.database.ref("productos");
        return ref;
    }

    //Funcion getProducto en producto.service.ts
    getProducto(key){
        let ref = this._db.database.ref("productos/" + key);
        return ref;
    }

    meGusta(item, uid) {
        let ref = this._db.database.ref("favoritos/" + uid);
        ref.push({"clave":item.key});
      }

    yaNoMeGusta(item, uid){
        let ref = this._db.database.ref("favoritos/" + uid);
        ref.once("value", snapshot=>{
            snapshot.forEach(child => {
                if(child.val().clave == item.key){
                    this.key = child.key;
                    console.log(child.key);
                    this._db.database.ref("favoritos/" + uid + "/" + this.key).remove();
                } 
            });
        });
    }

    getFavoritos(){
        let ref = this._db.database.ref("favoritos");
        return ref;
    }
}