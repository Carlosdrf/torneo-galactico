import { ChangeDetectorRef, Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ISpecies } from '../species/species';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { StorageService } from '../../service/storage';
import { NoDataFound } from '../../ui-components/no-data-found/no-data-found';
import { Button } from '../../ui-components/button/button';
import { MatIcon } from '@angular/material/icon';
import { SpeciesCard } from '../../ui-components/species-card/species-card';

const ENTITY_NAME = 'combats';

export interface ICombats {
  id: number;
  winner: ISpecies;
  loser: ISpecies;
}

@Component({
  selector: 'app-combats',
  imports: [NoDataFound, Button, MatIcon, SpeciesCard, NgClass],
  templateUrl: './combats.html',
  styleUrl: './combats.css',
})
export class Combats implements OnInit {
  combats: ICombats[] = [];

  winner?: string;

  species: ISpecies[] = [];

  selectedSpecies: (ISpecies | null)[] = [null, null];

  activeSlot: 0 | 1 = 0;

  message?: string;

  fighting = false;

  cdr = inject(ChangeDetectorRef);

  private storageService = inject(StorageService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const combats = this.storageService.getResources('combats');
      if (combats) {
        this.combats = JSON.parse(combats) as ICombats[];
      }

      const species = this.storageService.getResources('species');
      if (species) {
        this.species = JSON.parse(species) as ISpecies[];
      }
    }
  }

  startMatch() {
    const a = this.selectedSpecies[0];
    const b = this.selectedSpecies[1];

    if (!a || !b) return;
    this.fighting = true;

    setTimeout(() => {
      const result = this.resolveMatch(a, b);
      this.combats.push({
        id: new Date().getTime(),
        ...result,
      });
      this.storageService.upsertResource(ENTITY_NAME, JSON.stringify(this.combats));
      this.winner = result.winner.name;
      this.fighting = false;
      this.cdr.detectChanges();
    }, 1200);
  }

  resolveMatch(a: ISpecies, b: ISpecies) {
    if (a.level > b.level) {
      return { winner: a, loser: b };
    }
    if (b.level > a.level) {
      return { winner: b, loser: a };
    }

    const compare = a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });

    if (compare <= 0) {
      return { winner: a, loser: b };
    }

    return { winner: b, loser: a };
  }

  handleSelection(species: ISpecies) {
    const otherSlot = this.activeSlot === 0 ? 1 : 0;
    const check = this.selectedSpecies[otherSlot];

    if (check?.id === species.id) {
      this.message = 'select a different species';
      return;
    } else {
      this.message = undefined;
    }

    this.selectedSpecies[this.activeSlot] = species;
  }
}
