<script lang="ts">
  import { ErrorMessage, InputPatterns } from '$src/lib/input/form';
  import { Res } from '$src/utils/resources';
  import { onMount } from 'svelte';

  interface IProps {
    placeholder?: string;
    error?: string;
    invalidForm?: boolean;
    forLabel?: string;
    type?: string;
    input?: any;
    help?: any;
    delay?: number; // a bandaid to fix lazy loaded inputs
  }
  const { placeholder, error, invalidForm, type, input, help, delay }: IProps = $props();

  const cssType = type ? `ol-${type}` : '';

  // FIXME: maintain default
  let errorText = $state(error);

  const id = $props.id();

  let forLabel = $state('');
  onMount(() => {

    setTimeout(() => {

      const element = document.getElementById(id);
      if (!element) return;
      const container = element.querySelector('.olelement');
      if (container){
        prepGroup(container);
      } else {
        const input = element.querySelector('input, select, textarea');
        if (input) prepInput(input);
  
      }
    }, delay || 0);

  });

  const prepInput = (input) => {
    input.placeholder = placeholder;
    input.classList.add('ol-input');

    forLabel = input.id;

    if (input.required) {
      if (!error) errorText = Res.Get('REQUIRED', 'Required');
    }

    if (input.dataset?.pattern) {
      let _pattern = InputPatterns.get(input.dataset.pattern);
      if (_pattern) {
        input.setAttribute('pattern', _pattern);
      }
    }


    input.addEventListener('input', () => update(input));
    input.addEventListener('invalid', () => update(input));


  };
  const prepGroup = (container) => {
    container.classList.add('ol-input');
    forLabel = container.id;

    // if required, listen to clicks of checkboxes to update state
    if (container.dataset.required === 'true') {
      
      const inputs = container.querySelectorAll('input');
      updateElement(container);

      inputs.forEach(input => {
        input.addEventListener('click', () => {
          updateElement(container);
        });
      })
    }
  }

  const updateElement = (container) => {
    const selected = container.querySelectorAll('input:checked');
    if (selected.length === 0) {
      container.classList.add('ol-invalid');
    } else {
      container.classList.remove('ol-invalid');
    }
  }

  const update = (input) => {
    // FIXME: bug, deciding the error is a bit hard
    const _errorText = ErrorMessage(input);
     if (!error) errorText = _errorText;
  };
</script>

<div class="ol-field {cssType} {invalidForm ? 'ol-invalid-form' : ''}" {id}>
  <label class="ol-label" for={forLabel}>{placeholder}</label>
  {@render input()}
  <span class="ol-required"></span>
  <span class="ol-feedback {invalidForm ? 'ol-form-feedback' : ''}">{errorText}</span>
  <span class="ol-help">
    {@render help?.()}
  </span>
</div>

<style>
</style>
