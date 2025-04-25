import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
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
import { GuiInlineGroup } from './inline-group/inline-group';
import { GuiInputText } from './input-text/input-text';
import { GuiInputNumber } from './input-number/input-number';
import { GuiSelect } from './select/select';
import { GuiSwitch } from './switch/switch';
import { GuiSlider } from './slider/slider';
import { GuiIcon } from './button-toggle/icon';
import { GuiButtonToggle } from './button-toggle/button-toggle';
import { GuiFill } from './fill/fill';
import { GuiImageSelect } from './image-select/image-select';
import { GuiCombobox } from './combobox/combobox';
import { GuiTextarea } from './textarea/textarea';
import { GuiCodearea } from './codearea/codearea';
import { GuiCodeareaDialog } from './codearea/codearea-dialog';
import { GuiFileUploader } from './file-uploader/file-uploader';
import { GuiIconButtonWrapper } from './icon-button-wrapper/icon-button-wrapper';
import { GuiEjsPipe, GuiFlexDirective } from './gui-utils';

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
    GuiInlineGroup,
    GuiImageSelect,
    GuiCombobox,
    GuiTextarea,
    GuiCodearea,
    GuiCodeareaDialog,
    GuiFileUploader,
    GuiIconButtonWrapper,
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
    GuiInlineGroup,
    GuiImageSelect,
    GuiCombobox,
    GuiTextarea,
    GuiCodearea,
    GuiCodeareaDialog,
    GuiFileUploader,
    GuiIconButtonWrapper,
    GuiEjsPipe,
    GuiFlexDirective,
  ],
})
export class GuiModule {}
