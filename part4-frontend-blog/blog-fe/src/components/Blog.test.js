import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('renders blog and its elements', () => {
  const blog = {
    title: 'this is my blog testing',
    author: 'Tinubu Shetima',
    url: 'https://tinubu.co.uk',
  };
  const onDeleteBlog = jest.fn();
  const onUpdateLikes = jest.fn();

  const { container } = render(
    <Blog
      blog={blog}
      onDeleteBlog={onDeleteBlog}
      onUpdateLikes={onUpdateLikes}
    />,
  );
  const div = container.querySelector('.blog-default');

  expect(div).toHaveTextContent('this is my blog testing');
  expect(div).toHaveTextContent('Tinubu Shetima');

  const urlElem = screen.queryByText('https://tinubu.co.uk');
  expect(urlElem).toBeNull();

  const likeButton = screen.queryByText('like');
  expect(likeButton).not.toBeInTheDocument();
});

test('check blog url and like are displayed after click', async () => {
  const blog = {
    title: 'this is my blog testing',
    author: 'Tinubu Shetima',
    url: 'https://tinubu.co.uk',
    likes: 3,
    user: {
      name: 'testuser',
    },
  };
  const onDeleteBlog = jest.fn();
  const onUpdateLikes = jest.fn();

  const { container } = render(
    <Blog
      blog={blog}
      onDeleteBlog={onDeleteBlog}
      onUpdateLikes={onUpdateLikes}
    />,
  );

  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

  const div = container.querySelector('.blog-details');
  expect(div).toHaveTextContent('https://tinubu.co.uk');
  screen.debug();
  //expect(urlElem).toBeDefined();
  expect(div).toHaveTextContent('3');
});

test('verifies how many times the like button is clicked', async () => {
  const blog = {
    title: 'this is my blog testing',
    author: 'Tinubu Shetima',
    url: 'https://tinubu.co.uk',
    user: {
      name: 'testuser',
    },
  };
  const onDeleteBlog = jest.fn();
  const onUpdateLikes = jest.fn();

  render(
    <Blog
      blog={blog}
      onDeleteBlog={onDeleteBlog}
      onUpdateLikes={onUpdateLikes}
    />,
  );

  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

  const buttonLike = screen.getByText('like');
  await user.click(buttonLike);
  await user.click(buttonLike);
  expect(onUpdateLikes.mock.calls).toHaveLength(2);
});
