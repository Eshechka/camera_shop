import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import NotFound from './not-found';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
        <NotFound />
    );

    const headerElement = screen.getByText('PAGE NOT FOUND');

    expect(headerElement).toBeInTheDocument();
  });
});
