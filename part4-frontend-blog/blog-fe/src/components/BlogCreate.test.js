import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import BlogCreate from './BlogCreate';

test('test new blog is created correctly', async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogCreate createBlog={createBlog} />);
  const inputs = screen.getAllByRole('textbox');
  await user.type(inputs[0], 'this is the new blog title');
  await user.type(inputs[1], 'Karry Diamond');
  await user.type(inputs[2], 'https://fujigarbage.com');

  const createButton = screen.getByText('create');
  await user.click(createButton);
  screen.debug();

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('this is the new blog title');
});
