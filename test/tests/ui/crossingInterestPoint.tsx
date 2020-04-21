import React from 'react';
import { mount } from 'enzyme';
import InterestPoint from '../../../components/InterestPoint';
import { LabelInfo } from '../../../model/chart';

/**
 * Checks the draw of interest points where they
 * have crossing lines
 */
test('Crossing interest point', () => {

  /**
   * Mocked draw info
   */
  const props: LabelInfo = {
    key: 'test',
    name: 'test',
    labelWidth: 20,
    labelPosition: 'left',
    isCrossed: true,
    cx: 40,
    cy: 70,
    tx: 10,
    ty: 20,
  };

  const lines = [props];

  // Renders the InterestPoint
  const result = mount(
    <svg width={1024} height={720}>
      {lines.map(InterestPoint)}
    </svg>
  );

  // Verify that the Virtual DOM is not changed
  expect(result).toMatchSnapshot();
});
