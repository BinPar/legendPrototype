// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

/**
 * Mocks the useRouter React hook from Next.js 
 * on a test-case by test-case basis
 * @param props Properties of the mocked router
 */
const mockNextUseRouter = (props: {
  route: string;
  pathname: string;
  query: {};
  asPath: string;
  push?: (url: string, as?: string, options?: {}) => void;
}): void => {
  useRouter.mockImplementation(() => ({
    ...props 
  }));
};

export default mockNextUseRouter;
