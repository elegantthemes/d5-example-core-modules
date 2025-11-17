import { addFilter } from '@wordpress/hooks';

import { elementsCallbacks } from '@divi/module-utils';
import {
  type ContactFormAttrs,
  type ModuleLibrary,
} from '@divi/types';

import {
  generateUniqueId,
  isVisibleFields,
} from './callbacks';
import {
  conversionOutline,
} from './conversion-outline';
import {
  ContactFormEdit,
} from './edit';
import {
  contactFormModuleMetaData,
} from './module.json-source';
import { contactFormModuleDefaultPrintedStyleAttributes } from './module-default-printed-style-attributes.json-source';
import { contactFormModuleDefaultRenderAttributes } from './module-default-render-attributes.json-source';
import { ModuleStyles } from './module-styles';
import {
  SettingsAdvanced,
} from './settings-advanced';
import {
  SettingsDesign,
} from './settings-design';

// Register filters for unique ID initialization
addFilter('divi.addModule.attrs', 'divi', generateUniqueId);
addFilter('divi.cloneModule.attrs', 'divi', generateUniqueId);

/**
 * Contact Form module.
 *
 * @since ??
 */
export const contactForm: ModuleLibrary.Module.RegisterDefinition<ContactFormAttrs> = {
  metadata:                 contactFormModuleMetaData,
  defaultAttrs:             contactFormModuleDefaultRenderAttributes,
  defaultPrintedStyleAttrs: contactFormModuleDefaultPrintedStyleAttributes,
  renderers:                {
    edit:   ContactFormEdit,
    styles: ModuleStyles,
  },
  callbacks: {
    content: {
      elements:        elementsCallbacks,
      contentRedirect: {
        fields: {
          redirectInnercontent: {
            visible: isVisibleFields,
          },
        },
      },
    },
  },
  template: [
    ['divi/contact-field', {
      module: {
        decoration: {
          sizing: {
            desktop: {
              value: {
                flexType: '12_24',
              },
            },
          },
        },
      },
      fieldItem: {
        advanced: {
          id: {
            desktop: {
              value: 'Name',
            },
          },
          type: {
            desktop: {
              value: 'input',
            },
          },
        },
        innerContent: {
          desktop: {
            value: 'Name',
          },
        },
      },
    }],
    ['divi/contact-field', {
      module: {
        decoration: {
          sizing: {
            desktop: {
              value: {
                flexType: '12_24',
              },
            },
          },
        },
      },
      fieldItem: {
        advanced: {
          id: {
            desktop: {
              value: 'Email',
            },
          },
          type: {
            desktop: {
              value: 'email',
            },
          },
        },
        innerContent: {
          desktop: {
            value: 'Email Address',
          },
        },
      },
    }],
    ['divi/contact-field', {
      fieldItem: {
        advanced: {
          id: {
            desktop: {
              value: 'Message',
            },
          },
          type: {
            desktop: {
              value: 'text',
            },
          },
        },
        innerContent: {
          desktop: {
            value: 'Message',
          },
        },
      },
    }],
  ],
  settings: {
    advanced: SettingsAdvanced,
    design:   SettingsDesign,
  },
  conversionOutline,
};
