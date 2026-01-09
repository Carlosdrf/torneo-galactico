import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISpecies } from '../../components/species/species';
import { Button } from '../button/button';

export enum CardOptionsTypes {
  DELETE = 'delete',
  EDIT = 'edit',
}
export interface ICardOptions {
  action: CardOptionsTypes;
  icon: string;
}

@Component({
  selector: 'app-species-card',
  imports: [Button],
  templateUrl: './species-card.html',
  styleUrl: './species-card.css',
})
export class SpeciesCard {
  @Input() species!: ISpecies;

  @Output() actionClicked = new EventEmitter<CardOptionsTypes>();

  @Input() showActionButtons = true;

  options: ICardOptions[] = [
    {
      action: CardOptionsTypes.EDIT,
      icon: 'edit',
    },
    {
      action: CardOptionsTypes.DELETE,
      icon: 'delete',
    },
  ];
}
