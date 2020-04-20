// Mocks useRouter
// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

/**
 * mockNextUseRouter
 * Mocks the useRouter React hook from Next.js on a test-case by test-case basis
 */
const mockNextUseRouter = (props: {
  route: string;
  pathname: string;
  query: {};
  asPath: string;
  push?: (url: string, as?: string, options?: {}) => void;
}): void => {
  useRouter.mockImplementationOnce(() => ({
    ...props 
  }));
};

export default mockNextUseRouter;
