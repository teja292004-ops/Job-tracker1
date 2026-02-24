// KodNest Premium Build System - Job Notification Tracker Routes

class Router {
  constructor() {
    this.routes = {
      '/': 'dashboard',
      '/dashboard': 'dashboard',
      '/saved': 'saved',
      '/digest': 'digest',
      '/settings': 'settings',
      '/proof': 'proof'
    };
    
    this.init();
  }
  
  init() {
    // Handle initial load
    this.handleRoute();
    
    // Handle navigation clicks
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-route]')) {
        e.preventDefault();
        const path = e.target.getAttribute('data-route');
        this.navigate(path);
      }
    });
    
    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      this.handleRoute();
    });
  }
  
  navigate(path) {
    window.history.pushState({}, '', path);
    this.handleRoute();
  }
  
  handleRoute() {
    const path = window.location.pathname;
    const route = this.routes[path] || 'dashboard';
    this.render(route);
    this.updateActiveLink(path);
  }
  
  render(route) {
    const content = document.getElementById('route-content');
    const pages = {
      dashboard: {
        title: 'Dashboard',
        subtitle: 'This section will be built in the next step.'
      },
      saved: {
        title: 'Saved',
        subtitle: 'This section will be built in the next step.'
      },
      digest: {
        title: 'Digest',
        subtitle: 'This section will be built in the next step.'
      },
      settings: {
        title: 'Settings',
        subtitle: 'This section will be built in the next step.'
      },
      proof: {
        title: 'Proof',
        subtitle: 'This section will be built in the next step.'
      }
    };
    
    const page = pages[route];
    content.innerHTML = `
      <div class="kn-context-header">
        <h1 class="kn-context-header__title">${page.title}</h1>
        <p class="kn-context-header__subtitle">${page.subtitle}</p>
      </div>
    `;
  }
  
  updateActiveLink(path) {
    // Remove active class from all links
    document.querySelectorAll('[data-route]').forEach(link => {
      link.classList.remove('kn-nav__link--active');
    });
    
    // Add active class to current link
    const activeLink = document.querySelector(`[data-route="${path}"]`) || 
                       document.querySelector('[data-route="/dashboard"]');
    if (activeLink) {
      activeLink.classList.add('kn-nav__link--active');
    }
  }
}

// Initialize router when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Router();
  
  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('kn-nav__links--open');
      menuToggle.classList.toggle('kn-nav__toggle--open');
    });
  }
});
