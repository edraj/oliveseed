<script lang="ts">
  import type { IDialogComponent } from './service';

  interface IProps extends IDialogComponent {
    children: any;
    show?: boolean;
  }
  let { title, css, show = $bindable(false),  id, ismodal, onclose, children }: IProps = $props();

  const doClose = () => {
    show = false;
    onclose?.(null);
  };

  const doMouseDown = (event: MouseEvent): void => {
    if ((<HTMLElement>event.target).matches('.d-overlay, .modal-dialog, .modal') && !ismodal) {
      doClose();
    }
  };

  const doKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Escape') {
      doClose();
    }
  };

  const doClick = (event: MouseEvent) => {
    // find dialog-close and close
    if ((<HTMLElement>event.target).matches('.dialog-close')) {
      doClose();
    }
  };
</script>

<svelte:window onkeydown={doKeyDown} />

<div class={css} data-dialog-id={id}>
  <div role="presentation" class="modal-overlay d-overlay { show ? 'modal-show' : 'modal-hide'}" onmousedown={doMouseDown} onclick={doClick}>
    <div class="modal" role="dialog" aria-labelledby="dialogtitle" tabindex="-1">
      <div class="modal-header">
        <h6 class="f6 modal-title" id="dialogtitle">{title}</h6>
        <button type="button" class="modal-close" onclick={doClose}></button>
      </div>
      <div class="modal-body">
        {@render children()}
      </div>
    </div>
  </div>
</div>
