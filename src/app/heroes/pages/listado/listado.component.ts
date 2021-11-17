import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  constructor(private heroeService: HeroesService) { }

  heroes:Hero[] = [];
  ngOnInit(): void {
    this.heroeService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    })
  }

}
