import { Toast } from '$src/lib/toast/toast.state';
import { Res } from '$src/utils/resources';

export const ValidateForm = (form: HTMLFormElement, toast: boolean = true): boolean => {

  form.classList.add("was-validated");

  if (!form.checkValidity()){
    // FIXME: some fields like maxlength date, do not bind immidiately, so if user does not change value
    // they will initially check invalid
    // i have no idea how to fix this for now, except calling the checkValidity AGAIN!
    if (!form.checkValidity()) {

      if (toast) Toast.ShowError('INVALID_FORM');
      _debug(form.querySelectorAll(':invalid'), 'invalid fields');
      return false;
    }
  }
  // also sometimes the form contains ol-invalid classes
  // TODO: configure classname
  if (form.querySelectorAll('.ol-invalid').length > 0) {
    if (toast) Toast.ShowError('INVALID_FORM');
    _debug(form.querySelectorAll('.ol-invalid'), 'invalid fields');
    return false;
  }
  return true;

};

export const ErrorMessage = (input: HTMLInputElement) => {

  const validity = input.validity;
  const type = input.type;

  let _error = Res.Get('REQUIRED', 'Required');
  if (validity.valueMissing) {
    _error = Res.Get('REQUIRED', 'Required');
  }

  if (validity.rangeOverflow) {
    _error = Res.Get('TOO_LARGE', 'Too large');
  }
  if (validity.rangeUnderflow) {
    _error = Res.Get('TOO_SMALL', 'Too small');
  }
  if (validity.typeMismatch) {
    _error = Res.Get(`INVALID_${type}_FORMAT`, `Invalid ${type} format`);
  }
  if (validity.patternMismatch) {
    // use data-pattern
    const pattern = input.dataset.pattern;
    _error = Res.Get(`INVALID_${pattern}_FORMAT`, `Invalid ${pattern} format`);
  }
  if (validity.tooLong) {
    _error = Res.Get(`TOO_LONG`, `Too long`);
  }
  if (validity.tooShort) {
    _error = Res.Get(`TOO_SHORT`, `Too short`);
  }
  // FIXME: this should be optional
  // if (validity.stepMismatch) {
  //   _error = null;
  // }


  return _error;
}


export const ClearValidation = (form: HTMLFormElement): void => {
  form.classList.remove("was-validated");
};


// export const PATTERNS = {
//   shortname: '[a-zA-Z0-9_]+',
//   password: '[a-zA-Z0-9]{8,}',
//   mobile: '7[789][0-9]{8}',
//   phone: '[+\\d\\s]*',
//   image: '.+\\.{1}(jpg|png|gif|svg)',
//   url: '(http|https):\/\/[a-zA-Z0-9-.]+.[a-zA-Z]{2,3}(/S*)'
// };

export const InputPatterns = new Map<string, any>([
  ['mobile', '7[789][0-9]{8}'],
  ['phone', '[+\\d\\s]*'],
  ['shortname', '[a-zA-Z0-9_]+'],
  ['password', '[a-zA-Z0-9]{8,}'],
  ['positiveNumber', /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/],
  ['url', '^(http|https)://[a-zA-Z0-9-.]+.[a-zA-Z]{2,3}(/S*)?$'],
  ['image', '.+\\.{1}(jpg|png|gif|bmp)$'],
]);
