/* eslint-disable no-param-reassign */
import { LabelInfo } from '../model/chart';
import isCrossingUsingMode from './isCrossingUsingMode';

/**
 * The who legends will use distinct modes for their elbow mode configuration
 * this are de combinations in order of preference for the system
 */
const elbowCombinationsInPreferenceOrder = [
  // When both lines are not in elbow mode
  [
    { a: false, b: false },
    { a: true, b: false },
    { a: false, b: true },
    { a: true, b: true },
  ],
  // When first line in in elbow mode
  [
    { a: true, b: false },
    { a: true, b: true },
  ],
  // When second line in in elbow mode
  [
    { a: false, b: true },
    { a: true, b: true },
  ],
  // When both are in elbow mode
  [{ a: true, b: true }],
];

/**
 * Check if two lines are crossed in the distinct combinations
 * If any one  works it returns false and sets the configuration that avoid
 * the crossing, else it returns true that will imply that
 * no combination resolves the problem
 * @param {LabelInfo} lineA first line to check
 * @param {LabelInfo} lineB second line to check
 * @param {boolean} allowElbowMode allow the system to use the Elbow mode
 * @returns {boolean} true if the lines do cross each other
 */
const isCrossing = (
  lineA: LabelInfo,
  lineB: LabelInfo,
  allowElbowMode: boolean,
): boolean => {
  // Only straight line used
  let combinations = [{
    a: lineA.useElbowMode,
    b: lineB.useElbowMode,
  }];

  if (allowElbowMode) {
    // Distinct lines combinations
    const combinationIndex =
      (lineA.useElbowMode ? 1 : 0) + (lineB.useElbowMode ? 2 : 0);
    combinations = elbowCombinationsInPreferenceOrder[combinationIndex];
  }

  /**
   * Note: This function do not respect the rules of functional programing because
   * it is altering the entrance params, but it is required for performance optimization
   */
  for (let i = 0; i < combinations.length; i++) {
    const elbowCombination = combinations[i];
    lineA.useElbowMode = elbowCombination.a;
    lineB.useElbowMode = elbowCombination.b;
    if (!isCrossingUsingMode(lineA, lineB)) {
      return false;
    }
  }
  lineA.useElbowMode = combinations[0].a;
  lineB.useElbowMode = combinations[0].b;
  return true;
};

export default isCrossing;
