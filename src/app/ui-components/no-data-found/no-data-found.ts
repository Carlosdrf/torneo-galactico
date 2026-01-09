import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-data-found',
  imports: [],
  templateUrl: './no-data-found.html',
  styleUrl: './no-data-found.css',
})
export class NoDataFound {
  @Input({ required: true }) message!: string;
}
