const postTemplate = (time, post, place) => ({
  block: 'div',
  cls: 'post',
  created: time.map((t) => ({
    block: 'div',
    cls: 'post__header',
    content: t,
  })),
  content: post.map((text) => ({
    block: 'div',
    cls: 'post__body',
    content: text,
  })),
  location: place.map((p) => ({
    block: 'div',
    cls: 'post__footer',
    content: `[${p}]`,
  })),
});

export default postTemplate;
