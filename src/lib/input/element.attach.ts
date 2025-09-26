import { InputValidators } from '$src/lib/input/validators';
import type { Attachment } from 'svelte/attachments';



const _validate = (element: HTMLElement, validator: string, params?: any) => {
const _validator = InputValidators.get(validator);
  if (_validator) {
    if (_validator(params)){
      element.classList.remove('ol-invalid');
    } else {
      element.classList.add('ol-invalid');
    }
  }
};

export function olElement(validator: string, params?: any): Attachment {
  return (element: HTMLElement) => {

    // on form validation check children invalid state
    const inputs = element.querySelectorAll('input');
    _validate(element, validator, params);

    inputs.forEach(input => {
      input.addEventListener('click', () => {
        _validate(element, validator, params);
      });
    });

    // find closest form element
    const _form = element.closest('form');
    if (_form) {
      _form.addEventListener('submit', () => {
        if (!element.classList.contains('.ol-invalid')) {
          _validate(element, validator, params);
        }
      });

    }
    return () => {
    };
  };

};
