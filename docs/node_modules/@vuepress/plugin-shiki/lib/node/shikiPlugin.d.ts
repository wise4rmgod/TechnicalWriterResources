import type { Plugin } from '@vuepress/core';
import type { HighlighterOptions } from 'shiki';
/**
 * Options of @vuepress/plugin-shiki
 */
export declare type ShikiPluginOptions = Pick<HighlighterOptions, 'theme' | 'langs'>;
export declare const shikiPlugin: ({ theme, langs, }?: ShikiPluginOptions) => Plugin;
