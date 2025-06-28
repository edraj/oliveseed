import { StateService } from '$src/core/state.svelte';
import type { ILoaderState } from '$src/lib/loader/loader.model';
import { share } from 'rxjs';

export class LoaderState extends StateService<ILoaderState> {

  constructor() {
    super();
    _seqlog('loader srvice construct');
    this.SetState({
      show: false, source: null, url: null
    });
    this.stateItem$ = this.stateItem$.pipe(share());
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
