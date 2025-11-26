import { signupInit } from './init';
import { signupSubmitForm } from './submit-form';


(() => {
  // Add diviModuleSignupInit into window object.
  if (! ('diviModuleSignupInit' in window)) {
    Object.defineProperty(window, 'diviModuleSignupInit', {
      value:    signupInit,
      writable: false,
    });
  }

  // Add diviModuleSignupSubmitForm into window object.
  if (! ('diviModuleSignupSubmitForm' in window)) {
    Object.defineProperty(window, 'diviModuleSignupSubmitForm', {
      value:    signupSubmitForm,
      writable: false,
    });
  }
})();

export { signupInit, signupSubmitForm };
