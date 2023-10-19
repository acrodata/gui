import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import ColorPickerUI from '@easylogic/colorpicker';

@Component({
  selector: 'gui-color-palette',
  templateUrl: './color-palette.html',
  styleUrls: ['./color-palette.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuiColorPalette implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;

  @Input() color = '#000';
  @Output() colorChange = new EventEmitter<string>();

  @Input() showGradient = false;
  @Input() gradient = 'linear-gradient(to right, white 0%, black 100%)';
  @Output() gradientChange = new EventEmitter<string>();

  private colorPickerUI: any;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.showGradient) {
      this.createGradientPicker();
    } else {
      this.createColorPicker();
    }
  }

  createColorPicker() {
    this.colorPickerUI = ColorPickerUI.create({
      color: this.color,
      container: this.container.nativeElement,
      position: 'inline',
      onLastUpdate: (color: string) => {
        this.colorChange.emit(color);
      },
    });
  }

  createGradientPicker() {
    this.colorPickerUI = ColorPickerUI.createGradientPicker({
      gradient: this.gradient,
      container: this.container.nativeElement,
      position: 'inline',
      colorpickerOptions: {
        type: 'chromedevtool',
      },
      onLastUpdate: (gradient: string) => {
        this.gradientChange.emit(gradient);
      },
    });
  }

  ngOnDestroy() {
    this.colorPickerUI?.destroy();
  }
}
