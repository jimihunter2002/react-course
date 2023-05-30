import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Note from './Note';

test('renders content', () => {
  const note = {
    content: 'Component testing is done using react-testing-library',
    important: true,
  };
  render(<Note note={note} />);

  // const element = screen.getByText(
  //   'Component testing is done using react-testing-library',
  //   { exact: false },
  // );
  const element = screen.findByText(
    'Component testing is done using react-testing-library',
  );

  expect(element).toBeDefined();
});

test('renders content with query selector', () => {
  const note = {
    content: 'Component testing with query selector',
    important: true,
  };
  const { container } = render(<Note note={note} />);

  const div = container.querySelector('.note');
  expect(div).toHaveTextContent('Component testing with query selector');
});

test('clicking button to fire the event handler', async () => {
  const note = {
    content: 'Component testing click button and fire event',
    important: true,
  };

  // mock function
  const mockHandler = jest.fn();
  render(<Note note={note} toggleImportance={mockHandler} />);

  // session is started with statement below
  const user = userEvent.setup();

  const button = screen.getByText('make not important');
  await user.click(button);
  expect(mockHandler.mock.calls).toHaveLength(1);

  //expect(div).toHaveTextContent('Component testing with query selector');
});

test('does not render this', () => {
  const note = {
    content: 'This is a reminder',
    important: true,
  };
  render(<Note note={note} />);

  const element = screen.queryByText('do not want this thing to be rendered');

  expect(element).toBeNull();
});
