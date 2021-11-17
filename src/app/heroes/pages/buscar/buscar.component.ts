import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Hero[] = [];
  heroeSeleccionado : Hero | undefined;

  constructor(private heroesService:HeroesService) { }

  ngOnInit(): void {
    
  }

  buscar(){
    this.heroesService.getSugerencias(this.termino)
    .subscribe(h=>this.heroes = h)
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent){
    
    if(!event.option.value){
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Hero= event.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroById(heroe.id!)
    .subscribe(heroe => this.heroeSeleccionado = heroe);
    
  }
}
