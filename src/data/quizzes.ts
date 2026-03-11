import { QuizQuestion } from '@/types';

export const quizQuestions: QuizQuestion[] = [
  // Topic 1: How the Internet Works
  { id: 1, topicId: 1, subtopicId: '1-1', question: 'What does HTTP stand for?', options: ['HyperText Transfer Protocol', 'High Transfer Text Program', 'HyperText Transport Process', 'Host Transfer Text Protocol'], correctAnswer: 0, explanation: 'HTTP stands for HyperText Transfer Protocol. It is the foundation of data communication on the web.' },
  { id: 2, topicId: 1, subtopicId: '1-1', question: 'Which HTTP method is used to FETCH data from a server?', options: ['POST', 'PUT', 'GET', 'DELETE'], correctAnswer: 2, explanation: 'GET is used to retrieve/fetch data. It does not change anything on the server.' },
  { id: 3, topicId: 1, subtopicId: '1-1', question: 'What is the difference between HTTP and HTTPS?', options: ['HTTPS is faster than HTTP', 'HTTPS encrypts data, HTTP does not', 'HTTP is newer than HTTPS', 'They are exactly the same'], correctAnswer: 1, explanation: 'HTTPS uses SSL/TLS encryption to secure data transfer.' },
  { id: 4, topicId: 1, subtopicId: '1-2', question: 'In web development, what is the "client"?', options: ['The database that stores data', 'The server that sends responses', 'The browser that makes requests', 'The CSS file that styles the page'], correctAnswer: 2, explanation: 'The client is the browser or app that sends requests to a server and displays the response.' },
  { id: 5, topicId: 1, subtopicId: '1-2', question: 'What does a web server do?', options: ['Designs the visual layout', 'Stores files and responds to requests', 'Manages browser history', 'Creates CSS styles'], correctAnswer: 1, explanation: 'A server stores files and logic, listens for requests, and sends back responses.' },
  { id: 6, topicId: 1, subtopicId: '1-4', question: 'What is DNS?', options: ['A programming language', 'A system that translates domain names to IP addresses', 'A database management system', 'A security certificate'], correctAnswer: 1, explanation: 'DNS converts human-readable domain names into IP addresses.' },
  { id: 7, topicId: 1, subtopicId: '1-1', question: 'When you see a padlock icon in your browser, it means:', options: ['Government owned site', 'HTTPS connection is encrypted', 'Website is blocked', 'No viruses'], correctAnswer: 1, explanation: 'The padlock means the connection is secured with HTTPS/SSL.' },
  { id: 8, topicId: 1, subtopicId: '1-3', question: 'What is the correct order when visiting a webpage?', options: ['Browser renders → Server responds → User requests', 'Server sends → Browser requests → User sees', 'User requests → Server responds → Browser renders', 'Browser stores → User requests → Server sends'], correctAnswer: 2, explanation: 'User types URL → browser sends request → server responds → browser renders.' },
  { id: 9, topicId: 1, subtopicId: '1-5', question: 'Which HTTP status code means "page not found"?', options: ['200', '301', '404', '500'], correctAnswer: 2, explanation: '404 means the requested resource was not found.' },
  { id: 10, topicId: 1, subtopicId: '1-5', question: 'What does "full stack" mean in development?', options: ['Working only on the database', 'Working only on visual design', 'Working on both frontend and backend', 'Working only on deployment'], correctAnswer: 2, explanation: 'Full stack means you can build both the frontend and the backend.' },

  // Topic 1 Exam questions (15 questions)
  ...generateExamQuestions(1),
  
  // Topics 2-15: Generate quiz questions for each
  ...generateTopicQuizQuestions(2, 'HTML Fundamentals', ['2-1','2-2','2-3','2-4','2-5']),
  ...generateTopicQuizQuestions(3, 'CSS Fundamentals', ['3-1','3-2','3-3','3-4','3-5','3-6']),
  ...generateTopicQuizQuestions(4, 'JavaScript Basics', ['4-1','4-2','4-3','4-4','4-5','4-6','4-7']),
  ...generateTopicQuizQuestions(5, 'JavaScript Advanced', ['5-1','5-2','5-3','5-4','5-5','5-6','5-7']),
  ...generateTopicQuizQuestions(6, 'React Basics', ['6-1','6-2','6-3','6-4','6-5','6-6']),
  ...generateTopicQuizQuestions(7, 'React Advanced', ['7-1','7-2','7-3','7-4','7-5']),
  ...generateTopicQuizQuestions(8, 'Git and GitHub', ['8-1','8-2','8-3','8-4','8-5']),
  ...generateTopicQuizQuestions(9, 'Package Managers', ['9-1','9-2','9-3','9-4']),
  ...generateTopicQuizQuestions(10, 'Node.js and Express', ['10-1','10-2','10-3','10-4','10-5','10-6','10-7']),
  ...generateTopicQuizQuestions(11, 'Databases - SQL', ['11-1','11-2','11-3','11-4','11-5','11-6','11-7']),
  ...generateTopicQuizQuestions(12, 'Database - MongoDB', ['12-1','12-2','12-3','12-4']),
  ...generateTopicQuizQuestions(13, 'Full Stack Integration', ['13-1','13-2','13-3','13-4','13-5','13-6','13-7']),
  ...generateTopicQuizQuestions(14, 'Docker and Deployment', ['14-1','14-2','14-3','14-4','14-5','14-6']),
  ...generateTopicQuizQuestions(15, 'Final Capstone', ['15-1','15-2','15-3','15-4','15-5','15-6','15-7']),
];

