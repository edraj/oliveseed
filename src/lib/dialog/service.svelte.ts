import { mount, unmount, type Component } from "svelte";
import DialogComponent from "./Dialog.svelte";

export interface IDialog<T = any> {
  title?: string;
  data?: T;
  css?: string;
  id?: string;
  ismodal?: boolean;
  context?: Map<any, any>;
  onclose?: (res: any) => void;
}

export interface IDialogData<T = any> {
  data?: T;
  doClose?: (data: any) => void;
}

export interface IDialogComponent extends IDialog {
  dialogClose?: (data: any) => void;
}

export class DialogService {
  private dialogs: { [key: string]: any } = {};

  public open(c: Component, options?: IDialog): any {
    // create injector of providers
    const id = options?.id || `dialog-${Date.now()}`;

    const _close = (data: any) => {
      if (options?.onclose) {
          options.onclose(data);
        }
        // good enough?
        unmount(dialogElement);
        delete this.dialogs[id];
    };

    const dialogElement = mount(DialogComponent, {
      target: document.body,
      props: {
        ...options,
        id,
        dialogClose: _close
      }
    });


    this.dialogs[id] = dialogElement;

    const _child = document.querySelector(`[data-dialog-id="${id}"]`);


    const component = mount(c, {
      target: _child.querySelector("[data-dialog-body]"),
      props: {data: {...options?.data}, doClose: _close},
      context: options?.context,
    });


    // component["something"] = dialogElement;
    // need to do sehting with component
    return c;
  }



  public get(id: string) {
    // find the element in body
    return this.dialogs[id] || null;
  }
}

export const Dialog = new DialogService();
