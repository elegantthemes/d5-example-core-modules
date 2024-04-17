import React from 'react';
import { shallow } from 'enzyme';

import { PricingList } from '..';


describe('<PricingList />', () => {
  const content = `+This feature is included
  This feature is included
  +This feature is included
  -This feature is included
  -This feature is included`;

  const pricingList = shallow(
    <PricingList
      content={content}
    />,
  );

  it('Should match the snapshot when well formatted parameter is given', () => {
    expect(pricingList.html()).toMatchSnapshot();
  });

  const contentWithP = `<p>+This feature is included</p><p>+This feature is included</p><p>-This feature is included</p>
  <p>-This feature is included</p>`;

  const pricingListWithP = shallow(
    <PricingList
      content={contentWithP}
    />,
  );

  it('Should match the snapshot when content contains <p> tag', () => {
    expect(pricingListWithP.html()).toMatchSnapshot();
  });

  const contentWithDiv = `<div>+This feature is included</div><div>+This feature is included</div><div>-This feature is included</div>
  <div>-This feature is included</div>`;

  const pricingListWithDiv = shallow(
    <PricingList
      content={contentWithDiv}
    />,
  );

  it('Should match the snapshot when content contains <div> tag', () => {
    expect(pricingListWithDiv.html()).toMatchSnapshot();
  });

  const contentAsNumber = 20;

  const pricingListWithNumber = shallow(
    <PricingList
      content={contentAsNumber as unknown as string}
    />,
  );

  it('Should match the snapshot with number content', () => {
    expect(pricingListWithNumber.html()).toMatchSnapshot();
  });

  // eslint-disable-next-line no-undefined
  const contentAsUndefined: unknown = undefined;

  const pricingListWithUndefined = shallow(
    <PricingList
      content={contentAsUndefined as string}
    />,
  );

  it('Should match the snapshot with undefined content', () => {
    expect(pricingListWithUndefined.html()).toMatchSnapshot();
  });
});
