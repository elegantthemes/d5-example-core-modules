interface ContactFormData {
  selector: string;
}

declare global {
  interface Window {
    diviModuleContactFormData?: ContactFormData[];
  }
}

export { ContactFormData };
