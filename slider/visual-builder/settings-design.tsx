import React, { type ReactElement } from 'react';

import { __ } from '@wordpress/i18n';

import {
  BorderRadiusContainer,
  ColorPickerContainer,
  RangeContainer,
  TextContainer,
  ToggleContainer,
} from '@divi/field-library';
import {
  AnimationGroup,
  BorderGroup,
  BoxShadowGroup,
  ButtonGroupContainer,
  FieldContainer,
  FiltersGroup,
  FontBodyGroup,
  FontGroup,
  GroupContainer,
  onRadiusChange,
  SizingGroup,
  SpacingGroup,
  TextGroup,
  TransformGroup,
} from '@divi/module';
import { sizingUnits } from '@divi/style-library';
import {
  type Module,
  type SliderAttrs,
} from '@divi/types';

import {
  onAutomaticAnimation,
  onUseBackgroundOverlay,
  onUseTextOverlay,
} from './callbacks';


export const SettingsDesign = ({
  defaultSettingsAttrs,
}: Module.Settings.Panel.Props<SliderAttrs>): ReactElement => (
  <React.Fragment>
    <GroupContainer
      id="overlay"
      title={__('Overlay', 'et_builder')}
    >
      <FieldContainer
        attrName="children.slideOverlay.advanced.use"
        label={__('Use Background Overlay', 'et_builder')}
        description={__('When enabled, a custom overlay color will be added above your background image and behind your slider content.', 'et_builder')}
        features={{
          responsive: false,
          hover:      false,
          sticky:     false,
          preset:     ['html'],
        }}
      >
        <ToggleContainer />
      </FieldContainer>
      <FieldContainer
        attrName="children.slideOverlay.decoration.background"
        subName="color"
        label={__('Background Overlay Color', 'et_builder')}
        description={__('Use the color picker to choose a color for the background overlay.', 'et_builder')}
        visible={onUseBackgroundOverlay}
      >
        <ColorPickerContainer />
      </FieldContainer>
      <FieldContainer
        attrName="children.contentOverlay.advanced.use"
        label={__('Use Text Overlay', 'et_builder')}
        description={__('When enabled, a background color is added behind the slider text to make it more readable atop background images.', 'et_builder')}
        features={{
          responsive: false,
          hover:      false,
          sticky:     false,
          preset:     ['html'],
        }}
      >
        <ToggleContainer />
      </FieldContainer>
      <FieldContainer
        attrName="children.contentOverlay.decoration.background"
        subName="color"
        label={__('Text Overlay Color', 'et_builder')}
        description={__('Use the color picker to choose a color for the text overlay.', 'et_builder')}
        visible={onUseTextOverlay}
      >
        <ColorPickerContainer />
      </FieldContainer>
      <FieldContainer
        attrName="children.contentOverlay.decoration.border"
        subName="radius"
        label={__('Text Overlay Border Radius', 'et_builder')}
        description={__('Increasing the border radius will increase the roundness of the overlay corners. Setting this value to 0 will result in squared corners.', 'et_builder')}
        visible={onUseTextOverlay}
        onChange={onRadiusChange}
        defaultAttr={defaultSettingsAttrs?.children?.contentOverlay?.decoration?.border}
      >
        <BorderRadiusContainer />
      </FieldContainer>
    </GroupContainer>

    <GroupContainer
      id="navigation"
      title={__('Navigation', 'et_builder')}
    >
      <FieldContainer
        attrName="arrows.advanced.color"
        label={__('Arrow Color', 'et_builder')}
        description={__('Pick a color to use for the slider arrows that are used to navigate through each slide.', 'et_builder')}
      >
        <ColorPickerContainer />
      </FieldContainer>
      <FieldContainer
        attrName="dotNav.decoration.background"
        subName="color"
        label={__('Dot Navigation Color', 'et_builder')}
        description={__('Pick a color to use for the dot navigation that appears at the bottom of the slider to designate which slide is active.', 'et_builder')}
      >
        <ColorPickerContainer />
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
    </GroupContainer>

    <TextGroup
      defaultGroupAttr={defaultSettingsAttrs?.module?.advanced?.text}
      fields={{
        color: {
          render: false,
        },
      }}
    />
    <FontGroup
      attrName="title.decoration.font"
      groupLabel={__('Title Text', 'et_builder')}
      fields={{
        headingLevel: {
          render: true,
        },
      }}
      defaultGroupAttr={defaultSettingsAttrs?.title?.decoration?.font?.asMutable({ deep: true }) ?? {}}
    />
    <FontBodyGroup
      attrName="content.decoration.bodyFont"
    />
    <ButtonGroupContainer
      attrName="button"
      defaultGroupAttr={defaultSettingsAttrs?.button?.asMutable({ deep: true }) ?? {}}
      fields={{
        fontGroup: {
          component: {
            props: {
              fields: {
                lineHeight: {
                  render: false,
                },
              },
            },
          },
        },
      }}
    />
    <GroupContainer
      id="sizing"
      title={__('Sizing', 'et_builder')}
    >
      <FieldContainer
        attrName="content.decoration.sizing"
        subName="width"
        label={__('Content Width', 'et_builder')}
        description={__('By default, elements will extend the full width of their parent element. If you would like to set a custom static width, you can do so using this option.', 'et_builder')}
        defaultAttr={defaultSettingsAttrs?.content?.decoration?.sizing}
      >
        <RangeContainer
          allowedUnits={sizingUnits}
          defaultUnit="%"
          max={100}
          validateUnit
        />
      </FieldContainer>
      <FieldContainer
        attrName="content.decoration.sizing"
        subName="maxWidth"
        label={__('Content Max Width', 'et_builder')}
        description={__('Setting a maximum width will prevent your element from ever surpassing the defined width value. Maximum width can be used in combination with the standard width setting. Maximum width supersedes the normal width value.', 'et_builder')}
        defaultAttr={defaultSettingsAttrs?.content?.decoration?.sizing}
      >
        <RangeContainer
          allowedUnits={sizingUnits}
          defaultUnit="%"
          max={100}
          validateUnit
        />
      </FieldContainer>
      <SizingGroup
        grouped={false}
      />
    </GroupContainer>
    <SpacingGroup  />
    <BorderGroup />
    <BoxShadowGroup />
    <FiltersGroup />
    <TransformGroup />
    <GroupContainer
      id="animation"
      title={__('Animation', 'et_builder')}
    >
      <AnimationGroup
        grouped={false}
      />
      <FieldContainer
        attrName="module.advanced.auto"
        label={__('Automatic Animation', 'et_builder')}
        description={__('If you would like the slider to slide automatically, without the visitor having to click the next button, enable this option and then adjust the rotation speed below if desired.', 'et_builder')}
        features={{
          responsive: false,
          hover:      false,
          sticky:     false,
          preset:     ['script'],
        }}
      >
        <ToggleContainer />
      </FieldContainer>
      <FieldContainer
        attrName="module.advanced.autoSpeed"
        label={__('Automatic Animation Speed (in ms)', 'et_builder')}
        description={__('Here you can designate how fast the slider fades between each slide, if \'Automatic Animation\' option is enabled above. The higher the number the longer the pause between each rotation.', 'et_builder')}
        visible={onAutomaticAnimation}
        defaultAttr={defaultSettingsAttrs?.module?.advanced?.autoSpeed}
        features={{
          responsive: false,
          hover:      false,
          sticky:     false,
          preset:     ['script'],
        }}
      >
        <TextContainer />
      </FieldContainer>
      <FieldContainer
        attrName="module.advanced.autoIgnoreHover"
        label={__('Continue Automatic Slide on Hover', 'et_builder')}
        description={__('Turning this on will allow automatic sliding to continue on mouse hover.', 'et_builder')}
        visible={onAutomaticAnimation}
        features={{
          responsive: false,
          hover:      false,
          sticky:     false,
          preset:     ['script'],
        }}
      >
        <ToggleContainer />
      </FieldContainer>
    </GroupContainer>
  </React.Fragment>
);
