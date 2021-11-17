import { Component, OnInit } from '@angular/core';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import {switchMap} from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  publishers=[
    {
      id:'sd574',
      name:'dc-comics'
    },
    {
      id:'sdd74',
      name:'marvel'
    }
  ];

  heroe: Hero = {
    superhero: '',
    alter_ego: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
    characters:''
  }
  constructor(
      private heroeService: HeroesService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private snackBar:   MatSnackBar,
      public dialog: MatDialog) { }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(({id}) => {
      
    //   this.heroeService.getHeroById(id).subscribe(heroe => {
    //     console.log(heroe);
    //     this.heroe = heroe;
    //   })
    // })
    if(!this.router.url.includes('editar')){
      return
    }
    this.activatedRoute.params
      .pipe(switchMap(({id})=>this.heroeService.getHeroById(id)))
      .subscribe(heroe => this.heroe = heroe)
  }

  guardar(){

    if(this.heroe.superhero.trim().length === 0){
      return;
    } 

    if(this.heroe.id){
      //actualizar
      this.heroeService.updateHero(this.heroe)
        .subscribe(heroe => {
          console.log('Actualizando', heroe);
          this.mostrarSnackBar('Registro Actualizado');
        })
    }else{
      //crear
      this.heroeService.addHero(this.heroe)
      .subscribe(hero => {
        console.log(hero);
        this.router.navigate(['/heroes/editar',hero.id]);
        this.mostrarSnackBar('Registro agregado');
      })
    }
  }

  borrarHeroe(){
    const dialogRef = this.dialog.open(ConfirmarComponent,{
      width:'350px',
      data:{...this.heroe}
    });
    
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.heroeService.deleteHero(this.heroe.id!)
          .subscribe(resp => {
            console.log(resp);
            this.router.navigate(['/heroes']);
          })

      }
      
    })
  }

  mostrarSnackBar(mensaje: string){
    this.snackBar.open(mensaje,'Cerrar',{
      duration:3000,
    });
  }

}
