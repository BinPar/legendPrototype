import generateRandomLegends from '../../../utils/generateRandomLegends';
import removeCrossingLines from '../../../utils/removeCrossingLines';
import {
  marcCrossingLines,
  haveCrossingLines,
} from '../../../utils/detectCrossingLines';

/**
 * Test to check if the system can fix all the crossing segments
 * situations in 1000 different charts
 */
export default test('Stress test legend generator', (): void => {
  for (let i = 0; i < 1000; i++) {
    let legends = generateRandomLegends(i.toString(), {
      width: 1024,
      height: 768,
    });
    if (haveCrossingLines(legends)) {
      legends = marcCrossingLines(legends);
      expect(
        legends.filter((legend) => legend.isCrossed).length,
      ).toBeGreaterThan(0);
      legends = removeCrossingLines(legends);
      const isCrossingNow = haveCrossingLines(legends);
      if (isCrossingNow) {
        // eslint-disable-next-line no-console
        console.error(`Found one problematic seed: ${i}`);
      }
      expect(isCrossingNow).toBeFalsy();
    }
  }
});
