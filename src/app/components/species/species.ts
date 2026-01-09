import {
  Component,
  ComponentRef,
  Inject,
  inject,
  OnInit,
  PLATFORM_ID,
  ViewContainerRef,
} from '@angular/core';
import { Button } from '../../ui-components/button/button';
import { Create, IFormPopulate } from '../create/create';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CardOptionsTypes, SpeciesCard } from '../../ui-components/species-card/species-card';
import { AbstractControl } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { StorageService } from '../../service/storage';
import { NoDataFound } from '../../ui-components/no-data-found/no-data-found';

const ENTITY_NAME = 'species';

export interface ISpecies {
  id: number;
  name: string;
  level: number;
  skill: string;
}
@Component({
  selector: 'app-species',
  imports: [Button, SpeciesCard, NoDataFound],
  templateUrl: './species.html',
  styleUrl: './species.css',
})
export class Species implements OnInit {
  skills = ['Rayos laser', 'Super fuerza', 'Velocista', 'Volador'];

  formlyForm: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      props: {
        description: 'Nombre de la especie',
        label: 'Nombre',
        required: true,
      },
    },
    {
      key: 'level',
      type: 'input',
      props: {
        min: 0,
        type: 'number',
        description: 'Nivel de poder de la especie',
        label: 'Poder',
        required: true,
      },
      validators: {
        integer: {
          expression: (c: AbstractControl) =>
            c.value === null || c.value === '' || Number.isInteger(Number(c.value)),
          message: 'Solo se permiten números enteros',
        },
      },
    },
    {
      key: 'skill',
      type: 'select',
      props: {
        description: 'Habilidad especial de la especie',
        label: 'Selecciona habilidad',
        required: true,
        options: this.skills.map((item) => {
          return {
            label: item,
            value: item,
          };
        }),
      },
    },
  ];

  species: ISpecies[] = [];

  private viewContainer = inject(ViewContainerRef);

  private storageService = inject(StorageService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   *
   */
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const species = this.storageService.getResources(ENTITY_NAME);
      if (species) {
        this.species = JSON.parse(species) as ISpecies[];
      }
    }
  }

  openSidePanel(selectedSpecies?: ISpecies) {
    const component = this.viewContainer.createComponent(Create);
    if (component) {
      component.instance.fields = this.formlyForm;
      if (selectedSpecies) {
        component.instance.populatedData = {
          ...selectedSpecies,
        };
      }
      component.instance.submitForm.subscribe({
        next: (response: IFormPopulate<Omit<ISpecies, 'id'>>) => {
          console.log(response);
          if (selectedSpecies) {
            this.species = this.species.map((s) => {
              if (s.id === selectedSpecies.id) {
                return {
                  ...s,
                  ...response.data,
                };
              } else return s;
            });
          } else {
            const exists = this.species.find((s) => s.name === response.data.name);
            if (!exists) {
              this.species = [
                ...this.species,
                {
                  id: new Date().getTime(),
                  ...response.data,
                },
              ];
            }
          }

          this.upsertSpecies();
          this.closeComponent(component);
        },
      });
      component.instance.closePanel.subscribe(() => {
        this.closeComponent(component);
      });
    }
  }

  /**
   *
   * @param action option action
   * @param element selected species
   */
  handleActionClick(action: CardOptionsTypes, element: ISpecies) {
    if (action === CardOptionsTypes.DELETE) {
      this.species = this.species.filter((s) => s !== element);
      this.upsertSpecies();
    }
    if (action === CardOptionsTypes.EDIT) {
      this.openSidePanel(element);
    }
  }

  /**
   *
   * @param component
   */
  closeComponent(component: ComponentRef<Create>) {
    component.destroy();
    this.viewContainer.clear();
  }

  /**
   *
   */
  upsertSpecies() {
    console.log(this.species);
    this.storageService.upsertResource(ENTITY_NAME, JSON.stringify(this.species));
  }
}
