
export const ValidateForm = (form: HTMLFormElement): boolean =>{

  form.classList.add("was-validated");

  if (!form.checkValidity()){
    return false;
  }

  return true;

}
