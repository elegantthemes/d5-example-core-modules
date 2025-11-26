/* eslint-disable @typescript-eslint/naming-convention */
import {
  type FieldLibrary,
  type ModuleConversionOutline,
} from '@divi/types';

import { type ContactFieldCondition } from './types';

/**
 * This function parse the conversion string from D4 to `SortableList` fields value.
 *
 * @since ??
 *
 * @param {string} value String conversion string from which we need to parse.
 *
 * @returns {Array}
 */
const sortableListConverter = (value: string): FieldLibrary.SortableList.Value => {
  let options = value.replace(/%91/g, '[');
  options     = options.replace(/%93/g, ']');
  options     = decodeURI(options);

  const sortableOptions = JSON.parse(options) as FieldLibrary.SortableList.Value;

  return sortableOptions.map(option => ({
    ...option,
    dragID:  option?.dragID?.toString(),
    checked: option?.checked?.toString(),
  }));
};

// The mappings for various properties used in a module conversion process.
export const conversionOutline: ModuleConversionOutline = {
  advanced: {
    borders: {
      default: 'module.decoration.border',
      focus:   'fieldItem.decoration.border',
    },
    box_shadow: {
      default: 'module.decoration.boxShadow',
    },
    display_conditions: 'module.decoration.conditions',
    filters:            {
      default: 'module.decoration.filters',
    },
    form_field: {
      form_field: 'field',
    },
    fonts: {
      form_field: 'field.decoration.font',
    },
    module:          'module.advanced.htmlAttributes',
    text:            'module.advanced.text',
    animation:       'module.decoration.animation',
    background:      'module.decoration.background',
    disabled_on:     'module.decoration.disabledOn',
    overflow:        'module.decoration.overflow',
    position_fields: 'module.decoration.position',
    scroll:          'module.decoration.scroll',
    height:          'module.decoration.sizing',
    max_width:       'module.decoration.sizing',
    margin_padding:  'module.decoration.spacing',
    sticky:          'module.decoration.sticky',
    transform:       'module.decoration.transform',
    transition:      'module.decoration.transition',
    z_index:         'module.decoration.zIndex',
    admin_label:     'module.meta.adminLabel',
  },

  css: {
    before:       'css.*.before',
    main_element: 'css.*.mainElement',
    after:        'css.*.after',
    free_form:    'css.*.freeForm',
  },

  module: {
    predefined_field:           'fieldItem.advanced.predefinedField.*',
    hidden:                     'fieldItem.advanced.hidden.*',
    use_focus_border_color:     'fieldItem.advanced.useFocusBorder.*',
    allowed_symbols:            'fieldItem.advanced.allowedSymbols.*',
    booleancheckbox_options:    'fieldItem.advanced.booleanCheckboxOptions.*',
    checkbox_checked:           'fieldItem.advanced.checkboxChecked.*',
    checkbox_options:           'fieldItem.advanced.checkboxOptions.*',
    conditional_logic:          'conditionalLogic.advanced.enable.*',
    conditional_logic_relation: 'conditionalLogic.advanced.relation.*',
    conditional_logic_rules:    'conditionalLogic.innerContent.*',
    field_id:                   'fieldItem.advanced.id.*',
    field_title:                'fieldItem.innerContent.*',
    field_type:                 'fieldItem.advanced.type.*',
    fullwidth_field:            'fieldItem.advanced.fullwidth.*',
    max_length:                 'fieldItem.advanced.maxLength.*',
    min_length:                 'fieldItem.advanced.minLength.*',
    radio_options:              'fieldItem.advanced.radioOptions.*',
    required_mark:              'fieldItem.advanced.required.*',
    select_options:             'fieldItem.advanced.selectOptions.*',
  },
  valueExpansionFunctionMap: {
    conditional_logic_rules: (value: string): ContactFieldCondition[] => {
      let conversionString = value.replace(/%91/g, '[');
      conversionString     = conversionString.replace(/%93/g, ']');
      conversionString     = decodeURI(conversionString);
      return JSON.parse(conversionString) as ContactFieldCondition[];
    },
    select_options:   sortableListConverter,
    radio_options:    sortableListConverter,
    checkbox_options: sortableListConverter,
  },
};
