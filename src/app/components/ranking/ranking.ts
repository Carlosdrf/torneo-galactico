import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ICombats } from '../combats/combats';
import { NoDataFound } from '../../ui-components/no-data-found/no-data-found';
import { MatIcon } from '@angular/material/icon';
import { ISpecies } from '../species/species';
import { StorageService } from '../../service/storage';
import { isPlatformBrowser } from '@angular/common';

const COMBATS = 'combats';
const SPECIES = 'species';

export interface IRanking extends ISpecies {
  wins: number;
  losses: number;
}

@Component({
  selector: 'app-ranking',
  imports: [NoDataFound, MatIcon],
  templateUrl: './ranking.html',
  styleUrl: './ranking.css',
})
export class Ranking implements OnInit {
  combats: ICombats[] = [];
  species: ISpecies[] = [];
  ranking: IRanking[] = [];

  private storageService = inject(StorageService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const combats = this.storageService.getResources(COMBATS);
      if (combats) {
        this.combats = JSON.parse(combats) as ICombats[];
      }

      const species = this.storageService.getResources(SPECIES);
      if (species) {
        this.species = JSON.parse(species) as ISpecies[];
      }

      this.generateRanking();
    }
  }

  generateRanking() {
    const map = new Map<string, IRanking>();

    this.species.forEach((s) => {
      map.set(s.id.toString(), {
        ...s,
        wins: 0,
        losses: 0,
      });
    });

    this.combats.forEach((c) => {
      const winner = map.get(c.winner.id.toString());
      const loser = map.get(c.loser.id.toString());

      if (winner) winner.wins += 1;
      if (loser) loser.losses += 1;
    });

    this.ranking = Array.from(map.values()).sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;

      if (b.level !== a.level) {
        return b.level - a.level;
      }

      return a.name.localeCompare(b.name);
    });
  }
}
