import generateRandomLegends from '../../../utils/generateRandomLegends';

/**
 * Test to check the random legend generator
 */
export default test('Check de random legend generator', (): void => {
  const legends = generateRandomLegends('', { width: 320, height: 200});
  expect(legends.length).toBeGreaterThan(1);
  legends.forEach(legend => {
    expect(legend.cx).toBeLessThanOrEqual(320);
    expect(legend.cy).toBeLessThanOrEqual(200);
    expect(legend.cx).toBeGreaterThanOrEqual(0);
    expect(legend.cy).toBeGreaterThanOrEqual(0);
    expect(legend.key).toBeDefined();
    expect(legend.name.length).toBeGreaterThan(1);
  });
});
