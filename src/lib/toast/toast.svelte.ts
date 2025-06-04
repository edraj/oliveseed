import type { IUiError } from "$core/error.model";
import { StateService } from "$core/state.svelte";
import { Res } from "$utils/resources";
import { mount } from "svelte";
import { EnumTimeout, type IToast, type IToastButton } from "./toast.model";
import Toaster from "./Toaster.svelte";

export class ToastService extends StateService<IToast> {
  private created: boolean;
  private isCanceled: any;

  private addComponent() {
    mount(Toaster, { target: document.body });
    this.created = true;
  }

  public dismissButton: IToastButton = {
    css: "btn-close",
    text: Res.Get("Dismiss"),
    click: (_: MouseEvent) => {
      this.Hide();
    },
  };

  private defaultOptions: IToast = {
    css: "toast",
    extracss: "",
    text: Res.Get("Unknown"),
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
    const message = Res.Get(code, options?.text || Res.Get("Unknown"));
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
    this.Show(code, { extracss: "error", ...options });
  }
  ShowSuccess(code: any, options?: IToast) {
    this.Show(code, { extracss: "success", ...options });
  }
  ShowWarning(code: any, options?: IToast) {
    this.Show(code, { extracss: "warning", ...options });
  }

  Hide() {
    if (this.isCanceled) {
      clearTimeout(this.isCanceled);
    }
    this.update({ visible: false });
  }

  HandleUiError(error: IUiError, options?: IToast): any {
    // check code for generic responses
    // 400 and 500 are errors
    // 401 and 403 are info with relogin
    // 404 is warning

    if (error.code) {
      // do a switch case for specific errors
      switch (error.status) {
        case 500:
          // terrible error, code always unknown
          this.ShowError("Unknown", options);
          break;
        case 400:
          // server error
          this.ShowError(error.code, options);
          break;
        case 401:
        case 403:
          // auth error, just show a unified message
          this.ShowError("UNAUTHORIZED", options);
          break;
        case 404:
          // thing does not exist, better let each component decide
          this.ShowWarning(error.code, options);
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
