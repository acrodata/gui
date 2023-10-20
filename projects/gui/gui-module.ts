import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MtxColorpickerModule } from '@ng-matero/extensions/colorpicker';
import { MtxSelectModule } from '@ng-matero/extensions/select';

import { GuiForm } from './gui-form';
import { GuiFieldGroup } from './field-group/field-group';
import { GuiFieldLabel } from './field-label/field-label';
import { GuiFieldInline } from './field-inline/field-inline';
import { GuiInputText } from './input-text/input-text';
import { GuiInputNumber } from './input-number/input-number';
import { GuiSelect } from './select/select';
import { GuiSwitch } from './switch/switch';
import { GuiSlider } from './slider/slider';
import { GuiIcon } from './button-toggle/icon';
import { GuiButtonToggle } from './button-toggle/button-toggle';
import { GuiFill } from './fill/fill';
import { GuiImageSelect } from './image-select/image-select';
import { GuiTextarea } from './textarea/textarea';
import { GuiFileUploader } from './file-uploader/file-uploader';
import { GuiFileUploaderService } from './file-uploader/file-uploader.service';
import { GuiEjsPipe, GuiFlexDirective } from './gui-utils';
import { svgIcons } from './gui-icons';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatExpansionModule,
    MatTooltipModule,
    MtxColorpickerModule,
    MtxSelectModule,
  ],
  declarations: [
    GuiForm,
    GuiInputText,
    GuiInputNumber,
    GuiSelect,
    GuiSwitch,
    GuiSlider,
    GuiIcon,
    GuiButtonToggle,
    GuiFill,
    GuiFieldGroup,
    GuiFieldLabel,
    GuiFieldInline,
    GuiImageSelect,
    GuiTextarea,
    GuiFileUploader,
    GuiEjsPipe,
    GuiFlexDirective,
  ],
  exports: [
    GuiForm,
    GuiInputText,
    GuiInputNumber,
    GuiSelect,
    GuiSwitch,
    GuiSlider,
    GuiIcon,
    GuiButtonToggle,
    GuiFill,
    GuiFieldGroup,
    GuiFieldLabel,
    GuiFieldInline,
    GuiImageSelect,
    GuiTextarea,
    GuiFileUploader,
    GuiEjsPipe,
    GuiFlexDirective,
  ],
  providers: [GuiFileUploaderService],
})
export class GuiModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    for (const key of Object.keys(svgIcons)) {
      iconRegistry.addSvgIconLiteral(key, sanitizer.bypassSecurityTrustHtml(svgIcons[key]));
    }
  }
}
