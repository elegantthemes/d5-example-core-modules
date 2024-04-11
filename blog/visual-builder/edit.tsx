import React, {
  type ReactElement, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { map } from 'lodash';

import { useDeepEffect } from '@divi/hooks';
import { ModuleContainer } from '@divi/module';
import { getAttrByMode } from '@divi/module-utils';
import { useFetch } from '@divi/rest';
import { type BlogMetadata, type BlogPost } from '@divi/types';
import { Loading } from '@divi/ui-library';

import { Pagination, PostMeta, PostThumbnail, ReadMore } from './components';
import { moduleClassnames } from './module-classnames';
import { ModuleStyles } from './module-styles';
import { salvattoreInit } from './script';
import { type BlogEditProps } from './types';

/**
 * Renders `Blog` edit component for visual builder.
 *
 * @since ??
 *
 * @param {BlogEditProps} props React component props.
 *
 * @returns {ReactElement}
 */
const BlogEdit = (props: BlogEditProps): ReactElement => {
  /**
   * Setups initial variables.
   */
  const {
    attrs,
    id,
    name,
    elements,
  } = props;


  const postType       = getAttrByMode(attrs?.post?.advanced?.type);
  const postsPerPage   = parseInt(getAttrByMode(attrs?.post?.advanced?.number));
  const categories     = getAttrByMode(attrs?.post?.advanced?.categories);
  const fullwidth      = getAttrByMode(attrs?.fullwidth?.advanced?.enable);
  const dateFormat     = getAttrByMode(attrs?.post?.advanced?.dateFormat);
  const excerptContent = getAttrByMode(attrs?.post?.advanced?.excerptContent);
  const excerptLength  = parseInt(getAttrByMode(attrs?.post?.advanced?.excerptLength));
  const manualExcerpt  = getAttrByMode(attrs?.post?.advanced?.excerptManual);
  const showExcerpt    = getAttrByMode(attrs?.post?.advanced?.showExcerpt);
  const offset         = parseInt(getAttrByMode(attrs?.post?.advanced?.offset));
  const showThumbnail  = getAttrByMode(attrs?.image?.advanced?.enable);
  const showOverlay    = getAttrByMode(attrs?.overlay?.advanced.enable);
  const overlayIcon    = getAttrByMode(attrs?.overlayIcon?.decoration?.icon);
  const HeadingLevel   = getAttrByMode(attrs?.title?.decoration?.font?.font)?.headingLevel;

  const [paged, setPaged] = useState(1);
  const salvattoreRef     = useRef();

  const {
    fetch,
    response: { posts, metadata },
    isLoading,
  } = useFetch<{posts: BlogPost[], metadata: BlogMetadata}>({ posts: [], metadata: {} });


  useDeepEffect(() => {
    fetch({
      method:    'GET',
      restRoute: '/divi/v1/module-data/blog/posts',
      data:      {
        postType,
        postsPerPage,
        paged,
        categories,
        fullwidth,
        dateFormat,
        excerptContent,
        excerptLength,
        manualExcerpt,
        showExcerpt,
        offset,
      },
    }).catch(error => {
      // TODO feat(D5, Logger) - We need to introduce a new logging system to log errors/rejections/etc.
      // eslint-disable-next-line no-console
      console.log(error);
    });
  }, [
    postType,
    postsPerPage,
    paged,
    categories,
    fullwidth,
    dateFormat,
    excerptContent,
    excerptLength,
    manualExcerpt,
    showExcerpt,
    offset,
  ]);

  useEffect(() => {
    setTimeout(() => {
      if (salvattoreRef.current) {
        salvattoreInit(salvattoreRef.current);
      }
    }, 500);
  }, [isLoading, fullwidth]);

  const allPosts = map(posts, post => (
    <article
      key={post.id}
      className={classNames(post?.classNames, {
        /* eslint-disable @typescript-eslint/naming-convention */
        et_pb_post:        true,
        clearfix:          true,
        et_pb_no_thumb:    !! post?.thumbnail?.src && 'off' === showThumbnail ? 'et_pb_no_thumb' : '',
        et_pb_has_overlay: 'on' === showOverlay,
        /* eslint-enable @typescript-eslint/naming-convention */
      })}
    >
      {
        'on' === fullwidth && (
          <PostThumbnail
            post={post}
            showOverlay={showOverlay}
            overlayIcon={overlayIcon}
            enable={attrs?.image?.advanced?.enable}
          />
        )
      }
      {
        'off' === fullwidth && (
          <div className="et_pb_image_container">
            <PostThumbnail
              post={post}
              showOverlay={showOverlay}
              overlayIcon={overlayIcon}
              enable={attrs?.image?.advanced?.enable}
            />
          </div>
        )
      }
      <HeadingLevel className="entry-title">
        <a href={post.permalink}>{post.title}</a>
      </HeadingLevel>
      <PostMeta
        post={post}
        enable={{
          author:     attrs?.meta?.advanced?.showAuthor,
          date:       attrs?.meta?.advanced?.showDate,
          categories: attrs?.meta?.advanced?.showCategories,
          comments:   attrs?.meta?.advanced?.showComments,
        }}
      />
      <div className="post-content">
        <div
          className="post-content-inner"
          // eslint-disable-next-line react/no-danger, @typescript-eslint/naming-convention
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <ReadMore post={post} enable={attrs?.readMore?.advanced?.enable} />
      </div>
    </article>
  ));

  return (
    <ModuleContainer
      attrs={attrs}
      elements={elements}
      id={id}
      stylesComponent={ModuleStyles}
      classnamesFunction={moduleClassnames}
      name={name}
    >
      {elements.styleComponents({
        attrName: 'module',
      })}
      {
        isLoading && (
          <Loading />
        )
      }
      {
        ! isLoading && (
          <React.Fragment>
            {
              'on' === fullwidth
                ? (
                  <div className="et_pb_ajax_pagination_container">
                    {allPosts}
                    <Pagination
                      paged={paged}
                      onChangePage={setPaged}
                      metadata={metadata}
                      enable={attrs?.pagination?.advanced?.enable}
                    />
                  </div>
                )
                : (
                  <div className="et_pb_blog_grid clearfix">
                    <div className="et_pb_ajax_pagination_container">
                      <div ref={salvattoreRef} className="et_pb_salvattore_content" data-columns>
                        { allPosts }
                      </div>
                      <Pagination
                        paged={paged}
                        onChangePage={setPaged}
                        metadata={metadata}
                        enable={attrs?.pagination?.advanced?.enable}
                      />
                    </div>
                  </div>
                )
            }
          </React.Fragment>

        )
      }
    </ModuleContainer>
  );
};

export {
  BlogEdit,
};
