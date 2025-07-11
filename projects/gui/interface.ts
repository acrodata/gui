export type GuiFieldType =
  | 'group'
  | 'inline'
  | 'tabs'
  | 'tab'
  | 'menu'
  | 'menuItem'
  | 'text'
  | 'number'
  | 'switch'
  | 'slider'
  | 'fill'
  | 'select'
  | 'buttonToggle'
  | 'imageSelect'
  | 'combobox'
  | 'textarea'
  | 'codearea'
  | 'hidden'
  | 'image'
  | 'video'
  | 'audio'
  | 'file';

export type GuiFillMode = 'flat' | 'gradient' | 'image';

export type GuiSliderMode = 'normal' | 'range';

export type GuiTabsMode = 'normal' | 'list';

export type GuiBasicValue = boolean | number | string;

export type GuiDefaultValue = boolean | number | string | any[] | Record<string, any> | null;

export type GuiOperator = '$eq' | '$ne' | '$gt' | '$lt' | '$gte' | '$lte' | '$in' | '$nin';

export type GuiCondition = [string, GuiOperator, GuiDefaultValue];

export interface GuiFieldShowIf {
  conditions: GuiCondition[];
  logicalType?: '$and' | '$or';
}

export interface GuiField {
  type: GuiFieldType;
  name: string;
  default?: GuiDefaultValue;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  col?: number;
  showIf?: GuiFieldShowIf;
  show?: boolean;
  // group & menu & tabs & inline
  children?: GuiFields | GuiField[];
  // group & tabs
  expanded?: boolean;
  // number & slider
  min?: number;
  max?: number;
  step?: number;
  // text & number & slider & select
  prefix?: string;
  suffix?: string;
  // select & buttonToggle & imageSelect & combobox
  options?: GuiFieldOption[];
  // select & combobox
  useFont?: boolean;
  // select & buttonToggle & combobox
  multiple?: boolean;
  // buttonToggle
  useIcon?: boolean;
  // tabs
  template?: Partial<GuiField>;
  addable?: boolean;
  // fill & slider & tabs
  mode?: GuiFillMode | GuiSliderMode | GuiTabsMode;
  // textarea
  rows?: number;
  // image & video & audio & file
  accept?: string;
  // codearea
  height?: string | number;
  language?: string;
}

export type GuiFields = Record<string, GuiField>;

export interface GuiFieldOption {
  label: string;
  value: string | number | boolean;
  disabled?: boolean;
  src?: string;
  col?: number;
}

export interface GuiControl extends GuiField {
  _type: 'control' | 'group' | 'array';
  key: string;
  parentType: GuiFieldType;
  model?: any;
  default?: any;
  index?: number;
  children?: GuiControl[];
  template?: Partial<GuiControl>;
  selectedIndex?: number;
}

export type GuiControls = Record<string, GuiControl>;
