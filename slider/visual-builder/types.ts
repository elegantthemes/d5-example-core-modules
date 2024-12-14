import { type SliderAttrs } from '@divi/types';

import {
  type ModuleEditProps,
} from '../types-module';


declare global {
  interface Window {
    /* eslint-disable-next-line @typescript-eslint/naming-convention */
    et_pb_slider_init: ($slider: JQuery) => void;
    /* eslint-disable-next-line @typescript-eslint/naming-convention */
    et_fix_slider_height: ($slider: JQuery) => void;
  }
}

export type SliderEditProps = ModuleEditProps<SliderAttrs>;

export type CustomCssFieldKeys = 'slideDescription' | 'slideTitle' | 'slideButton' | 'slideControllers' | 'slideActiveController' | 'slideImage' | 'slideArrows';
