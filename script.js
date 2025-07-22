// Global variables
let jobsData = [];
let activeFilters = [];

// DOM elements
const jobListingsContainer = document.getElementById('job-listings');
const filterBar = document.getElementById('filter-bar');
const filterTagsContainer = document.getElementById('filter-tags');
const clearFiltersBtn = document.getElementById('clear-filters');

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadJobsData();
    renderJobListings(jobsData);
    setupEventListeners();
  } catch (error) {
    console.error('Error initializing app:', error);
    showError('Failed to load job listings. Please try again later.');
  }
});

// Load jobs data from JSON file
async function loadJobsData() {
  try {
    const response = await fetch('./data.json');
    if (!response.ok) {
      throw new Error('Failed to fetch jobs data');
    }
    jobsData = await response.json();
  } catch (error) {
    console.error('Error loading jobs data:', error);
    throw error;
  }
}

// Setup event listeners
function setupEventListeners() {
  clearFiltersBtn.addEventListener('click', clearAllFilters);
}

// Render job listings
function renderJobListings(jobs) {
  if (jobs.length === 0) {
    showEmptyState();
    return;
  }

  const jobsHTML = jobs.map(job => createJobCard(job)).join('');
  jobListingsContainer.innerHTML = jobsHTML;
  
  // Add click listeners to job tags
  addTagClickListeners();
}

// Create individual job card HTML
function createJobCard(job) {
  const badges = [];
  if (job.new) badges.push('<span class="job-badge badge-new">New!</span>');
  if (job.featured) badges.push('<span class="job-badge badge-featured">Featured</span>');
  
  const allTags = [job.role, job.level, ...job.languages, ...job.tools];
  const tagsHTML = allTags.map(tag => 
    `<span class="job-tag" data-filter="${tag}">${tag}</span>`
  ).join('');

  return `
    <article class="job-card ${job.featured ? 'featured' : ''}">
      <img src="${job.logo}" alt="${job.company} logo" class="company-logo">
      <div class="job-header">
        <div class="job-content">
          <div class="job-info">
            <div class="company-info">
              <span class="company-name">${job.company}</span>
              ${badges.join('')}
            </div>
            <h2 class="job-title">${job.position}</h2>
            <div class="job-details">
              <span>${job.postedAt}</span>
              <span>${job.contract}</span>
              <span>${job.location}</span>
            </div>
          </div>
          <div class="job-tags">
            ${tagsHTML}
          </div>
        </div>
      </div>
    </article>
  `;
}

// Add click listeners to job tags
function addTagClickListeners() {
  const tags = document.querySelectorAll('.job-tag');
  tags.forEach(tag => {
    tag.addEventListener('click', (e) => {
      const filterValue = e.target.dataset.filter;
      addFilter(filterValue);
    });
  });
}

// Add filter
function addFilter(filterValue) {
  if (!activeFilters.includes(filterValue)) {
    activeFilters.push(filterValue);
    updateFilterBar();
    filterJobs();
  }
}

// Remove filter
function removeFilter(filterValue) {
  activeFilters = activeFilters.filter(filter => filter !== filterValue);
  updateFilterBar();
  filterJobs();
}

// Clear all filters
function clearAllFilters() {
  activeFilters = [];
  updateFilterBar();
  renderJobListings(jobsData);
}

// Update filter bar display
function updateFilterBar() {
  if (activeFilters.length === 0) {
    filterBar.classList.add('hidden');
    return;
  }

  filterBar.classList.remove('hidden');
  
  const filterTagsHTML = activeFilters.map(filter => `
    <div class="filter-tag">
      <span>${filter}</span>
      <button onclick="removeFilter('${filter}')" aria-label="Remove ${filter} filter">
        <img src="./images/icon-remove.svg" alt="Remove filter">
      </button>
    </div>
  `).join('');
  
  filterTagsContainer.innerHTML = filterTagsHTML;
}

// Filter jobs based on active filters
function filterJobs() {
  if (activeFilters.length === 0) {
    renderJobListings(jobsData);
    return;
  }

  const filteredJobs = jobsData.filter(job => {
    const jobTags = [job.role, job.level, ...job.languages, ...job.tools];
    return activeFilters.every(filter => jobTags.includes(filter));
  });

  renderJobListings(filteredJobs);
}

// Show empty state
function showEmptyState() {
  jobListingsContainer.innerHTML = `
    <div class="empty-state">
      <h2>No jobs found</h2>
      <p>Try adjusting your filters to see more results.</p>
    </div>
  `;
}

// Show error state
function showError(message) {
  jobListingsContainer.innerHTML = `
    <div class="empty-state">
      <h2>Error</h2>
      <p>${message}</p>
    </div>
  `;
}

// Make removeFilter available globally for onclick handlers
window.removeFilter = removeFilter;