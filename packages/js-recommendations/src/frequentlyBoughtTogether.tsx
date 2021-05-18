/** @jsx h */
import {
  ProductBaseRecord,
  FrequentlyBoughtTogether,
  FrequentlyBoughtTogetherProps,
} from '@algolia/react-recommendations';
import { h, render } from 'preact';

import { getHTMLElement } from './getHTMLElement';
import { EnvironmentProps } from './types';
import { version } from './version';

export function frequentlyBoughtTogether<TObject extends ProductBaseRecord>({
  container,
  environment,
  ...rest
}: FrequentlyBoughtTogetherProps<TObject> & EnvironmentProps) {
  rest.searchClient.addAlgoliaAgent('js-recommendations', version);

  render(
    <FrequentlyBoughtTogether {...rest} />,
    getHTMLElement(container, environment)
  );
}