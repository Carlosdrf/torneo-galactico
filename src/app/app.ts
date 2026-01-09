import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ISectionTab, SectionTabs } from './components/section-tabs/section-tabs';
import { TabOrchestrator } from "./components/tab-orchestrator/tab-orchestrator";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SectionTabs, TabOrchestrator],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('morning-value');

  selectedTab?: ISectionTab;
  /**
   * 
   * @param event 
   */
  handleSelectedTab(event: ISectionTab) {
    this.selectedTab = event;
  }
}
