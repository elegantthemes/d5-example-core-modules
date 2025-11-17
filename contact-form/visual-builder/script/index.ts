import { contactFormInit } from './contact-form-init';
import { contactFormSubmit } from './contact-form-submit';


(() => {
  // Add diviModuleContactFormInit into window object.
  if (! ('diviModuleContactFormInit' in window)) {
    Object.defineProperty(window, 'diviModuleContactFormInit', {
      value:    contactFormInit,
      writable: false,
    });
  }

  // Add diviModuleContactFormSubmit into window object.
  if (! ('diviModuleContactFormSubmit' in window)) {
    Object.defineProperty(window, 'diviModuleContactFormSubmit', {
      value:    contactFormSubmit,
      writable: false,
    });
  }
})();

export { contactFormInit, contactFormSubmit };
