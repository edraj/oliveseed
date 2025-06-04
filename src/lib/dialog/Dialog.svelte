<script lang="ts">
  import type { IDialogComponent } from "./service.svelte";

  const { title, css, id, dialogClose, ismodal }: IDialogComponent = $props();

  const doClose = () => {
    // what to do?
    dialogClose(null);
  };

  const doMouseDown = (event: MouseEvent): void => {
    if ((<HTMLElement>event.target).matches(".d-overlay, .modal-dialog, .modal") && !ismodal) {
      dialogClose(null);
    }
  };

  const doKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      dialogClose(null);
    }
  };


   const doClick = (event: MouseEvent) => {
      // find dialog-close and close
      if ((<HTMLElement>event.target).matches('.dialog-close')){
         dialogClose(null);
      }
   }
</script>

<svelte:window onkeydown={doKeyDown} />

<div class={css} data-dialog-id={id}>
  <div role="presentation" class="modal-overlay d-overlay" onmousedown={doMouseDown} onclick={doClick}>
    <div class="modal" role="dialog" aria-labelledby="dialogtitle" tabindex="-1">
      <div class="modal-header">
        <h6 class="f6 modal-title" id="dialogtitle">{title}</h6>
        <button type="button" class="modal-close" onclick={doClose}>X</button>
      </div>
      <div class="modal-body" data-dialog-body="true"></div>
    </div>
  </div>
</div>
