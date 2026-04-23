<script lang="ts">
  import { onMount } from 'svelte';

  let { digits = 6, value = $bindable() }: { digits?: number, value?: any } = $props();

  const uid = $props.id();

  let boxes = $state(null);
  onMount(() => {
    boxes = document.getElementById(uid).querySelectorAll('.otp-box');
    setTimeout(() => {

      const _textfield = document.getElementById(uid).querySelector('.otp-input');
      if (_textfield){
        (<HTMLInputElement>_textfield).focus();
      }
    }, 100);
  });

  const handleInput = (e) => {

    const value = e.target.value;

    boxes.forEach((box: any, index) => {
      box.innerText = value[index] || '';
    });
  };
</script>

<div class="otp-wrapper ltr" id={uid}>
  <input
    oninput={handleInput}
    type="text"

    bind:value={value}
    class="otp-input"
    maxlength={digits}
    inputmode="numeric"
    autocomplete="one-time-code" />

  <div class="otp-input-container">
    {#each { length: digits }}
      <div class="otp-box"></div>
    {/each}
  </div>
</div>

<style lang="less">
  @import (reference) 'sh.vars.less';
  @import (reference) 'sh._vars.less';

  .otp-wrapper {
    position: relative;
    width: min(100%, 300px);
    margin-inline: auto;
  }

  .otp-input-container {
    display: flex;
    gap: 10px;
  }
  // FIXME: use a different class name
  .otp-box {
    width: 45px;
    height: 45px;
    border: 1px solid var(--sh-grey);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    pointer-events: none;
    background-color: var(--sh-white);
  }

  .otp-input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 2;
    inset-inline: 0;
    &:focus + .otp-input-container .otp-box {
      border-color: var(--sh-linkcolor);
    }
  }
</style>
