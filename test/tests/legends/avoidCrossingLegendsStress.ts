import generateRandomLegends from '../../../utils/generateRandomLegends';
import {
  marcCrossingLines,
  haveCrossingLines,
} from '../../../utils/detectCrossingLines';

/**
 * Test to check if the system can fix all the crossing segments
 * situations in 10000 different charts
 */
export default test('Check de random legend generator', (): void => {
  for (let i = 0; i < 10000; i++) {
    let legends = generateRandomLegends(i.toString(), {
      width: 1024,
      height: 768,
    });
    if (haveCrossingLines(legends)) {
      legends = marcCrossingLines(legends);
      expect(
        legends.filter((legend) => legend.isCrossed).length,
      ).toBeGreaterThan(0);
    }
  }
});
