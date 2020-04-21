/**
 * Checks that we can mock the canvas measureText function
 * Note: This testing works but I've decided to use a different method to 
 * measure label sizes because it do not accept custom typographies
 * and at the end the mocked width is just the number of chars in the string
 * and this is to low to generate crossing lines in the legend model
 */
export default test('Home Page', () => {  
  // Creates a canvas DOM element
  const canvas = document.createElement('canvas');
  // It needs to be created
  expect(canvas).not.toBeNull();
  // We will get the 2d Context of the canvas
  const context = canvas.getContext('2d');
  // It needs to be created, it will not work if we do not have jest-canvas-mock
  // installed and configured in the jest.config.js
  expect(context).not.toBeNull();
  // We set the font
  context.font = '30px Arial';
  // We get the size of both a long and a short text
  const shortTextWidth = context.measureText('Short text').width;
  const longTextWidth = context.measureText('More long text').width;
  // The long text needs to be greater than the sort one
  expect(shortTextWidth).toBeLessThan(longTextWidth);      
});
