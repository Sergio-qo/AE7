import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';

import { ITecnologia } from '../interfaces';
import { IInmobiliaria } from '../interfaces';
import { IHogar } from '../interfaces';
import { IMotor } from '../interfaces';
import { IKey } from '../interfaces';
import { IProducto } from '../interfaces';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

  productos: (ITecnologia & IInmobiliaria & IHogar & IMotor & IKey)[] = [];
  uid:string = "";

  constructor(private _toastController: ToastController, private _usuariosService:UsuarioService, private _productoService: ProductoService, private _activatedRoute: ActivatedRoute) { }

  async presentToast(msg){
    const toast = await this._toastController.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }

  meGusta(item) {
    this._productoService.meGusta(item, this.uid);
    this.presentToast("Te gusta");
  }

  yaNoMeGusta(item){
    this._productoService.yaNoMeGusta(item, this.uid);
    this.presentToast("Ya no te gusta");
  }

  ngOnInit() {
    this.uid = this._activatedRoute.snapshot.paramMap.get("id");
    //this.productos = this._productoService.getProductos();
    let ref = this._productoService.getProductos();

    ref.once("value", snapshot => {
      snapshot.forEach(child => {
        //console.log(child.val());
        this.productos.push(child.val());
        this.productos[this.productos.length - 1].key = child.key;


        /*let refFav = this._productoService.getFavorito(this.productos[this.productos.length - 1].uid);
        refu.once("value", snapshot=>{
          console.log(snapshot.child("prodsLike").val());
        });*/

        /*if( == this.uid){
          this.productos[this.productos.length - 1].megusta = true;
        }*/

      });
    });
  }

}
