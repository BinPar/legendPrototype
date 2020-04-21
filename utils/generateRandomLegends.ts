import rnd from 'random-seed';
import { loremIpsum } from 'lorem-ipsum';
import { LabelInfo } from '../model/chart';
import { Size } from '../hooks/useWindowSize';
import { maxPoints, minPoints, margin } from '../settings';
import getLabelSize from './getLabelSize';

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

  // Fills an array with dummy points
  let interestPoints = new Array<LabelInfo>(totalPoints).fill({
    key: '',
    name: '',
    labelWidth: 0,
    labelPosition: 'left',
    cx: 0,
    cy: 0,
    tx: 0,
    ty: 0,
  });

  /**
   * Generates random information for every point
   */
  interestPoints = interestPoints.map((label) => ({
    ...label,
    key: random.string(10),
    name: loremIpsum({
      random: random.random,
      sentenceLowerBound: 1,
      sentenceUpperBound: 4,
    }).split('.')[0],
    cx: random.intBetween(size.width * margin, size.width * (1 - margin)),
    cy: random.intBetween(size.height * margin, size.height * (1 - margin)),
  }));

  /**
   * Calculates the labelWith for every label based
   * on the text of the label
   * and the label position (left for the x of the point
   * is smaller than the half of the screen and y if it
   * is not)
   */
  interestPoints = interestPoints.map((label) => ({
    ...label,
    labelWidth: getLabelSize(label.name),
    labelPosition: label.cx <= size.width / 2 ? 'left' : 'right',
  }));
  
  /**
   * Calculates total points on right and left
   */
  const totalLabels = {
    left: 0,
    right: 0,
  };
  
  interestPoints.forEach((label) => totalLabels[label.labelPosition]++);

  /**
   * We do calculate the vertical separation between each 
   * legend in the left and in the right that involves to divide 
   * the height ov the drawing by the number of legends to 
   * draw increased by one
   */
  const separation = {
    left: size.height / (totalLabels.left + 1),
    right: size.height / (totalLabels.right + 1),
  };

  const currentLabels = {
    left: 0,
    right: 0,
  };

  /**
   * Calculate the end point of the line based on the label position
   */
  interestPoints = interestPoints.map((label) => ({
    ...label,
    tx: label.labelPosition === 'left' ? label.labelWidth : size.width - label.labelWidth,
    ty: (++currentLabels[label.labelPosition]) * separation[label.labelPosition],
  }));

  return interestPoints;
};

export default generateRandomLegends;
