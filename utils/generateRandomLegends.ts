import rnd from 'random-seed';
import { loremIpsum } from 'lorem-ipsum';
import { LabelInfo } from '../model/chart';
import { Size } from '../hooks/useWindowSize';
import { maxPoints, minPoints, margin } from '../settings';

/**
 * Generates a random Label Info array based on a deterministic seed
 * @param {string} seed seed of the Label Info array to generate
 * @param {Size} size  size of the window
 */
const generateRandomLegends = (seed: string, size: Size): LabelInfo[] => {
  // Creates the random generator based on a specific seed
  const random = rnd.create(seed);

  // Total Number of points to generate
  const totalPoints = random.intBetween(minPoints, maxPoints);

  // Generates random information for every point
  const interestPoints = new Array<LabelInfo>(totalPoints)
    .fill({ key: '', name: '', cx: 0, cy: 0, tx: 0, ty: 0 })
    .map(() => ({
      key: random.string(10),
      name: loremIpsum({
        random: random.random,
        sentenceLowerBound: 1,
        sentenceUpperBound: 4,
      }).split('.')[0],
      cx: random.intBetween(size.width * margin, size.width * (1 - margin)),
      cy: random.intBetween(size.height * margin, size.height * (1 - margin)),
      tx: size.width / 2,
      ty: size.height / 2,
    }));

  return interestPoints;
};

export default generateRandomLegends;
