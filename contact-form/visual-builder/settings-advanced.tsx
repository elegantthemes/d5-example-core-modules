/* eslint-disable @typescript-eslint/naming-convention */
import React, { type ReactElement, useContext } from 'react';
import { set } from 'lodash';

import { moduleContext } from '@divi/context-library';
import {
  ModuleGroups,
} from '@divi/module';
import {
  type ContactFormAttrs,
  type Module,
} from '@divi/types';

/**
 * Advanced panel component for the contact form module settings modal.
 *
 * @since ??
 *
 * @param {Module.Settings.Panel.Props} param0 Advanced panel props.
 *
 * @returns {ReactElement}
 */
export const SettingsAdvanced = ({
  groupConfiguration,
}: Module.Settings.Panel.Props<ContactFormAttrs>): ReactElement => {
  const { moduleId } = useContext(moduleContext);

  // Insert props value to `module-idClasses` group.
  if (groupConfiguration?.['module-idClasses']?.component?.props) {
    const defaultCSSId = {
      desktop: {
        value: {
          id: `et_pb_contact_form_${moduleId}`,
        },
      },
    };

    set(groupConfiguration, ['module-idClasses', 'component', 'props', 'defaultGroupAttr'], defaultCSSId);
  }

  return (
    <ModuleGroups
      groups={groupConfiguration}
    />
  );
};
