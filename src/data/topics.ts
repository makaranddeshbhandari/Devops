import { Topic } from '@/types';

export const topics: Topic[] = [
  {
    id: 1,
    title: 'How the Internet Works',
    stage: 'Foundations',
    stageNumber: 1,
    estimatedDays: 1,
    description: 'Understand HTTP, client-server architecture, DNS, and how browsers render web pages.',
    subtopics: [
      {
        id: '1-1',
        title: 'HTTP and HTTPS',
        content: `When you type a website address in your browser, your computer sends a request to a server. This request travels using a set of rules called HTTP (HyperText Transfer Protocol). HTTPS is the secure version — it encrypts the data so nobody can read it while it travels.

Every website you visit uses this protocol. As a developer, you will use HTTP methods every day:
- **GET** — fetch data from a server
- **POST** — send new data to a server
- **PUT** — update existing data
- **DELETE** — remove data

Understanding these methods is the foundation of building any web application. When you build an API later in this course, you'll implement all four of these methods.

The "S" in HTTPS stands for "Secure." It uses SSL/TLS encryption to protect data in transit. This is why banking sites, login pages, and any site handling sensitive data must use HTTPS. Modern browsers even warn users when a site doesn't use HTTPS.`,
        codeExample: `// Example HTTP request using fetch API
fetch('https://api.example.com/users', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`
      },
      {
        id: '1-2',
        title: 'Client vs Server',
        content: `Your browser is the **client** — it asks for things. The server is a computer somewhere in the world that holds the website files and responds to requests.

When you visit google.com, your browser (client) sends a request to Google's server. The server sends back HTML, CSS, and JavaScript files. Your browser reads those files and shows you the webpage.

As a full stack developer, you will build BOTH the client side (what users see) and the server side (the logic behind it). The client side is often called the "frontend" and the server side is the "backend."

**Frontend (Client):** HTML, CSS, JavaScript, React — everything the user interacts with directly.

**Backend (Server):** Node.js, Express, databases — everything that handles data, authentication, and business logic behind the scenes.

The client and server communicate through HTTP requests and responses. This is the foundation of all web applications.`,
      },
      {
        id: '1-3',
        title: 'How Browsers Work',
        content: `When your browser receives HTML from a server, it reads it top to bottom and builds a tree structure called the **DOM** (Document Object Model). Then it reads CSS and applies styles. Then it runs JavaScript.

Understanding this order is important — it explains why we put CSS in the \`<head>\` tag and JavaScript at the bottom of the \`<body>\` tag (or use the \`defer\` attribute).

**The browser rendering process:**
1. Parse HTML → Build DOM tree
2. Parse CSS → Build CSSOM (CSS Object Model)
3. Combine DOM + CSSOM → Render tree
4. Layout → Calculate position and size of each element
5. Paint → Draw pixels on screen

**Key concept:** The browser is single-threaded, meaning it does one thing at a time. If JavaScript takes too long to run, the page freezes. This is why performance matters and why we'll learn about async programming later.`,
      },
      {
        id: '1-4',
        title: 'DNS and Domains',
        content: `DNS stands for **Domain Name System**. It's like the phonebook of the internet. When you type "google.com," DNS translates that human-readable name into an IP address (like 142.250.80.46) that computers use to find each other.

**How DNS works step by step:**
1. You type "example.com" in your browser
2. Browser checks its cache — has it seen this domain before?
3. If not, it asks the DNS resolver (usually your ISP)
4. DNS resolver finds the IP address for "example.com"
5. Browser connects to that IP address
6. Server at that IP responds with the website

**Domain structure:**
- \`www\` = subdomain
- \`example\` = domain name
- \`.com\` = top-level domain (TLD)

As a developer, you'll register domains, configure DNS records, and point domains to your servers when deploying applications.`,
      },
      {
        id: '1-5',
        title: 'What is an API',
        content: `API stands for **Application Programming Interface**. It's a way for two software programs to communicate with each other. Think of it as a waiter in a restaurant — you (the client) tell the waiter (API) what you want, and the waiter brings it from the kitchen (server).

**REST API** is the most common type of API on the web. It uses HTTP methods:
- \`GET /users\` — get all users
- \`GET /users/1\` — get user with ID 1
- \`POST /users\` — create a new user
- \`PUT /users/1\` — update user with ID 1
- \`DELETE /users/1\` — delete user with ID 1

APIs return data, usually in **JSON** format (JavaScript Object Notation). JSON looks like JavaScript objects and is easy to read and work with.

As a full stack developer, you will both **consume** APIs (call them from your frontend) and **create** APIs (build them on the backend). This is one of the most important skills you'll learn.`,
        codeExample: `// JSON response from an API
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "developer"
}

// Calling an API from JavaScript
const response = await fetch('https://api.example.com/users/1');
const user = await response.json();
console.log(user.name); // "John Doe"`
      }
    ]
  },
  {
    id: 2,
    title: 'HTML Fundamentals',
    stage: 'Foundations',
    stageNumber: 1,
    estimatedDays: 5,
    description: 'Master HTML tags, forms, tables, semantic elements, and accessibility basics.',
    subtopics: [
      {
        id: '2-1',
        title: 'Tags and Structure',
        content: `HTML (HyperText Markup Language) is the skeleton of every webpage. It defines the structure and content. Every HTML document follows this basic structure:

**Key concepts:**
- HTML uses **tags** to define elements: \`<tag>content</tag>\`
- Tags can be **nested** inside each other
- Some tags are **self-closing**: \`<img />\`, \`<br />\`, \`<input />\`
- Every page needs: \`<!DOCTYPE html>\`, \`<html>\`, \`<head>\`, \`<body>\`

The \`<head>\` contains metadata (title, CSS links, meta tags). The \`<body>\` contains visible content. Understanding this structure is essential — every website in the world uses it.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Page</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>This is my first webpage.</p>
</body>
</html>`
      },
      {
        id: '2-2',
        title: 'Forms and Inputs',
        content: `Forms are how users send data to servers. Every login page, signup form, search bar, and contact form uses HTML forms.

**Common input types:** text, email, password, number, date, checkbox, radio, file, submit.

**Important attributes:**
- \`name\` — identifies the data when sent to server
- \`required\` — makes the field mandatory
- \`placeholder\` — shows hint text
- \`type\` — determines input behavior and validation
- \`value\` — sets default value

Forms are critical for any interactive application. You'll use them in every project you build.`,
        codeExample: `<form action="/signup" method="POST">
  <label for="name">Full Name:</label>
  <input type="text" id="name" name="name" required>

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>

  <label for="password">Password:</label>
  <input type="password" id="password" name="password" 
         minlength="8" required>

  <button type="submit">Sign Up</button>
</form>`
      },
      {
        id: '2-3',
        title: 'Tables',
        content: `HTML tables display data in rows and columns. They're perfect for structured data like pricing plans, schedules, and data reports.

**Table tags:**
- \`<table>\` — wrapper
- \`<thead>\` — header section
- \`<tbody>\` — body section  
- \`<tr>\` — table row
- \`<th>\` — header cell (bold, centered by default)
- \`<td>\` — data cell

**Important:** Tables should only be used for tabular data, NOT for page layout. In the early days of the web, developers used tables for layout, but this is now considered bad practice. Use CSS Flexbox and Grid for layout instead.`,
        codeExample: `<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Role</th>
      <th>Experience</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>Frontend Dev</td>
      <td>3 years</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>Backend Dev</td>
      <td>5 years</td>
    </tr>
  </tbody>
</table>`
      },
      {
        id: '2-4',
        title: 'Semantic HTML',
        content: `Semantic HTML uses tags that describe the **meaning** of content, not just its appearance. Instead of using \`<div>\` for everything, use tags that tell browsers and screen readers what the content actually is.

**Semantic tags:**
- \`<header>\` — top section of page or section
- \`<nav>\` — navigation links
- \`<main>\` — main content area (only one per page)
- \`<section>\` — thematic grouping of content
- \`<article>\` — independent, self-contained content
- \`<aside>\` — sidebar or supplementary content
- \`<footer>\` — bottom section

**Why it matters:**
1. **SEO** — search engines understand your content better
2. **Accessibility** — screen readers navigate more easily
3. **Maintainability** — code is easier to read and understand
4. **Standards** — follows web best practices`,
        codeExample: `<header>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>

<main>
  <section>
    <h1>Welcome</h1>
    <article>
      <h2>Latest Post</h2>
      <p>Content here...</p>
    </article>
  </section>
  
  <aside>
    <h3>Related Links</h3>
  </aside>
</main>

<footer>
  <p>&copy; 2024 My Website</p>
</footer>`
      },
      {
        id: '2-5',
        title: 'Accessibility Basics',
        content: `Web accessibility (a11y) means building websites that everyone can use, including people with disabilities. This isn't optional — it's a legal requirement in many countries and the right thing to do.

**Key accessibility practices:**
- Always add \`alt\` text to images
- Use proper heading hierarchy (h1 → h2 → h3, don't skip)
- Ensure sufficient color contrast
- Make all functionality available via keyboard
- Use \`aria-label\` for elements without visible text
- Link \`<label>\` tags to inputs with \`for\`/\`id\`
- Use semantic HTML (it's accessible by default!)

**Testing:** You can test accessibility using browser DevTools (Lighthouse audit) or screen readers like NVDA (Windows) or VoiceOver (Mac).

About 15% of the world's population lives with some form of disability. Building accessible websites means building better websites for everyone.`,
        codeExample: `<!-- Good: Accessible image -->
<img src="team.jpg" alt="Our development team at the office">

<!-- Good: Linked label -->
<label for="search">Search:</label>
<input type="search" id="search" name="search">

<!-- Good: ARIA for icon button -->
<button aria-label="Close menu">
  <svg><!-- X icon --></svg>
</button>

<!-- Good: Skip navigation link -->
<a href="#main-content" class="skip-link">
  Skip to main content
</a>`
      }
    ]
  },
  {
    id: 3, title: 'CSS Fundamentals', stage: 'Foundations', stageNumber: 1, estimatedDays: 7,
    description: 'Learn selectors, box model, Flexbox, Grid, responsive design, and animations.',
    subtopics: [
      { id: '3-1', title: 'Selectors', content: 'CSS selectors target HTML elements for styling. Element selectors (p, h1), class selectors (.className), ID selectors (#idName), attribute selectors, and pseudo-classes (:hover, :focus). Specificity determines which styles win when conflicts occur: inline > ID > class > element.' },
      { id: '3-2', title: 'Box Model', content: 'Every HTML element is a box with: content, padding, border, and margin. Understanding the box model is crucial for layout. Use box-sizing: border-box to make width/height include padding and border.' },
      { id: '3-3', title: 'Flexbox', content: 'Flexbox is a one-dimensional layout system for arranging items in rows or columns. Key properties: display:flex, justify-content, align-items, flex-direction, flex-wrap, gap.' },
      { id: '3-4', title: 'CSS Grid', content: 'CSS Grid is a two-dimensional layout system. Define rows and columns with grid-template-columns and grid-template-rows. Place items with grid-column and grid-row. Perfect for complex page layouts.' },
      { id: '3-5', title: 'Responsive Design', content: 'Responsive design makes websites work on all screen sizes using media queries, relative units (%, em, rem, vw, vh), and flexible layouts. Mobile-first approach: design for mobile, then add complexity for larger screens.' },
      { id: '3-6', title: 'Animations and Transitions', content: 'CSS transitions animate property changes smoothly. CSS animations use @keyframes for complex multi-step animations. Use transform and opacity for performant animations. Transitions for simple hover effects, animations for complex sequences.' },
    ]
  },
  {
    id: 4, title: 'JavaScript Basics', stage: 'JavaScript', stageNumber: 2, estimatedDays: 10,
    description: 'Variables, data types, functions, loops, arrays, objects, DOM manipulation, and events.',
    subtopics: [
      { id: '4-1', title: 'Variables (let, const, var)', content: 'Variables store data. Use const for values that won\'t change, let for values that will. Avoid var (function-scoped, hoisted). const and let are block-scoped.' },
      { id: '4-2', title: 'Data Types', content: 'JavaScript has 7 primitive types: string, number, boolean, null, undefined, symbol, bigint. Plus objects (arrays, functions, dates are all objects). typeof operator checks types.' },
      { id: '4-3', title: 'Functions', content: 'Functions are reusable blocks of code. Function declarations, function expressions, and arrow functions. Parameters, arguments, return values. Functions are first-class citizens in JavaScript.' },
      { id: '4-4', title: 'Loops', content: 'Loops repeat code: for, while, do...while, for...of (arrays), for...in (objects). Array methods like forEach, map, filter, reduce are modern alternatives to loops.' },
      { id: '4-5', title: 'Arrays and Objects', content: 'Arrays are ordered lists: push, pop, map, filter, reduce, find, includes. Objects are key-value pairs. Destructuring extracts values. Spread operator copies/merges.' },
      { id: '4-6', title: 'DOM Manipulation', content: 'The DOM is the browser\'s representation of HTML. Select elements: getElementById, querySelector. Modify: textContent, innerHTML, classList, style. Create/remove elements dynamically.' },
      { id: '4-7', title: 'Events', content: 'Events are user interactions: click, submit, keydown, mouseover. addEventListener attaches handlers. Event object contains info about the event. Event delegation handles events on parent elements.' },
    ]
  },
  {
    id: 5, title: 'JavaScript Advanced', stage: 'JavaScript', stageNumber: 2, estimatedDays: 7,
    description: 'ES6+, promises, async/await, Fetch API, error handling, and localStorage.',
    subtopics: [
      { id: '5-1', title: 'ES6+ Features', content: 'Template literals, destructuring, spread/rest operators, default parameters, optional chaining (?.), nullish coalescing (??), modules (import/export).' },
      { id: '5-2', title: 'Arrow Functions', content: 'Concise syntax: (params) => expression. No own this binding. Implicit return for single expressions. Perfect for callbacks and array methods.' },
      { id: '5-3', title: 'Promises', content: 'Promises represent future values. States: pending, fulfilled, rejected. .then() for success, .catch() for errors, .finally() always runs. Promise.all() for parallel operations.' },
      { id: '5-4', title: 'Async / Await', content: 'async/await is syntactic sugar over promises. async functions return promises. await pauses execution until promise resolves. try/catch for error handling. Makes async code look synchronous.' },
      { id: '5-5', title: 'Fetch API', content: 'fetch() makes HTTP requests. Returns a promise. response.json() parses JSON. Headers, methods (GET, POST, PUT, DELETE). Handle errors with try/catch.' },
      { id: '5-6', title: 'Error Handling', content: 'try/catch/finally blocks. throw new Error(). Custom error classes. Always handle errors in async code. Graceful degradation for better UX.' },
      { id: '5-7', title: 'LocalStorage', content: 'localStorage stores key-value pairs in the browser. setItem, getItem, removeItem. Data persists after browser close. JSON.stringify/parse for objects. 5MB limit per origin.' },
    ]
  },
  {
    id: 6, title: 'React Basics', stage: 'Frontend Framework', stageNumber: 3, estimatedDays: 10,
    description: 'Components, props, state, JSX, conditional rendering, lists and keys.',
    subtopics: [
      { id: '6-1', title: 'Components', content: 'Components are reusable UI building blocks. Functional components are JavaScript functions that return JSX. One component per file. PascalCase naming convention.' },
      { id: '6-2', title: 'Props', content: 'Props pass data from parent to child components. Read-only (immutable). Destructure in function parameters. PropTypes or TypeScript for type checking.' },
      { id: '6-3', title: 'State', content: 'State is data that changes over time. useState hook creates state variables. State updates trigger re-renders. State is private to the component. Lift state up for shared data.' },
      { id: '6-4', title: 'JSX', content: 'JSX is JavaScript + HTML. Use {} for JavaScript expressions. className instead of class. camelCase for attributes. Fragments (<></>) to return multiple elements.' },
      { id: '6-5', title: 'Conditional Rendering', content: 'Show/hide elements based on conditions. Ternary operator, && operator, early returns. Switch statements for multiple conditions.' },
      { id: '6-6', title: 'Lists and Keys', content: 'Render arrays with .map(). Keys help React identify changes. Use unique, stable keys (not array index). Keys must be unique among siblings.' },
    ]
  },
  {
    id: 7, title: 'React Advanced', stage: 'Frontend Framework', stageNumber: 3, estimatedDays: 7,
    description: 'Hooks, React Router, API integration, forms, and Context API.',
    subtopics: [
      { id: '7-1', title: 'Hooks (useState, useEffect, useRef)', content: 'useEffect handles side effects: API calls, subscriptions, timers. Dependency array controls when it runs. useRef accesses DOM elements and stores mutable values without re-renders.' },
      { id: '7-2', title: 'React Router', content: 'Client-side routing without page reloads. BrowserRouter, Routes, Route, Link, NavLink. useNavigate for programmatic navigation. Dynamic routes with useParams.' },
      { id: '7-3', title: 'API Calls from React', content: 'Fetch data in useEffect. Loading and error states. Display data in components. React Query for advanced data fetching with caching and refetching.' },
      { id: '7-4', title: 'Forms in React', content: 'Controlled components: state controls input values. onChange handlers update state. Form submission with onSubmit. Form validation libraries: React Hook Form, Formik.' },
      { id: '7-5', title: 'Context API', content: 'Share state across components without prop drilling. createContext, Provider, useContext. Good for theme, auth, language. Not a replacement for all state management.' },
    ]
  },
  {
    id: 8, title: 'Git and GitHub', stage: 'Tools', stageNumber: 4, estimatedDays: 3,
    description: 'Version control with Git, branches, pull requests, and team collaboration.',
    subtopics: [
      { id: '8-1', title: 'git init, add, commit, push', content: 'Initialize repos, stage changes, commit with messages, push to remote. The basic Git workflow every developer uses daily.' },
      { id: '8-2', title: 'Branches', content: 'Branches allow parallel development. main/master is the primary branch. Feature branches for new work. Merge branches when ready.' },
      { id: '8-3', title: 'Pull Requests', content: 'PRs propose changes for review. Code review process. Approve, request changes, merge. Essential for team collaboration.' },
      { id: '8-4', title: 'Working in Teams', content: 'Git flow, merge conflicts, rebasing, code reviews. Communication and collaboration best practices.' },
      { id: '8-5', title: 'GitHub Profile Setup', content: 'Professional README, pinned repositories, contribution graph. GitHub Pages for portfolio. Open source contributions.' },
    ]
  },
  {
    id: 9, title: 'Package Managers and Terminal', stage: 'Tools', stageNumber: 4, estimatedDays: 2,
    description: 'npm, package management, terminal commands, and project configuration.',
    subtopics: [
      { id: '9-1', title: 'npm Basics', content: 'npm (Node Package Manager) installs third-party packages. npm init, npm install, npm run. Global vs local packages.' },
      { id: '9-2', title: 'Installing Packages', content: 'npm install package-name. Dependencies vs devDependencies. Semantic versioning. npm update, npm uninstall.' },
      { id: '9-3', title: 'Terminal Commands', content: 'Essential commands: cd, ls, mkdir, rm, cp, mv, cat, echo. Navigate filesystem, manage files, run scripts.' },
      { id: '9-4', title: 'package.json', content: 'Project manifest file. Scripts, dependencies, metadata. npm scripts for automation. Lock files for reproducible installs.' },
    ]
  },
  {
    id: 10, title: 'Node.js and Express', stage: 'Backend', stageNumber: 5, estimatedDays: 10,
    description: 'Server-side JavaScript with Node.js, Express framework, and REST API creation.',
    subtopics: [
      { id: '10-1', title: 'What is a Server', content: 'Servers listen for requests and send responses. Node.js lets you use JavaScript on the server. Event-driven, non-blocking I/O model.' },
      { id: '10-2', title: 'Node.js Basics', content: 'Node.js runtime, modules (require/import), file system, path module. Built-in modules vs npm packages.' },
      { id: '10-3', title: 'Express Setup', content: 'Express is a minimal web framework. npm install express. Create server, listen on port. Minimal boilerplate to get started.' },
      { id: '10-4', title: 'Routes', content: 'Define endpoints: app.get(), app.post(), app.put(), app.delete(). Route parameters. Query strings. Router for organizing routes.' },
      { id: '10-5', title: 'Middleware', content: 'Functions that run between request and response. Logging, authentication, error handling, CORS. app.use() to apply middleware.' },
      { id: '10-6', title: 'REST API Creation', content: 'Design RESTful endpoints. CRUD operations. Status codes. JSON responses. API testing with Postman or Thunder Client.' },
      { id: '10-7', title: 'Request and Response', content: 'req.body, req.params, req.query. res.json(), res.status(), res.send(). Request validation. Error responses.' },
    ]
  },
  {
    id: 11, title: 'Databases - SQL', stage: 'Backend', stageNumber: 5, estimatedDays: 7,
    description: 'Relational databases, MySQL, CRUD operations, JOINs, and normalization.',
    subtopics: [
      { id: '11-1', title: 'What is a Database', content: 'Databases store structured data persistently. Relational (SQL) vs Non-relational (NoSQL). Tables, rows, columns. ACID properties.' },
      { id: '11-2', title: 'MySQL Basics', content: 'MySQL is a popular relational database. CREATE DATABASE, CREATE TABLE. Data types: INT, VARCHAR, TEXT, DATE, BOOLEAN.' },
      { id: '11-3', title: 'SELECT, INSERT, UPDATE, DELETE', content: 'CRUD operations in SQL. WHERE clauses for filtering. ORDER BY, LIMIT. Aggregate functions: COUNT, SUM, AVG.' },
      { id: '11-4', title: 'JOINs', content: 'Combine data from multiple tables. INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN. ON clause for join conditions.' },
      { id: '11-5', title: 'Indexes', content: 'Indexes speed up queries. CREATE INDEX. Primary keys are automatic indexes. Trade-off: faster reads, slower writes.' },
      { id: '11-6', title: 'Relationships', content: 'One-to-one, one-to-many, many-to-many. Foreign keys link tables. Junction tables for many-to-many.' },
      { id: '11-7', title: 'Normalization', content: 'Organize data to reduce redundancy. Normal forms (1NF, 2NF, 3NF). When to denormalize for performance.' },
    ]
  },
  {
    id: 12, title: 'Database - MongoDB', stage: 'Backend', stageNumber: 5, estimatedDays: 4,
    description: 'NoSQL databases, MongoDB, CRUD operations, and Mongoose ODM.',
    subtopics: [
      { id: '12-1', title: 'NoSQL Concept', content: 'NoSQL databases store data differently than SQL. Document-based (MongoDB), key-value, graph, column-family. Flexible schemas, horizontal scaling.' },
      { id: '12-2', title: 'Collections and Documents', content: 'Collections are like tables, documents are like rows. Documents are JSON-like (BSON). No fixed schema. Nested documents and arrays.' },
      { id: '12-3', title: 'CRUD Operations', content: 'insertOne, insertMany, find, findOne, updateOne, updateMany, deleteOne, deleteMany. Query operators: $gt, $lt, $in, $regex.' },
      { id: '12-4', title: 'Mongoose with Node.js', content: 'Mongoose is an ODM (Object Document Mapper). Schemas define document structure. Models provide CRUD methods. Validation, middleware, population.' },
    ]
  },
  {
    id: 13, title: 'Full Stack Integration', stage: 'Connecting Everything', stageNumber: 6, estimatedDays: 7,
    description: 'Connect React frontend with Node.js backend, authentication, and security.',
    subtopics: [
      { id: '13-1', title: 'React Frontend Calling Node.js API', content: 'Fetch/Axios from React to Express endpoints. Proxy setup in development. Environment variables for API URLs.' },
      { id: '13-2', title: 'API Calling Database', content: 'Express routes query database. Async/await with database operations. Error handling. Data validation before database operations.' },
      { id: '13-3', title: 'CORS Setup', content: 'Cross-Origin Resource Sharing allows frontend to call backend on different ports/domains. cors middleware in Express.' },
      { id: '13-4', title: 'Environment Variables', content: '.env files store sensitive configuration. dotenv package. Never commit secrets to Git. Different configs for dev/prod.' },
      { id: '13-5', title: 'Authentication with JWT', content: 'JSON Web Tokens for stateless authentication. Sign tokens on login. Verify tokens on protected routes. Token expiration and refresh.' },
      { id: '13-6', title: 'Password Hashing', content: 'Never store plain text passwords. bcrypt for hashing. Salt rounds. Compare hashed passwords on login.' },
      { id: '13-7', title: 'Role Based Access', content: 'Different permissions for different users. Admin, user, moderator roles. Middleware to check roles. Protected routes.' },
    ]
  },
  {
    id: 14, title: 'Docker and Deployment', stage: 'Deployment and DevOps', stageNumber: 7, estimatedDays: 7,
    description: 'Containerization with Docker and deploying applications to the cloud.',
    subtopics: [
      { id: '14-1', title: 'What is Docker', content: 'Docker packages applications into containers. Containers include everything needed to run. Consistent environments across dev/staging/prod.' },
      { id: '14-2', title: 'Dockerfile', content: 'Blueprint for building Docker images. FROM, COPY, RUN, CMD instructions. Multi-stage builds for smaller images.' },
      { id: '14-3', title: 'Docker Compose', content: 'Define multi-container applications. docker-compose.yml file. Link services (app + database). One command to start everything.' },
      { id: '14-4', title: 'Deploying with Vercel', content: 'Vercel deploys frontend apps instantly. Connect GitHub repo. Automatic deployments on push. Custom domains and environment variables.' },
      { id: '14-5', title: 'Deploying with Railway', content: 'Railway deploys full-stack apps. Database hosting. Environment variables. Automatic scaling.' },
      { id: '14-6', title: 'Environment Configs', content: 'Different configurations for development, staging, production. Environment variables. Config management best practices.' },
    ]
  },
  {
    id: 15, title: 'Final Capstone Project', stage: 'Deployment and DevOps', stageNumber: 7, estimatedDays: 14,
    description: 'Build a complete E-commerce application with React, Node.js, MySQL, JWT auth, Docker, and deploy live.',
    subtopics: [
      { id: '15-1', title: 'Project Planning', content: 'Define requirements, create wireframes, plan database schema, set up project structure. Agile methodology basics.' },
      { id: '15-2', title: 'React Frontend', content: 'Build product listing, cart, checkout, user dashboard. Responsive design. State management. API integration.' },
      { id: '15-3', title: 'Node.js Backend', content: 'Express API for products, users, orders. Authentication middleware. Input validation. Error handling.' },
      { id: '15-4', title: 'MySQL Database', content: 'Design schema: users, products, orders, order_items. Relationships. Indexes. Seed data.' },
      { id: '15-5', title: 'JWT Authentication', content: 'Signup, login, protected routes. Password hashing. Token refresh. Role-based access control.' },
      { id: '15-6', title: 'Docker Setup', content: 'Dockerize frontend, backend, and database. Docker Compose for the full stack. Environment configuration.' },
      { id: '15-7', title: 'Deploy Live', content: 'Deploy to production. Domain setup. SSL certificate. Monitoring and maintenance basics.' },
    ]
  },
];
