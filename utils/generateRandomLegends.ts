import rnd from 'random-seed';
import { loremIpsum } from 'lorem-ipsum';
import { LabelInfo } from '../model/chart';
import { Size } from '../hooks/useWindowSize';

// Maximum number of points of interest to generate in the random view
const maxPoints = 30;

// Minimum number of points of interest to generate in the random view
const minPoints = 10;

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
      key: Math.random().toString(),
      name: loremIpsum({
        random: random.random,
        sentenceLowerBound: 1,
        sentenceUpperBound: 4,
      }).split('.')[0],
      cx: random.intBetween(size.width * 0.2, size.width * 0.8),
      cy: random.intBetween(size.height * 0.2, size.height * 0.8),
      tx: size.width / 2,
      ty: size.height / 2,
    }));

  return interestPoints;
};

export default generateRandomLegends;