function generateExamQuestions(topicId: number): QuizQuestion[] {
  const baseId = topicId * 1000;
  return [
    { id: baseId + 1, topicId, subtopicId: `${topicId}-1`, question: 'What protocol does your browser use to request a webpage?', options: ['FTP', 'HTTP/HTTPS', 'SMTP', 'SSH'], correctAnswer: 1, explanation: 'Browsers use HTTP or HTTPS to communicate with web servers.' },
    { id: baseId + 2, topicId, subtopicId: `${topicId}-1`, question: 'Which HTTP method should be used to create a new resource?', options: ['GET', 'POST', 'DELETE', 'HEAD'], correctAnswer: 1, explanation: 'POST is used to submit data and create new resources on a server.' },
    { id: baseId + 3, topicId, subtopicId: `${topicId}-2`, question: 'The frontend of a web application runs on the:', options: ['Database server', 'Client (browser)', 'DNS server', 'Mail server'], correctAnswer: 1, explanation: 'Frontend code runs in the user\'s browser (client-side).' },
    { id: baseId + 4, topicId, subtopicId: `${topicId}-3`, question: 'What does DOM stand for?', options: ['Data Object Model', 'Document Object Model', 'Digital Output Manager', 'Display Object Mapper'], correctAnswer: 1, explanation: 'DOM is the Document Object Model - the browser\'s tree representation of HTML.' },
    { id: baseId + 5, topicId, subtopicId: `${topicId}-4`, question: 'DNS is best described as:', options: ['A firewall system', 'A phonebook for the internet', 'A programming language', 'A web server type'], correctAnswer: 1, explanation: 'DNS translates domain names into IP addresses, like a phonebook.' },
    { id: baseId + 6, topicId, subtopicId: `${topicId}-5`, question: 'REST APIs commonly return data in what format?', options: ['XML only', 'CSV', 'JSON', 'YAML'], correctAnswer: 2, explanation: 'JSON is the standard data format for REST APIs.' },
    { id: baseId + 7, topicId, subtopicId: `${topicId}-1`, question: 'HTTP status code 200 means:', options: ['Not found', 'Server error', 'Success', 'Redirect'], correctAnswer: 2, explanation: '200 OK indicates a successful request.' },
    { id: baseId + 8, topicId, subtopicId: `${topicId}-2`, question: 'A company hires a "backend developer." They will primarily work on:', options: ['CSS animations', 'Server-side logic and databases', 'User interface design', 'Browser compatibility'], correctAnswer: 1, explanation: 'Backend developers work on servers, APIs, databases, and business logic.' },
    { id: baseId + 9, topicId, subtopicId: `${topicId}-3`, question: 'Why should JavaScript be loaded at the end of the body tag?', options: ['It looks cleaner', 'So HTML loads first and page renders faster', 'JavaScript doesn\'t work in the head', 'No reason, it\'s just tradition'], correctAnswer: 1, explanation: 'Loading JS at the end ensures the DOM is built before scripts run.' },
    { id: baseId + 10, topicId, subtopicId: `${topicId}-4`, question: 'What is a subdomain in "blog.example.com"?', options: ['example', '.com', 'blog', 'www'], correctAnswer: 2, explanation: '"blog" is the subdomain, "example" is the domain, ".com" is the TLD.' },
    { id: baseId + 11, topicId, subtopicId: `${topicId}-5`, question: 'In a REST API, DELETE /users/5 would:', options: ['Get user 5\'s data', 'Create user 5', 'Delete user with ID 5', 'Update user 5'], correctAnswer: 2, explanation: 'DELETE method on a resource endpoint removes that resource.' },
    { id: baseId + 12, topicId, subtopicId: `${topicId}-1`, question: 'SSL/TLS certificates are used for:', options: ['Faster page loading', 'Encrypting data between client and server', 'Compressing images', 'Caching webpages'], correctAnswer: 1, explanation: 'SSL/TLS encrypts the communication channel between client and server.' },
    { id: baseId + 13, topicId, subtopicId: `${topicId}-3`, question: 'The CSSOM is:', options: ['A JavaScript framework', 'CSS Object Model built by the browser', 'A server technology', 'A database system'], correctAnswer: 1, explanation: 'The browser parses CSS into a CSSOM which combines with the DOM for rendering.' },
    { id: baseId + 14, topicId, subtopicId: `${topicId}-4`, question: 'An IP address like 192.168.1.1 is:', options: ['A domain name', 'A numerical identifier for a device on a network', 'A CSS property', 'A JavaScript variable'], correctAnswer: 1, explanation: 'IP addresses are numerical labels assigned to devices on a network.' },
    { id: baseId + 15, topicId, subtopicId: `${topicId}-5`, question: 'Which analogy best describes an API?', options: ['A bookshelf', 'A waiter between kitchen and customer', 'A light switch', 'A filing cabinet'], correctAnswer: 1, explanation: 'An API is like a waiter - it takes your request to the kitchen (server) and brings back the response.' },
  ];
}

