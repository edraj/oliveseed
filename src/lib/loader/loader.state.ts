import { StateService } from '$src/core/state.abstract';
import type { ILoaderState } from '$src/lib/loader/loader.model';

export class LoaderState extends StateService<ILoaderState> {

  constructor() {
    super();
    this.SetState({
      show: false, source: null, url: null
    });
  }
  show(source: string) {
    this.update({ show: true, source });
  }
  hide(source: string) {
    this.update({ show: false, source });
  }
  emitUrl(url: string) {
    this.update({ url });
  }

}

export const Loader = new LoaderState();
