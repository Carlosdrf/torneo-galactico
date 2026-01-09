import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [MatButtonModule, MatIconModule, MatDividerModule, NgClass],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Output() eventClick = new EventEmitter();

  @Input() fontIcon!: string;

  @Input() variant: 'primary' | 'outline' | 'ghost' | 'panel' = 'outline';

  @Input() borderStyle: 'solid' | 'dashed' | 'dotted' = 'solid';

  @Input() size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';

  @Input() glow = false;

  @Input() text!: string;

  @Input() disabled: boolean = false;

  sizeClass: Record<string, string> = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
    xl: 'px-6 py-4 text-xl',
    full: `w-full py-4 text-${this.size}`,
  };

  variantClass: Record<string, string> = {
    primary:
      'border bg-accent border-accent text-black font-bold hover:bg-accent/50 hover:text-primary',
    outline: 'bg-transparent border border-muted',
    ghost: 'bg-transparent',
    panel: 'rounded-xl min-h-40 hover:bg-accent/10 border',
  };
}