const questionTemplates: Record<string, {q: string; opts: string[]; correct: number; exp: string}[]> = {
  'HTML Fundamentals': [
    { q: 'Which tag is used for the largest heading?', opts: ['<heading>', '<h6>', '<h1>', '<big>'], correct: 2, exp: '<h1> is the largest heading tag.' },
    { q: 'Which HTML element is used for user input?', opts: ['<form>', '<input>', '<button>', '<textarea>'], correct: 1, exp: '<input> is the primary element for user input.' },
    { q: 'What does the alt attribute in <img> provide?', opts: ['A tooltip', 'Alternative text for accessibility', 'A link', 'Animation'], correct: 1, exp: 'alt provides alternative text for screen readers and when images fail to load.' },
    { q: 'Which is a self-closing HTML tag?', opts: ['<div>', '<p>', '<br />', '<span>'], correct: 2, exp: '<br /> is self-closing - it doesn\'t have a closing tag.' },
    { q: 'What is semantic HTML?', opts: ['HTML with CSS', 'HTML tags that describe meaning', 'HTML5 only features', 'HTML with JavaScript'], correct: 1, exp: 'Semantic HTML uses tags that convey the meaning of content.' },
    { q: '<main> should appear how many times per page?', opts: ['As many as needed', 'Exactly once', 'Twice', 'Never'], correct: 1, exp: 'There should be only one <main> element per page.' },
    { q: 'Which attribute links a <label> to an <input>?', opts: ['name', 'class', 'for/id', 'link'], correct: 2, exp: 'The for attribute on label matches the id on input.' },
    { q: 'Which tag creates an ordered list?', opts: ['<ul>', '<ol>', '<li>', '<list>'], correct: 1, exp: '<ol> creates an ordered (numbered) list.' },
    { q: '<thead>, <tbody>, <tfoot> are used with:', opts: ['Forms', 'Tables', 'Lists', 'Navigation'], correct: 1, exp: 'These tags organize sections of an HTML table.' },
    { q: 'Which doctype declaration is correct for HTML5?', opts: ['<!DOCTYPE HTML5>', '<!DOCTYPE html>', '<doctype html>', '<!html>'], correct: 1, exp: '<!DOCTYPE html> is the correct HTML5 doctype.' },
  ],
  'CSS Fundamentals': [
    { q: 'Which CSS property creates space inside an element\'s border?', opts: ['margin', 'padding', 'border', 'gap'], correct: 1, exp: 'Padding creates space between content and border.' },
    { q: 'What does display: flex do?', opts: ['Hides the element', 'Makes element a flex container', 'Adds animation', 'Changes font'], correct: 1, exp: 'display: flex creates a flex container for flexible layouts.' },
    { q: 'Which unit is relative to the root font size?', opts: ['px', 'em', 'rem', '%'], correct: 2, exp: 'rem is relative to the root element\'s font-size.' },
    { q: '@media queries are used for:', opts: ['Animations', 'Responsive design', 'Variables', 'Imports'], correct: 1, exp: 'Media queries apply styles based on device characteristics.' },
    { q: 'CSS Grid is designed for:', opts: ['One-dimensional layouts', 'Two-dimensional layouts', 'Animations only', 'Typography'], correct: 1, exp: 'CSS Grid handles both rows and columns (2D layouts).' },
    { q: 'Which selector has the highest specificity?', opts: ['.class', '#id', 'element', '*'], correct: 1, exp: 'ID selectors have higher specificity than class or element selectors.' },
    { q: 'box-sizing: border-box means:', opts: ['No borders', 'Width includes padding and border', 'Only border is sized', 'Content is hidden'], correct: 1, exp: 'border-box includes padding and border in the element\'s total width.' },
    { q: 'Which property aligns items along the cross axis in flexbox?', opts: ['justify-content', 'align-items', 'flex-direction', 'flex-wrap'], correct: 1, exp: 'align-items aligns items on the cross axis.' },
    { q: 'CSS transitions are triggered by:', opts: ['Page load only', 'State changes like :hover', 'Media queries', 'JavaScript only'], correct: 1, exp: 'Transitions animate property changes triggered by state changes.' },
    { q: 'The "C" in CSS stands for:', opts: ['Computer', 'Cascading', 'Central', 'Creative'], correct: 1, exp: 'CSS = Cascading Style Sheets.' },
  ],
  'JavaScript Basics': [
    { q: 'Which keyword declares a constant variable?', opts: ['var', 'let', 'const', 'static'], correct: 2, exp: 'const declares a variable that cannot be reassigned.' },
    { q: 'typeof null returns:', opts: ['"null"', '"undefined"', '"object"', '"boolean"'], correct: 2, exp: 'typeof null returns "object" - a known JavaScript quirk.' },
    { q: 'Which method adds an element to the end of an array?', opts: ['unshift()', 'push()', 'pop()', 'shift()'], correct: 1, exp: 'push() adds elements to the end of an array.' },
    { q: 'addEventListener is used to:', opts: ['Create elements', 'Attach event handlers', 'Style elements', 'Remove elements'], correct: 1, exp: 'addEventListener attaches an event handler function to an element.' },
    { q: 'document.querySelector() returns:', opts: ['All matching elements', 'The first matching element', 'A boolean', 'An error'], correct: 1, exp: 'querySelector returns the first element matching the CSS selector.' },
    { q: 'What does === check?', opts: ['Value only', 'Type only', 'Value and type', 'Reference'], correct: 2, exp: '=== checks both value and type (strict equality).' },
    { q: 'A for...of loop iterates over:', opts: ['Object keys', 'Array values', 'Both', 'Neither'], correct: 1, exp: 'for...of iterates over iterable values like arrays.' },
    { q: 'Which is NOT a primitive type?', opts: ['string', 'number', 'array', 'boolean'], correct: 2, exp: 'Arrays are objects, not primitives.' },
    { q: 'innerHTML vs textContent:', opts: ['No difference', 'innerHTML parses HTML tags', 'textContent is slower', 'innerHTML is safer'], correct: 1, exp: 'innerHTML parses HTML while textContent treats everything as plain text.' },
    { q: 'Functions in JavaScript are:', opts: ['Not reusable', 'First-class citizens', 'Only synchronous', 'Always global'], correct: 1, exp: 'Functions are first-class citizens - they can be passed around like values.' },
  ],
};

