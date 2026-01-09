import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { SidePanel } from '../side-panel/side-panel';
import { FormlyFieldConfig, FormlyForm } from '@ngx-formly/core';
import { FormGroup, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { Button } from '../../ui-components/button/button';

export interface IFormPopulate<T> {
  data: T;
}

@Component({
  selector: 'app-create',
  imports: [SidePanel, FormlyForm, ReactiveFormsModule, Button],
  templateUrl: './create.html',
  styleUrl: './create.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Create implements OnInit {
  @Output() closePanel = new EventEmitter();

  @Output() submitForm = new EventEmitter();

  @Input() form: FormGroup = new UntypedFormGroup({});

  @Input() fields: FormlyFieldConfig[] = [];

  @Input() populatedData!: any;

  /**
   *
   */
  ngOnInit(): void {
    this.form = new UntypedFormGroup({});
  }

  /**
   *
   * @param event formly form model
   */
  handleFormlyChange(event: Record<string, string>) {
    this.populatedData = event;
  }

  /**
   *
   */
  handleSubmit() {
    if (this.form.valid) {
      this.submitForm.emit({
        data: this.populatedData,
      });
      this.resetModel();
    }
  }

  resetModel() {
    this.populatedData = {};
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
