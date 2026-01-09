import {
  Component,
  ComponentRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ISectionTab } from '../section-tabs/section-tabs';
import { Species } from '../species/species';
import { Ranking } from '../ranking/ranking';
import { Combats } from '../combats/combats';

@Component({
  selector: 'app-tab-orchestrator',
  imports: [RouterOutlet],
  templateUrl: './tab-orchestrator.html',
  styleUrl: './tab-orchestrator.css',
})
export class TabOrchestrator implements OnChanges, OnInit {
  @Input({ required: true }) tab?: ISectionTab;

  viewContainer = inject(ViewContainerRef);

  ngOnInit(): void {
    this.setComponent('especies');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tab'].currentValue !== changes['tab'].previousValue) {
      this.viewContainer.clear();
      const currentTab = changes['tab'].currentValue as ISectionTab;
      this.setComponent(currentTab.name);
    }
  }

  setComponent(name: string) {
    let component: ComponentRef<Species | Combats | Ranking> | undefined;
    switch (name.toLowerCase()) {
      case 'especies':
        component = this.viewContainer.createComponent(Species);
        break;
      case 'combate':
        component = this.viewContainer.createComponent(Combats);
        break;
      case 'ranking':
        component = this.viewContainer.createComponent(Ranking);
        break;
    }
  }
}
