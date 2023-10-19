declare class ColorPicker {
  constructor(options?: any);
  static create: (options?: any) => void;
  static createGradientPicker: (options?: any) => void;
  static destroy: () => void;
}
declare class GradientPicker {}

declare module '@easylogic/colorpicker' {
  export default ColorPicker;
  export const GradientPicker: any;
}

declare const EasyLogicColorPicker: any;
