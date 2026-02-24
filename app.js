// KodNest Premium Build System - Job Notification Tracker Routes

class Router {
  constructor() {
    this.routes = {
      '/': 'landing',
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
      landing: this.renderLanding(),
      dashboard: this.renderDashboard(),
      saved: this.renderSaved(),
      digest: this.renderDigest(),
      settings: this.renderSettings(),
      proof: this.renderProof()
    };
    
    content.innerHTML = pages[route] || pages.landing;
  }
  
  renderLanding() {
    return `
      <div class="kn-landing">
        <div class="kn-landing__content">
          <h1 class="kn-landing__headline">Stop Missing The Right Jobs.</h1>
          <p class="kn-landing__subtext">Precision-matched job discovery delivered daily at 9AM.</p>
          <button class="kn-button kn-button--primary kn-button--large" data-route="/settings">Start Tracking</button>
        </div>
      </div>
    `;
  }
  
  renderDashboard() {
    return `
      <div class="kn-empty-state">
        <h3 class="kn-empty-state__title">No jobs yet.</h3>
        <p class="kn-empty-state__description">In the next step, you will load a realistic dataset.</p>
      </div>
    `;
  }
  
  renderSaved() {
    return `
      <div class="kn-context-header">
        <h1 class="kn-context-header__title">Saved Jobs</h1>
        <p class="kn-context-header__subtitle">Jobs you've marked for later review.</p>
      </div>
      <div class="kn-empty-state">
        <h3 class="kn-empty-state__title">No saved jobs yet.</h3>
        <p class="kn-empty-state__description">Save jobs from your dashboard to review them later.</p>
      </div>
    `;
  }
  
  renderDigest() {
    return `
      <div class="kn-context-header">
        <h1 class="kn-context-header__title">Daily Digest</h1>
        <p class="kn-context-header__subtitle">Your personalized job matches delivered at 9AM.</p>
      </div>
      <div class="kn-empty-state">
        <h3 class="kn-empty-state__title">No digest available.</h3>
        <p class="kn-empty-state__description">Your first digest will be generated after you configure your preferences.</p>
      </div>
    `;
  }
  
  renderSettings() {
    return `
      <div class="kn-context-header">
        <h1 class="kn-context-header__title">Preferences</h1>
        <p class="kn-context-header__subtitle">Configure your job matching criteria.</p>
      </div>
      
      <div class="kn-card kn-card--large" style="max-width: 720px;">
        <div class="kn-card__body">
          <div class="kn-input-group" style="margin-bottom: var(--space-md);">
            <label class="kn-label">Role Keywords</label>
            <input type="text" class="kn-input" placeholder="e.g., Product Manager, Senior Engineer">
          </div>
          
          <div class="kn-input-group" style="margin-bottom: var(--space-md);">
            <label class="kn-label">Preferred Locations</label>
            <input type="text" class="kn-input" placeholder="e.g., San Francisco, Remote">
          </div>
          
          <div class="kn-input-group" style="margin-bottom: var(--space-md);">
            <label class="kn-label">Work Mode</label>
            <select class="kn-input">
              <option value="">Select mode</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">Onsite</option>
            </select>
          </div>
          
          <div class="kn-input-group" style="margin-bottom: var(--space-md);">
            <label class="kn-label">Experience Level</label>
            <select class="kn-input">
              <option value="">Select level</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead</option>
              <option value="executive">Executive</option>
            </select>
          </div>
        </div>
        
        <div class="kn-card__footer">
          <button class="kn-button kn-button--primary">Save Preferences</button>
          <button class="kn-button kn-button--secondary">Reset</button>
        </div>
      </div>
    `;
  }
  
  renderProof() {
    return `
      <div class="kn-context-header">
        <h1 class="kn-context-header__title">Proof</h1>
        <p class="kn-context-header__subtitle">Artifact collection and validation.</p>
      </div>
      <div class="kn-empty-state">
        <h3 class="kn-empty-state__title">Proof collection placeholder.</h3>
        <p class="kn-empty-state__description">This section will be built in the next step.</p>
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
