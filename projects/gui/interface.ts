export type GuiConfigType =
  | 'menu'
  | 'menuItem'
  | 'group'
  | 'inline'
  | 'tabs'
  | 'tab'
  | 'text'
  | 'number'
  | 'switch'
  | 'select'
  | 'imageSelect'
  | 'combobox'
  | 'slider'
  | 'buttonToggle'
  | 'radio'
  | 'checkbox'
  | 'fill'
  | 'image'
  | 'video'
  | 'audio'
  | 'file'
  | 'textarea'
  | 'hidden';

export type GuiFillMode = 'flat' | 'gradient' | 'image';

export type GuiSliderMode = 'normal' | 'range';

export type GuiTabsMode = 'nav' | 'list';

export interface GuiConfig {
  type: GuiConfigType;
  name: string;
  default?: GuiDefaultValue;
  col?: number;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  // group & subgroup & menu & tabs & inline
  children?: GuiConfigs | GuiConfig[];
  // group & tabs
  expanded?: boolean;
  // number & slider
  min?: number;
  max?: number;
  step?: number;
  // text & number & slider & select & combobox
  prefix?: string;
  suffix?: string;
  // select & combobox & radio & checkbox & buttonToggle & imageSelect
  options?: GuiConfigOption[];
  // select
  useFont?: boolean;
  // combobox & buttonToggle
  multiple?: boolean;
  // combobox
  maxSelectedItems?: number;
  bindValue?: string;
  bindLabel?: string;
  addTag?: boolean;
  // buttonToggle
  useIcon?: boolean;
  // tabs
  template?: Partial<GuiConfig>;
  addable?: boolean;
  // fill & slider & tabs
  mode?: GuiFillMode | GuiSliderMode | GuiTabsMode;
  // textarea
  rows?: number;
}

export interface GuiConfigs {
  [key: string]: GuiConfig;
}

export type GuiDefaultValue = boolean | number | string | any[] | Record<string, any>;

export interface GuiConfigOption {
  label: string;
  value: string | number | boolean;
  disabled?: boolean;
  src?: string;
  col?: number;
}

export interface GuiControl extends GuiConfig {
  _type: 'control' | 'group' | 'array';
  key: string;
  parentType: GuiConfigType;
  model?: any;
  default?: any;
  index?: number;
  children?: GuiControl[];
  template?: Partial<GuiControl>;
}

export interface GuiControls {
  [key: string]: GuiControl;
}
