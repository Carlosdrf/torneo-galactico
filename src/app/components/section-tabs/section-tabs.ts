import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output, signal, WritableSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export interface ISectionTab {
  name: string;
  icon: string;
}
@Component({
  selector: 'app-section-tabs',
  imports: [MatIconModule, NgClass],
  templateUrl: './section-tabs.html',
  styleUrl: './section-tabs.css',
})
export class SectionTabs {
  @Output() selectedTab: EventEmitter<ISectionTab> = new EventEmitter();
  selected: WritableSignal<number | undefined> = signal(0);
  tabs: ISectionTab[] = [
    {
      name: 'Especies',
      icon: 'group',
    },
    {
      name: 'Combate',
      icon: 'swords',
    },
    {
      name: 'Ranking',
      icon: 'trophy',
    },
  ];

  /**
   *
   * @param index tab element index
   */
  selectTab(index: number) {
    this.selected.set(index);
    this.selectedTab.emit(this.tabs[index]);
  }
}
