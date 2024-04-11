import React, { type ReactElement } from 'react';

import { __ } from '@wordpress/i18n';

import {
  ColorPickerContainer,
  IconPickerContainer,
  SelectContainer,
  ToggleContainer,
} from '@divi/field-library';
import { GroupContainer } from '@divi/modal';
import {
  AnimationGroup,
  BorderGroup,
  BoxShadowGroup,
  FieldContainer,
  FiltersGroup,
  FontBodyGroup,
  FontGroup,
  SizingGroup,
  SpacingGroup,
  TextGroup,
  TransformGroup,
} from '@divi/module';
import {
  type BlogAttrs,
  type FieldLibrary,
  type Module,
} from '@divi/types';

import { onOverlayEnabled } from './callbacks';


const fullwidth: FieldLibrary.Select.Options = {
  on: {
    label: __('Fullwidth', 'et_builder'),
  },
  off: {
    label: __('Grid', 'et_builder'),
  },
};

/**
 * Design panel component for the Blog module settings modal.
 *
 * @since ??
 *
 * @param {Module.Settings.Panel.Props} param0 Design panel props.
 *
 * @returns {ReactElement}
 */
export const SettingsDesign = ({
  defaultSettingsAttrs,
}: Module.Settings.Panel.Props<BlogAttrs>): ReactElement => (
  <React.Fragment>
    <GroupContainer
      id="layout"
      title={__('Layout', 'et_builder')}
    >
      <FieldContainer
        attrName="fullwidth.advanced.enable"
        label={__('Layout', 'et_builder')}
        description={__('Toggle between the various blog layout types.', 'et_builder')}
        features={{
          hover:      false,
          sticky:     false,
          responsive: false,
        }}
        defaultAttr={defaultSettingsAttrs?.fullwidth?.advanced?.enable}
      >
        <SelectContainer options={fullwidth} />
      </FieldContainer>
    </GroupContainer>
    <GroupContainer
      id="overlay"
      title={__('Overlay', 'et_builder')}
    >
      <FieldContainer
        attrName="overlay.advanced.enable"
        label={__('Featured Image Overlay', 'et_builder')}
        description={__('If enabled, an overlay color and icon will be displayed when a visitors hovers over the featured image of a post.', 'et_builder')}
        features={{
          hover:      false,
          sticky:     false,
          responsive: false,
        }}
      >
        <ToggleContainer />
      </FieldContainer>
      <FieldContainer
        attrName="overlayIcon.decoration.icon"
        subName="color"
        label={__('Overlay Icon Color', 'et_builder')}
        description={__('Here you can define a custom color for the overlay icon', 'et_builder')}
        features={{
          hover: false,
        }}
        visible={onOverlayEnabled}
      >
        <ColorPickerContainer />
      </FieldContainer>
      <FieldContainer
        attrName="overlay.decoration.background"
        subName="color"
        label={__('Overlay Background Color', 'et_builder')}
        description={__('Here you can define a custom color for the overlay', 'et_builder')}
        features={{
          hover: false,
        }}
        visible={onOverlayEnabled}
      >
        <ColorPickerContainer />
      </FieldContainer>
      <FieldContainer
        attrName="overlayIcon.decoration.icon"
        label={__('Overlay Icon', 'et_builder')}
        description={__('Here you can define a custom icon for the overlay', 'et_builder')}
        features={{
          hover: false,
        }}
        visible={onOverlayEnabled}
      >
        <IconPickerContainer />
      </FieldContainer>
    </GroupContainer>
    <GroupContainer
      id="image"
      title={__('Image', 'et_builder')}
    >
      <BorderGroup
        attrName="image.decoration.border"
        grouped={false}
      />
      <BoxShadowGroup
        attrName="image.decoration.boxShadow"
        grouped={false}
      />
      <FiltersGroup
        attrName="image.decoration.filter"
        grouped={false}
      />
    </GroupContainer>
    <TextGroup />
    <FontGroup
      attrName="title.decoration.font"
      groupLabel={__('Title Text', 'et_builder')}
      defaultGroupAttr={defaultSettingsAttrs?.title?.decoration?.font?.asMutable({ deep: true }) ?? {}}
      fields={{
        headingLevel: {
          render: true,
        },
      }}
    />
    <FontGroup
      attrName="meta.decoration.font"
      groupLabel={__('Meta Text', 'et_builder')}
    />
    <FontGroup
      attrName="readMore.decoration.font"
      groupLabel={__('Read More Text', 'et_builder')}
    />
    <FontGroup
      attrName="pagination.decoration.font"
      groupLabel={__('Pagination Text', 'et_builder')}
    />
    <FontBodyGroup
      attrName="content.decoration.bodyFont"
    />
    <SizingGroup />
    <SpacingGroup />
    <BorderGroup
      attrName="post.decoration.border"
    />
    <BoxShadowGroup />
    <FiltersGroup />
    <TransformGroup />
    <AnimationGroup />
  </React.Fragment>
);
