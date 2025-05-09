import {
  type CtaAttrs,
  type ModuleLibrary,
} from '@divi/types';

import { conversionOutline } from './conversion-outline';
import { CtaEdit } from './edit';
import { ctaModuleMetaData } from './module.json-source';
import { ctaModuleDefaultPrintedStyleAttributes } from './module-default-printed-style-attributes.json-source';
import { ctaModuleDefaultRenderAttributes } from './module-default-render-attributes.json-source';
import { ModuleStyles } from './module-styles';
import { placeholderContent } from './placeholder-content';

/**
 * Call To Action module.
 *
 * @since ??
 */
export const cta: ModuleLibrary.Module.RegisterDefinition<CtaAttrs> = {
  // Imported json has no inferred type hence type-cast is necessary.
  metadata:                 ctaModuleMetaData,
  defaultAttrs:             ctaModuleDefaultRenderAttributes,
  defaultPrintedStyleAttrs: ctaModuleDefaultPrintedStyleAttributes,
  renderers:                {
    edit:   CtaEdit,
    styles: ModuleStyles,
  },
  placeholderContent,
  conversionOutline,
};
