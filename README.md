# 💼 Frontend Mentor - Job Listings with Filtering Solution

This is a solution to the **[Job Listings with Filtering challenge](https://www.frontendmentor.io/challenges/job-listings-with-filtering-ivstIPCt)** on Frontend Mentor. It helps improve JavaScript filtering skills, responsive design, and dynamic content rendering by building a realistic job board with interactive filtering functionality.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Screenshot](#screenshot)
- [Links](#links)
- [My Process](#my-process)
- [Built With](#built-with)
- [What I Learned](#what-i-learned)
- [Continued Development](#continued-development)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

---

## 🧐 Overview

### The Challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Filter job listings based on categories (Role, Level, Languages, Tools)
- Add multiple filters simultaneously
- Remove individual filters or clear all filters at once
- See only job listings that match ALL selected filters
- Experience smooth transitions and responsive design

### Key Features

- **Dynamic Content Loading**: Job data loaded from JSON file
- **Multi-Filter System**: Click any skill tag to add filters
- **Filter Management**: Visual filter bar with remove buttons
- **Responsive Design**: Mobile-first approach with desktop enhancements
- **Interactive Elements**: Hover effects and smooth transitions
- **Featured Jobs**: Special styling for featured positions

---

## 📸 Screenshot

![Job Listings - Desktop View](./design/desktop-design.jpg)
*Desktop view showing job listings with filtering functionality*

![Job Listings - Mobile View](./design/mobile-design.jpg)
*Mobile view with responsive layout and filter system*

---

## 🔗 Links

- **Live Demo**: [Job Listings with Filtering](https://job-finder-initial.vercel.app/)
- **Solution URL**: [Frontend Mentor Solution](https://www.frontendmentor.io/solutions/static-job-listing-JexBJbH1VE)
- **Challenge URL**: [Frontend Mentor Challenge](https://www.frontendmentor.io/challenges/job-listings-with-filtering-ivstIPCt)

---

## 🔨 My Process

I started by analyzing the design and data structure, then built a semantic HTML foundation. I implemented the filtering logic using JavaScript array methods and created a responsive CSS layout that adapts from mobile to desktop. The filtering system uses event delegation and dynamic DOM manipulation for optimal performance.

---

## 🛠️ Built With

- Semantic **HTML5** markup
- **CSS Custom Properties** and **Flexbox**
- **JavaScript ES6+** for interactivity
- **Mobile-first workflow**
- **Responsive design** principles
- **JSON data** for dynamic content
- No frameworks — Pure **Vanilla JavaScript**!

---

## 💡 What I Learned

- **Dynamic filtering with JavaScript**:
```js
const filteredJobs = jobsData.filter(job => {
  const jobTags = [job.role, job.level, ...job.languages, ...job.tools];
  return activeFilters.every(filter => jobTags.includes(filter));
});
```

- **Responsive image handling**:
```html
<picture>
  <source media="(min-width: 768px)" srcset="./images/bg-header-desktop.svg">
  <img src="./images/bg-header-mobile.svg" alt="" class="header-bg">
</picture>
```

- **CSS positioning for mobile logo overlap**:
```css
@media (max-width: 767px) {
  .company-logo {
    position: absolute;
    top: -12px;
    left: 24px;
  }
}
```

- **Event delegation for dynamic content**:
```js
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('job-tag')) {
    addFilter(e.target.dataset.filter);
  }
});
```

---

## 🔁 Continued Development

In future versions, I plan to:

- Add job search functionality with text input
- Implement job bookmarking/favorites
- Add sorting options (date, company, salary)
- Include pagination for large datasets
- Add job detail modal/page
- Implement local storage for filter preferences

---

## 👤 Author

- Website: [Sharnjeet Singh](https://sharn-portfolio.vercel.app/)
- Frontend Mentor: [@sharnjeet21](https://www.frontendmentor.io/profile/sharnjeet21)
- GitHub: [@sharnjeet21](https://github.com/sharnjeet21)
---

## 🙏 Acknowledgments

Special thanks to **Frontend Mentor** for providing such a practical and well-designed challenge that perfectly demonstrates real-world filtering functionality and responsive design principles.