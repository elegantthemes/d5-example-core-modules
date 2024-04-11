import React, { type ReactElement, useEffect, useState } from 'react';

import { __ } from '@wordpress/i18n';

import {
  CheckboxesContainer,
  ColorPickerContainer,
  SelectContainer,
  TextContainer,
  ToggleContainer,
} from '@divi/field-library';
import { GroupContainer } from '@divi/modal';
import {
  AdminLabelGroup,
  BackgroundGroup,
  FieldContainer,
  LinkGroup,
} from '@divi/module';
import { useFetch } from '@divi/rest';
import {
  type BlogAttrs,
  type FieldLibrary,
  type Module,
} from '@divi/types';

import { onCategoriesVisible, onGridBackground } from './callbacks';


const showContent: FieldLibrary.Select.Options = {
  off: {
    label: __('Show Excerpt', 'et_builder'),
  },
  on: {
    label: __('Show Content', 'et_builder'),
  },
};


const defaultCategories = [
  {
    label: __('All Categories', 'et_builder'),
    value: 'all',
  },
  {
    label: __('Current Category', 'et_builder'),
    value: 'current',
  },
];

/**
 * Content panel component for the Blog module settings modal.
 *
 * @since ??
 *
 * @param {Module.Settings.Panel.Props} param0 Content panel props.
 *
 * @returns {ReactElement}
 */
