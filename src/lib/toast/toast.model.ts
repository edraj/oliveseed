import { Config } from '$src/config';

export enum EnumTimeout {
  Short = Config.Basic.defaultToastTimeout,
  Long = 20000,
  Never = -1,
}
export enum EnumToastIcon {
  Success = 'icon-check',
  Error = 'icon-alert-circle',
  Warning = 'icon-alert-triangle',
}
export interface IToast {
  text?: string;
  icon?: string;
  secondary?: string;
  css?: string;
  extracss?: string;
  buttons?: IToastButton[];
  timeout?: EnumTimeout;
  visible?: boolean;
}

export interface IToastButton {
  text: string;
  css?: string;
  click?: (event: MouseEvent) => void;
}
