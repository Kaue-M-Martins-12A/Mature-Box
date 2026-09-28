const themeToggle = document.getElementById('theme-toggle') || document.querySelector('.icon-btn');

const logoLink = document.querySelector('.logo a');
if (logoLink) {
  logoLink.style.color = '#ffffff';
  logoLink.style.textDecoration = 'none';
  logoLink.style.borderBottom = 'none';
  logoLink.style.background = 'transparent';
  logoLink.style.outline = 'none';
}

const navLinks = document.querySelectorAll('.nav-links a');
const currentPage = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

navLinks.forEach((link) => {
  const href = (link.getAttribute('href') || '').split('/').pop().toLowerCase();
  const isCurrent = href === currentPage || (currentPage === 'index.html' && (href === '' || href === 'index.html'));

  link.classList.toggle('active', isCurrent);
  link.setAttribute('aria-current', isCurrent ? 'page' : 'false');

  if (!isCurrent) {
    link.style.borderBottom = 'none';
  }
});

if (themeToggle) {
  const sunIcon = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  `;

  const moonIcon = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  `;

  const applyTheme = (isLightMode) => {
    document.body.classList.toggle('claro', isLightMode);
    themeToggle.innerHTML = isLightMode ? sunIcon : moonIcon;

    const label = isLightMode ? 'Alternar para tema escuro' : 'Alternar para tema claro';
    themeToggle.setAttribute('aria-label', label);
    themeToggle.title = label;
  };

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    applyTheme(true);
  } else {
    applyTheme(false);
  }

  themeToggle.addEventListener('click', () => {
    const isLightMode = !document.body.classList.contains('claro');
    applyTheme(isLightMode);
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
  });
}