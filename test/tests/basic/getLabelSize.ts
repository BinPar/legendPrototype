import getLabelSize, {setVirtualLabel, getVirtualLabel} from '../../../utils/getLabelSize';
import { setForceServerSimulation } from '../../../utils/isClient';

/**
 * Generic test to check the label size calculation algorithm
 */
export default test('Check label size calculation', (): void => {
  expect(getLabelSize('Sort Label')).toBeGreaterThan(0);
  expect(getLabelSize('Sort Label')).toBeLessThan(getLabelSize('Longer Label'));
  setForceServerSimulation(true);
  expect(getLabelSize('Sort Label')).toBeGreaterThan(0);
  const lastLabel = getVirtualLabel();
  setVirtualLabel(null);
  expect(getLabelSize('Sort Label')).toBeGreaterThan(0);
  setVirtualLabel(lastLabel);
});
