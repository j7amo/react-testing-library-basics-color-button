import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// React Testing Library is highly opinionated (it encourages testers
// to write tests in a special way).
// 2 main PRINCIPLES:
// - we try to do more Functional testing (how our app behaves)
// instead of Unit testing (which is more about testing the internals
// of a unit - function, functional React component etc.);
// - we try to get elements from the Virtual DOM (provided by "render-screen" combo)
// with the help of query methods that reflect the experience
// of visual/mouse users as well as those that use assistive technology. Which basically
// means that we should prioritize using the following order(priority decreases down the list):
// 1) "getByRole"
// 2) "getByLabelText"
// 3) "getByPlaceholderText"
// 4) "getByText"
// 5) "getByDisplayValue"
// 6) "getByAltText"
// 7) "getByTitle"
// 8) "getByTestId" (we use this only as a last resort)
test('renders learn react link', () => {
  render(<App />);
  // so if try to use the 2nd principle here then we can see that out of the box
  // the current test setup is not following this principle because the text we are
  // trying to find is a LINK and "getByText" is not good for this (we can use it of course but
  // if we want to follow the principles we should change it)
  // const linkElement = screen.getByText(/learn react/i);
  // And this is the CORRECT WAY of querying the link:
  // const linkElement = screen.getByRole('link', { name: /learn react/i });
  // expect(linkElement).toBeInTheDocument();
});
