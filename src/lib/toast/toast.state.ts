import { browser } from '$app/environment';
import { EnumErrorCode, type IUiError } from '$core/error.model';
import { StateService } from '$src/core/state.abstract';
import { Res } from '$utils/resources';
import { mount } from 'svelte';
import { EnumTimeout, EnumToastIcon, type IToast, type IToastButton } from './toast.model';
import Toaster from './Toaster.svelte';

export class ToastService extends StateService<IToast> {
  private created: boolean;
  private isCanceled: any;

  private addComponent() {
    if (browser) {

      mount(Toaster, { target: document.body });
      this.created = true;
    }
  }

  public dismissButton: IToastButton = {
    css: 'btn-close',
    text: '', // FIXME: change to dismiss
    click: (_: MouseEvent) => {
      this.Hide();
    },
  };

  private defaultOptions: IToast = {
    css: '',
    secondary: null,
    icon: null,
    extracss: '',
    text: Res.Get('Unknown'),
    timeout: EnumTimeout.Short, // or config value
    buttons: [this.dismissButton],
    visible: false,
  };

  constructor() {
    super();
    this.SetState({ ...this.defaultOptions });
  }

  Show(code: any, options?: IToast): void {
    if (!this.created) {
      this.addComponent();
    }

    this.Hide();

    const _options: IToast = { ...this.defaultOptions, ...options };

    // get message from code
    const message = Res.Select('ERRORS', EnumErrorCode[code], Res.Get(code, options?.text || Res.Get('Unknown')));
    setTimeout(() => {
      this.update({ ..._options, text: message, visible: true });
    }, 100);

    if (_options.timeout && _options.timeout > EnumTimeout.Never) {
      this.isCanceled = setTimeout(() => {
        this.Hide();
      }, _options.timeout);
    }
  }

  ShowError(code: any, options?: IToast) {
    this.Show(code, { icon: EnumToastIcon.Error, extracss: 'error', ...options });
  }
  ShowSuccess(code: any, options?: IToast) {
    this.Show(code, { icon: EnumToastIcon.Success, extracss: 'success', ...options });
  }
  ShowWarning(code: any, options?: IToast) {
    this.Show(code, { icon: EnumToastIcon.Warning, extracss: 'warning', ...options });
  }

  Hide() {
    if (this.isCanceled) {
      clearTimeout(this.isCanceled);
    }
    this.update({ visible: false });
  }

  HandleUiError(error: IUiError, options?: IToast): any {
    // catch all and throw back, dmart is too unreliable in terms of status code

    if (error.code) {
      // do a switch case for specific errors
      switch (error.status) {
        case 500:
          // terrible error, code always unknown
          this.ShowError('Unknown', options);
          break;
        default:
          // other errors
          this.ShowError(error.code, options);
      }
      return null;
    } else {
      throw error;
    }
  }
}

export const Toast = new ToastService();