function generateTopicQuizQuestions(topicId: number, topicName: string, subtopicIds: string[]): QuizQuestion[] {
  const templates = questionTemplates[topicName];
  if (templates) {
    return templates.map((t, i) => ({
      id: topicId * 100 + i + 1,
      topicId,
      subtopicId: subtopicIds[i % subtopicIds.length],
      question: t.q,
      options: t.opts,
      correctAnswer: t.correct,
      explanation: t.exp,
    }));
  }
  
  // Generate placeholder questions for topics without custom templates
  return Array.from({ length: 10 }, (_, i) => ({
    id: topicId * 100 + i + 1,
    topicId,
    subtopicId: subtopicIds[i % subtopicIds.length],
    question: `Question ${i + 1} about ${topicName}`,
    options: ['Option A', 'Option B (Correct)', 'Option C', 'Option D'],
    correctAnswer: 1,
    explanation: `This tests your understanding of ${topicName}.`,
  }));
}

export function getQuizQuestions(topicId: number): QuizQuestion[] {
  return quizQuestions.filter(q => q.id < 1000 && q.topicId === topicId).slice(0, 10);
}

export function getExamQuestions(topicId: number): QuizQuestion[] {
  // For topic 1, use the dedicated exam questions
  const examQs = quizQuestions.filter(q => q.id >= topicId * 1000 && q.id < (topicId + 1) * 1000);
  if (examQs.length >= 15) return examQs.slice(0, 15);
  // Fallback: combine quiz questions + generate more
  const quizQs = getQuizQuestions(topicId);
  return [...quizQs, ...quizQs.slice(0, 5).map((q, i) => ({ ...q, id: q.id + 5000 + i }))].slice(0, 15);
}
