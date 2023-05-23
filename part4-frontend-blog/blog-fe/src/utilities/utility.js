const blogCompare = (a, b) => b.likes - a.likes;

const blogSort = arr => {
  return arr.sort(blogCompare);
};

export default { blogSort };
