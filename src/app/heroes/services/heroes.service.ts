import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environments } from '../../../environments/environments';
import { Hero } from '../interfaces/hero.interface';

@Injectable({providedIn: 'root'})
export class HeroesService {

    private baseUrl:string = environments.baseUrl;

    constructor(private http: HttpClient) { }

    getHeroes():Observable<Hero[]>{
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
    }
 
    getHeroById(id:string):Observable<Hero|undefined>{
        return this.http.get<Hero>(`${ this.baseUrl }/heroes/${id}`)
        .pipe(
            catchError( error => of(undefined) )
        )        
    }


    getSuggestions(query: string): Observable<Hero[]> {
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`).pipe(
            map(heroes =>
                heroes.filter(hero => 
                    hero.superhero.toLowerCase().includes(query.toLowerCase())
                )
            )
        );
    }

    addHero(hero:Hero):Observable<Hero>{
        return this.http.post<Hero>(`${ this.baseUrl }/heroes`,hero);
    }

    updateHero(hero:Hero):Observable<Hero>{
        if( !hero.id ) throw Error('hero id is required');
        
        return this.http.patch<Hero>(`${ this.baseUrl }/heroes/${hero.id}`,hero);
    }

    deleteHeroById(id :string):Observable<boolean>{
        
        return this.http.delete(`${ this.baseUrl }/heroes/${id}`)
        .pipe(
            map( resp => true ),
            catchError(error => of(false) ),
        );
    }
    
}