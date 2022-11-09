import {render, screen} from '@testing-library/react';
import NotFoundPage from './not-found-page';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {

    render(
      <NotFoundPage />
    );

    const headerElement = screen.getByText('PAGE NOT FOUND');

    expect(headerElement).toBeInTheDocument();
  });
});
