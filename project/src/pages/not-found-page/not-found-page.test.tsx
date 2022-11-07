import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import NotFoundPage from './not-found-page';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
        <NotFoundPage />
    );

    const headerElement = screen.getByText('PAGE NOT FOUND');

    expect(headerElement).toBeInTheDocument();
  });
});
