const projects = [
  'testimonials-grid-section',
  'four-card-feature',
  'signup-form',
  'base-apparel-coming-soon',
  'price-grid-component',
  'ping-coming-soon-page',
  'huddle-landing-page',
];

const projectsList = document.querySelector('.projects-list');

projects.forEach((project, idx) => {
  const link = document.createElement('a'),
    listItem = document.createElement('li'),
    img = document.createElement('img');

  link.href = `/${project}/index.html`;
  link.innerText = `${idx + 1}. ${formatProjectName(project)}`;
  link.setAttribute('target', 'blank');
  img.src = `/${project}/design/desktop-design.jpg`;
  link.prepend(img);
  listItem.appendChild(link);
  projectsList.appendChild(listItem);
});

function formatProjectName(name) {
  return name
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}
