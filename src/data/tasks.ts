import { Task, CompanyTicket, DailyChallenge } from '@/types';

export const tasks: Task[] = [
  // Topic 1: How the Internet Works
  {
    id: 'TASK-001', topicId: 1, title: 'Research and Document', difficulty: 'Easy', estimatedTime: '30 minutes',
    company: 'TechFlow Inc',
    scenario: 'You just joined TechFlow Inc as a junior developer. Your onboarding task is to create a simple reference document showing your understanding of how the web works. Your tech lead says this knowledge is essential before writing any code.',
    instructions: ['Open a text file or Google Doc', 'Write in your own words: what happens when you type google.com and press Enter (at least 6 steps)', 'List the 4 HTTP methods and one real example of when each is used', 'Draw or describe the difference between client and server', 'Explain what HTTPS is and why it matters'],
    acceptanceCriteria: ['At least 6 steps described for loading a webpage', 'All 4 HTTP methods listed with examples', 'Clear client vs server explanation', 'HTTPS explanation included'],
    hints: ['Think about DNS resolution as the first step', 'Consider what the browser does after receiving the response', 'HTTP methods: think CRUD operations'],
    xpReward: 50,
  },
  {
    id: 'TASK-002', topicId: 1, title: 'Inspect Real HTTP Requests', difficulty: 'Easy', estimatedTime: '45 minutes',
    company: 'TechFlow Inc',
    scenario: 'Your team lead wants to confirm you can use browser developer tools, which developers use every day to debug problems.',
    instructions: ['Open Chrome or any browser', 'Go to any website (example: github.com)', 'Press F12 to open Developer Tools', 'Click the Network tab', 'Refresh the page', 'Click on the first request', 'Find: HTTP method, status code, response headers', 'Find a request that returns JSON data'],
    acceptanceCriteria: ['Method identified correctly', 'Status code found', 'At least one JSON response identified', 'Description of what you observed'],
    hints: ['Look for XHR/Fetch filter in Network tab', 'Status codes: 200 = success, 404 = not found', 'JSON responses often come from API endpoints'],
    xpReward: 50,
  },
  {
    id: 'TASK-003', topicId: 1, title: 'Explain to a Non-Developer', difficulty: 'Medium', estimatedTime: '1 hour',
    company: 'BuildFast Ltd',
    scenario: 'At BuildFast Ltd, developers sometimes present technical concepts to non-technical clients. Your manager asks you to prepare a simple explanation of how websites work.',
    instructions: ['Write an explanation using NO technical jargon', 'Use an analogy (e.g., ordering food at a restaurant)', 'Explain what a developer builds (client vs server)', 'Explain why HTTPS matters to a regular user', 'Keep it under 200 words'],
    acceptanceCriteria: ['No technical jargon used', 'Includes a relatable analogy', 'Covers both client and server concepts', 'Under 200 words', 'HTTPS importance explained simply'],
    hints: ['Restaurant analogy: customer = client, kitchen = server, waiter = API', 'HTTPS = sealed envelope vs open postcard', 'Think about what your parents would understand'],
    xpReward: 50,
  },
  // Topic 2: HTML Fundamentals
  {
    id: 'TASK-004', topicId: 2, title: 'Build a Personal Resume Page', difficulty: 'Easy', estimatedTime: '2 hours',
    company: 'DataCore Systems',
    scenario: 'You joined DataCore Systems as an intern. Your first task is to build your developer profile page using only HTML for the company\'s internal developer directory.',
    instructions: ['Create a file called resume.html', 'Add: name as h1, profile section, skills list (ul/li), education table, contact form', 'Use semantic tags: header, main, section, footer, nav', 'Form must have: name input, email input, message textarea, submit button'],
    acceptanceCriteria: ['Uses at least 10 different HTML tags', 'Has a working form with proper input types', 'Uses semantic HTML', 'Has a table with at least 3 rows'],
    codeStarter: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My Resume</title>\n</head>\n<body>\n  <!-- Build your resume here -->\n</body>\n</html>`,
    hints: ['Use <section> to divide major parts', 'Remember <label> for each form input', 'Table: <table><thead><tr><th>...'],
    xpReward: 50,
  },
  {
    id: 'TASK-005', topicId: 2, title: 'Build a Product Landing Page', difficulty: 'Medium', estimatedTime: '2 hours',
    company: 'BuildFast Ltd',
    scenario: 'BuildFast Ltd is launching a new product. Create the HTML structure for the landing page. The design team will add CSS later.',
    instructions: ['Create landing.html', 'Build: navigation, hero section, features (3), pricing (3 plans), contact form, footer', 'Use proper semantic tags throughout', 'Navigation links should use anchor tags'],
    acceptanceCriteria: ['All 6 sections present', 'Semantic HTML used', 'Navigation with anchor links', 'Pricing table with 3 plans'],
    hints: ['Use <nav> for navigation', '<article> for each feature', '<table> for pricing comparison'],
    xpReward: 50,
  },
  {
    id: 'TASK-006', topicId: 2, title: 'Accessible Form Design', difficulty: 'Medium', estimatedTime: '1.5 hours',
    company: 'TechFlow Inc',
    scenario: 'TechFlow Inc received complaints about inaccessible forms. Rebuild the signup form with proper accessibility.',
    instructions: ['Create form.html', 'Every input must have a linked label (for/id)', 'Use correct input types: email, password, tel, date', 'Add required attribute to mandatory fields', 'Add fieldset with legend for grouping'],
    acceptanceCriteria: ['All inputs have linked labels', 'Correct input types used', 'Required fields marked', 'Fieldset with legend present', 'Tab navigation works'],
    hints: ['for="email" on label, id="email" on input', 'fieldset groups related inputs, legend describes the group'],
    xpReward: 50,
  },
];

// Generate 3 tasks per topic for topics 3-15
for (let topicId = 3; topicId <= 15; topicId++) {
  const companies = ['TechFlow Inc', 'BuildFast Ltd', 'DataCore Systems', 'CloudNine Solutions', 'StartupX'];
  const difficulties: Array<'Easy' | 'Medium' | 'Hard'> = ['Easy', 'Medium', 'Hard'];
  
  for (let t = 0; t < 3; t++) {
    const taskNum = (topicId - 1) * 3 + t + 1;
    tasks.push({
      id: `TASK-${String(taskNum).padStart(3, '0')}`,
      topicId,
      title: `Practice Task ${t + 1}`,
      difficulty: difficulties[t],
      estimatedTime: ['30 minutes', '1 hour', '2 hours'][t],
      company: companies[(topicId + t) % 5],
      scenario: `Your team at ${companies[(topicId + t) % 5]} needs you to apply your knowledge in a real-world scenario.`,
      instructions: ['Read the relevant lesson material', 'Apply the concepts to solve this task', 'Write your solution clearly', 'Test your understanding'],
      acceptanceCriteria: ['Solution demonstrates understanding', 'All requirements addressed', 'Clean and organized response'],
      hints: ['Review the lesson content', 'Think step by step', 'Ask yourself: does this make sense?'],
      xpReward: 50,
    });
  }
}

export function getTasksForTopic(topicId: number): Task[] {
  return tasks.filter(t => t.topicId === topicId).slice(0, 3);
}

export const dailyChallenges: DailyChallenge[] = [
  { id: 'DC-001', topicId: 1, title: 'Explain HTTP methods', difficulty: 'Easy', problem: 'List all HTTP methods and provide a real-world example for each. When would you use PUT vs PATCH?', hints: ['Think about CRUD operations', 'PUT replaces the entire resource'], xpReward: 20 },
  { id: 'DC-002', topicId: 2, title: 'Semantic HTML Challenge', difficulty: 'Easy', problem: 'Convert this div-based layout into semantic HTML:\n<div class="header"><div class="nav">...</div></div>\n<div class="main">...</div>\n<div class="footer">...</div>', hints: ['Replace divs with semantic equivalents'], xpReward: 20 },
  { id: 'DC-003', topicId: 3, title: 'Flexbox Layout', difficulty: 'Medium', problem: 'Create a navigation bar using only Flexbox. Logo on the left, links on the right, vertically centered.', exampleInput: 'Logo | Home About Contact', exampleOutput: '[Logo]                    [Home] [About] [Contact]', hints: ['Use justify-content: space-between'], xpReward: 20 },
  { id: 'DC-004', topicId: 4, title: 'Array Methods', difficulty: 'Medium', problem: 'Given an array of numbers [1,2,3,4,5,6,7,8,9,10], use array methods to: 1) Filter even numbers 2) Double each 3) Sum the result', exampleInput: '[1,2,3,4,5,6,7,8,9,10]', exampleOutput: '60', hints: ['Chain filter().map().reduce()'], xpReward: 20 },
  { id: 'DC-005', topicId: 5, title: 'Async/Await', difficulty: 'Hard', problem: 'Write an async function that fetches data from 3 different API endpoints in parallel, then combines the results into a single object.', hints: ['Use Promise.all()'], xpReward: 20 },
  { id: 'DC-006', topicId: 4, title: 'Object Destructuring', difficulty: 'Easy', problem: 'Given a nested user object, extract the name, city, and first hobby using destructuring.', exampleInput: '{ name: "Alice", address: { city: "NYC" }, hobbies: ["coding", "reading"] }', exampleOutput: 'name = "Alice", city = "NYC", hobby = "coding"', hints: ['Use nested destructuring: { address: { city } }'], xpReward: 20 },
];

export const companyTickets: CompanyTicket[] = [
  {
    id: 'FE-023', company: 'TechFlow Inc', title: 'Build responsive navigation bar', priority: 'High',
    description: 'Our marketing site needs a new navigation bar that works on mobile and desktop. Must use semantic HTML and CSS only.',
    acceptanceCriteria: ['Logo on left, links on right', 'Hamburger menu on mobile', 'Active link highlighted', 'No JavaScript allowed', 'Passes HTML validation'],
    xpReward: 75, requiredLevel: 1,
  },
  {
    id: 'BE-047', company: 'DataCore Systems', title: 'Create user API endpoint', priority: 'High',
    description: 'Build a RESTful API endpoint for user management with proper validation and error handling.',
    acceptanceCriteria: ['GET /users returns all users', 'POST /users creates a new user', 'Input validation on all fields', 'Proper error responses with status codes'],
    xpReward: 100, requiredLevel: 5,
  },
  {
    id: 'FE-089', company: 'BuildFast Ltd', title: 'Implement product card component', priority: 'Medium',
    description: 'Create a reusable React product card component with image, title, price, and add-to-cart button.',
    acceptanceCriteria: ['Responsive design', 'Hover animation', 'Props for all dynamic data', 'Add to cart callback'],
    xpReward: 75, requiredLevel: 3,
  },
  {
    id: 'DB-012', company: 'CloudNine Solutions', title: 'Design database schema', priority: 'Critical',
    description: 'Design a normalized database schema for an e-commerce platform with users, products, orders.',
    acceptanceCriteria: ['At least 5 tables', 'Proper relationships defined', 'Foreign keys set', 'Indexes on frequently queried columns'],
    xpReward: 100, requiredLevel: 7,
  },
  {
    id: 'DV-005', company: 'StartupX', title: 'Dockerize the application', priority: 'Medium',
    description: 'Create Docker configuration for the full-stack application including frontend, backend, and database.',
    acceptanceCriteria: ['Dockerfile for frontend', 'Dockerfile for backend', 'docker-compose.yml', 'Environment variables configured'],
    xpReward: 100, requiredLevel: 10,
  },
];
