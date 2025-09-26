import { InputValidators } from '$src/lib/input/validators';
import type { Attachment } from 'svelte/attachments';


const _validate = (element: HTMLInputElement, validator: ((v: any) => boolean) | string, params?: any) => {
  if (typeof validator === 'function') {
    _validateFn(element, validator);
  } else {
    _validateKey(element, validator, params);
  }
};

const _validateFn = (element: HTMLInputElement, validator: (v: any) => boolean) => {

  if (validator(element.value)) {
    element.setCustomValidity('');
  } else {
    element.setCustomValidity('invalid');
  }
};

const _validateKey = (element: HTMLInputElement, v: string, params: any) => {

  const _validator = InputValidators.get(v);
  if (_validator) {
    if (params) {
      // pass params to function call
      _validateFn(element, _validator(params));
    } else {

      _validateFn(element, _validator);
    }
  }
};

export function olinput(validator: ((v: any) => boolean) | string, params?: any): Attachment {
  return (element: HTMLInputElement) => {

    if (validator) {
      // start with invalid
      element.setCustomValidity('invalid');
    }

    // catch invalid
    element.addEventListener('invalid', (event) => {
      _validate(element, validator, params);
    });

    element.addEventListener('input', (event) => {
      _validate(element, validator, params);
    });

    // catch already validated
    element.form.addEventListener('submit', (event) => {
      if (element.checkValidity()) {
        _validate(element, validator, params);
      }
    });

    return () => {
    };
  };

};



