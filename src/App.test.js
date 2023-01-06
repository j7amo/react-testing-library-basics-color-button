import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App, { replaceCamelCaseWithSpaces } from './App';

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

// FUNCTIONAL TESTING
test('button has the correct initial color and text', () => {
  render(<App />);
  // this line of code actually tests a couple of things already:
  // - that we have a button in the DOM
  // - that it has the specified text
  // If these conditions are not fulfilled then we are not going to find the element
  const element = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });
  // IMPORTANT: there is a known bug - asserting the style in a camelCase
  // notation can be false-positive, so to make a 100% correct assertion
  // we should use a kebab-case notation here ("background-color" instead of "backgroundColor"):
  expect(element).toHaveStyle({ 'background-color': 'MediumVioletRed' });
});

test('button turns Midnight Blue after click and changes the text', () => {
  // if we are uncertain about current roles our App elements have, and we have
  // a hard time trying to query an element by role, then there is a very
  // helpful method - "logRoles". To use it we need to
  // - render a component that we want test;
  // - use destructuring to get access to "container" object
  // const { container } = render(<App />);
  // and finally use "logRoles" to get the list of available roles in the container:
  // logRoles(container);
  render(<App />);
  const element = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });

  fireEvent.click(element);

  expect(element).toHaveStyle({ 'background-color': 'MidnightBlue' });
  expect(element).toHaveTextContent('Change to Medium Violet Red');
});

test('button starts enabled and checkbox starts unchecked', () => {
  render(<App />);
  const button = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });
  const checkbox = screen.getByRole('checkbox');

  expect(button).toBeEnabled();
  expect(checkbox).not.toBeChecked();
});

test('button is disabled if checkbox is checked and is re-enabled if checkbox unchecked', () => {
  render(<App />);
  const button = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });
  // if a checkbox has an associated label (which it should have!)
  // then we can specify "name" parameter in the "options" object and
  // in this case "name" will be equal to "label"'s textContent
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});

test('button turns grey when checkbox is checked and has previous color if checkbox is unchecked', () => {
  render(<App />);
  const button = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ 'background-color': 'grey' });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ 'background-color': 'MediumVioletRed' });

  fireEvent.click(button);
  expect(button).toHaveStyle({ 'background-color': 'MidnightBlue' });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ 'background-color': 'grey' });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ 'background-color': 'MidnightBlue' });
});

// UNIT TESTING
describe('replaceCamelCaseWithSpaces inserts spaces before capital letters in camelCase and should', () => {
  test('work for words with no capital letters', () => {
    expect(replaceCamelCaseWithSpaces('Red')).toBe('Red');
  });

  test('work for words with inner capital letters', () => {
    expect(replaceCamelCaseWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });

  test('work for words with outer (beginning or ending with) capital letters', () => {
    expect(replaceCamelCaseWithSpaces('MediumVioletRed')).toBe(
      'Medium Violet Red',
    );
  });
});