export const SettingsContent = ({
  defaultSettingsAttrs,
}: Module.Settings.Panel.Props<BlogAttrs>): ReactElement => {
  const [categories, setCategories] = useState(defaultCategories);
  const [postTypes, setPostTypes]   = useState<FieldLibrary.Select.Options>({});

  const {
    fetch,
  } = useFetch();

  useEffect(() => {
    fetch({
      method:    'GET',
      restRoute: '/wp/v2/categories',
    }).then((value: { id: string, name: string }[]) => {
      const allCategories: typeof defaultCategories = [];
      value.forEach(item => {
        // setCategories(state => [...state, { label: item.name, value: item.id }]);
        allCategories.push({ label: item.name, value: item.id });
      });

      setCategories(state => [...state, ...allCategories]);
    }).catch(error => {
      // TODO feat(D5, Logger) - We need to introduce a new logging system to log errors/rejections/etc.
      // eslint-disable-next-line no-console
      console.log(error);
    });

    fetch({
      method:    'GET',
      restRoute: '/divi/v1/module-data/blog/types',
    }).then((value: FieldLibrary.Select.Options) => {
      setPostTypes(value);
    }).catch(error => {
      // TODO feat(D5, Logger) - We need to introduce a new logging system to log errors/rejections/etc.
      // eslint-disable-next-line no-console
      console.log(error);
    });
  }, []);

  return (
    <React.Fragment>
      <GroupContainer
        id="content"
        title={__('Content', 'et_builder')}
      >
        <FieldContainer
          attrName="post.advanced.type"
          label={__('Post Type', 'et_builder')}
          description={__('Choose posts of which post type you would like to display.', 'et_builder')}
          features={{
            hover:      false,
            sticky:     false,
            responsive: false,
          }}
          defaultAttr={defaultSettingsAttrs?.post?.advanced?.type}
        >
          <SelectContainer options={postTypes} />
        </FieldContainer>
        <FieldContainer
          attrName="post.advanced.number"
          label={__('Post Count', 'et_builder')}
          description={__('Choose how much posts you would like to display per page.', 'et_builder')}
          features={{
            hover:      false,
            sticky:     false,
            responsive: false,
          }}
        >
          <TextContainer />
        </FieldContainer>
        <FieldContainer
          attrName="post.advanced.categories"
          label={__('Included Categories', 'et_builder')}
          description={__('Choose which categories you would like to include in the feed.', 'et_builder')}
          features={{
            hover:      false,
            sticky:     false,
            responsive: false,
          }}
          visible={onCategoriesVisible}
          defaultAttr={[]}
        >
          <CheckboxesContainer
            options={categories}
          />
        </FieldContainer>
        <FieldContainer
          attrName="post.advanced.dateFormat"
          label={__('Date Format', 'et_builder')}
          description={__('If you would like to adjust the date format, input the appropriate PHP date format here.', 'et_builder')}
          features={{
            hover:      false,
            sticky:     false,
            responsive: false,
          }}
          defaultAttr={defaultSettingsAttrs?.post?.advanced?.dateFormat}
        >
          <TextContainer />
        </FieldContainer>
        <FieldContainer
          attrName="post.advanced.excerptContent"
          label={__('Content Length', 'et_builder')}
          description={__('Showing the full content will not truncate your posts on the index page. Showing the excerpt will only display your excerpt text.', 'et_builder')}
          features={{
            sticky: false,
          }}
          defaultAttr={defaultSettingsAttrs?.post?.advanced?.excerptContent}
        >
          <SelectContainer options={showContent} />
        </FieldContainer>
        <FieldContainer
          attrName="post.advanced.excerptManual"
          label={__('Use Post Excerpts', 'et_builder')}
          description={__('Disable this option if you want to ignore manually defined excerpts and always generate it automatically.', 'et_builder')}
          features={{
            hover:      false,
            sticky:     false,
            responsive: false,
          }}
          defaultAttr={defaultSettingsAttrs?.post?.advanced?.excerptManual}
        >
          <ToggleContainer />
        </FieldContainer>
        <FieldContainer
          attrName="post.advanced.excerptLength"
          label={__('Excerpt Length', 'et_builder')}
          description={__('Define the length of automatically generated excerpts. Leave blank for default ( 270 ) ', 'et_builder')}
          features={{
            hover:      false,
            sticky:     false,
            responsive: false,
          }}
          defaultAttr={defaultSettingsAttrs?.post?.advanced?.excerptLength}
        >
          <TextContainer />
        </FieldContainer>
        <FieldContainer
          attrName="post.advanced.offset"
          label={__('Post Offset Number', 'et_builder')}
          description={__('Choose how many posts you would like to skip. These posts will not be shown in the feed.', 'et_builder')}
          features={{
            hover:      false,
            sticky:     false,
            responsive: false,
          }}
          defaultAttr={defaultSettingsAttrs?.post?.advanced?.offset}
        >
          <TextContainer />
        </FieldContainer>
      </GroupContainer>
      <GroupContainer
        id="elements"
        title={__('Elements', 'et_builder')}
      >
        <FieldContainer
          attrName="image.advanced.enable"
          label={__('Show Featured Image', 'et_builder')}
          description={__('This will turn thumbnails on and off.', 'et_builder')}
          features={{
            sticky: false,
          }}
          defaultAttr={defaultSettingsAttrs?.image?.advanced?.enable}
        >
          <ToggleContainer />
        </FieldContainer>
        <FieldContainer
          attrName="readMore.advanced.enable"
          label={__('Show Read More Button', 'et_builder')}
          description={__('Here you can define whether to show "read more" link after the excerpts or not.', 'et_builder')}
          features={{
            sticky: false,
          }}
          defaultAttr={defaultSettingsAttrs?.readMore?.advanced?.enable}
        >
          <ToggleContainer />
        </FieldContainer>
        <FieldContainer
          attrName="meta.advanced.showAuthor"
          label={__('Show Author', 'et_builder')}
          description={__('Turn on or off the author link.', 'et_builder')}
          features={{
            sticky: false,
          }}
          defaultAttr={defaultSettingsAttrs?.meta?.advanced?.showAuthor}
        >
          <ToggleContainer />
        </FieldContainer>
        <FieldContainer
          attrName="meta.advanced.showDate"
          label={__('Show Date', 'et_builder')}
          description={__('Turn the date on or off.', 'et_builder')}
          features={{
            sticky: false,
          }}
          defaultAttr={defaultSettingsAttrs?.meta?.advanced?.showDate}
        >
          <ToggleContainer />
        </FieldContainer>
        <FieldContainer
          attrName="meta.advanced.showCategories"
          label={__('Show Categories', 'et_builder')}
          description={__('Turn the category links on or off.', 'et_builder')}
          features={{
            sticky: false,
          }}
          defaultAttr={defaultSettingsAttrs?.meta?.advanced?.showCategories}
        >
          <ToggleContainer />
        </FieldContainer>
        <FieldContainer
          attrName="meta.advanced.showComments"
          label={__('Show Comment Count', 'et_builder')}
          description={__('Turn comment count on and off.', 'et_builder')}
          features={{
            sticky: false,
          }}
          defaultAttr={defaultSettingsAttrs?.meta?.advanced?.showComments}
        >
          <ToggleContainer />
        </FieldContainer>
        <FieldContainer
          attrName="post.advanced.showExcerpt"
          label={__('Show Excerpt', 'et_builder')}
          description={__('Turn excerpt on and off.', 'et_builder')}
          features={{
            sticky: false,
          }}
          defaultAttr={defaultSettingsAttrs?.post?.advanced?.showExcerpt}
        >
          <ToggleContainer />
        </FieldContainer>
        <FieldContainer
          attrName="pagination.advanced.enable"
          label={__('Show Pagination', 'et_builder')}
          description={__('Turn pagination on and off.', 'et_builder')}
          features={{
            sticky: false,
          }}
          defaultAttr={defaultSettingsAttrs?.pagination?.advanced?.enable}
        >
          <ToggleContainer />
        </FieldContainer>
      </GroupContainer>
      <LinkGroup />
      <GroupContainer
        id="background"
        title={__('Background', 'et_builder')}
      >
        <FieldContainer
          attrName="masonry.decoration.background"
          subName="color"
          label={__('Grid Tile Background Color', 'et_builder')}
          description=""
          visible={onGridBackground}
        >
          <ColorPickerContainer
            showPickerPalettes={false}
            addTitle={__('Add Background Color', 'et_builder')}
            showPaletteOnPickerActive
          />
        </FieldContainer>
        <BackgroundGroup
          grouped={false}
        />
      </GroupContainer>
      <AdminLabelGroup
        defaultGroupAttr={defaultSettingsAttrs?.module?.meta?.adminLabel}
      />
    </React.Fragment>
  );
};
