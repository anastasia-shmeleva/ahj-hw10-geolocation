export default function feedEngine(block) {
  if ((block === false) || (block === undefined) || (block === null)) {
    return document.createTextNode('');
  }

  if ((block === true) || (typeof block === 'string') || (typeof block === 'number')) {
    return document.createTextNode(block);
  }

  if (Array.isArray(block)) {
    const fragment = document.createDocumentFragment();

    block.forEach((b) => {
      const element = feedEngine(b);

      fragment.appendChild(element);
    });

    return fragment;
  }

  const element = document.createElement(block.block);

  [].concat(block.cls).filter(Boolean).forEach((cls) => element.classList.add(cls));

  const created = feedEngine(block.created);

  const content = feedEngine(block.content);

  const location = feedEngine(block.location);

  element.appendChild(created);

  element.appendChild(content);

  element.appendChild(location);

  return element;
}
