import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/heroes.interface';
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute,
    private heroService: HeroesService,
    private router: Router) { }

  hero!: Hero;

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(({id}) => {
    //   this.heroService.getHeroById(id).subscribe(hero => {
    //     console.log(hero);
    //     this.hero = hero;
    //   })
    // })

    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroService.getHeroById(id))
    )
    .subscribe((hero)=>this.hero = hero)
    
  }

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }

}
