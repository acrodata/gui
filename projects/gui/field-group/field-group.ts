import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { GuiFieldLabel } from '../field-label/field-label';
import { GuiControl } from '../interface';

@Component({
  selector: 'gui-field-group',
  templateUrl: './field-group.html',
  styleUrl: './field-group.scss',
  host: {
    class: 'gui-field-group',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [GuiFieldLabel],
})
export class GuiFieldGroup implements OnInit, DoCheck {
  private differs = inject(KeyValueDiffers);
  private cdr = inject(ChangeDetectorRef);

  @Input() config: Partial<GuiControl> = {};

  private configDiffer?: KeyValueDiffer<string, any>;

  ngOnInit(): void {
    this.configDiffer = this.differs.find(this.config).create();
  }

  ngDoCheck(): void {
    const changes = this.configDiffer?.diff(this.config);
    changes?.forEachChangedItem(record => {
      this.cdr.markForCheck();
    });
  }
}
