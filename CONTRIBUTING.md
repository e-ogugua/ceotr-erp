# Contributing to CEOTR Ltd ERP Suite

This document outlines the process for contributing to the CEOTR Ltd ERP Suite, a React-based business management application.

## Prerequisites

- **Node.js** 18+ and npm package manager
- **Git** for version control
- **Code editor** (VS Code recommended with ESLint extension)

## Development Setup

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/your-username/ceotrLtdErpSuite.git
   cd ceotrLtdErpSuite
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   ```
   http://localhost:3001
   ```

## Code Standards

### JavaScript/React
- **ES6+ syntax** with modern React patterns
- **Functional components** with hooks preferred
- **PropTypes** for component props validation
- **Custom hooks** for reusable logic
- **Error boundaries** for robust error handling

### Styling
- **TailwindCSS** for responsive utility classes
- **Mobile-first** responsive design approach
- **Custom components** in `src/index.css`
- **Consistent spacing** and typography scale

### File Structure
```
src/
├── components/          # React components by feature
│   ├── ComponentName.jsx
│   └── ComponentName.test.jsx
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── constants/          # Constants and configuration
└── types/              # TypeScript definitions (future)
```

### Component Guidelines
```jsx
/**
 * ComponentName - Description of component purpose
 * @param {string} propName - Description of prop
 * @returns {JSX.Element} Rendered component
 */
const ComponentName = ({ propName }) => {
  return (
    <div className="component-name">
      <h3>{propName}</h3>
    </div>
  );
};

ComponentName.propTypes = {
  propName: PropTypes.string.isRequired
};

export default ComponentName;
```

## Contribution Process

### 1. Report Issues
Use GitHub Issues to report bugs or request features:
- **Clear title** describing the issue or request
- **Detailed description** with steps to reproduce
- **Environment details** (OS, browser, Node version)
- **Screenshots** if applicable

### 2. Submit Code Changes

#### Create Feature Branch
```bash
git checkout -b feature/feature-name
# or
git checkout -b fix/issue-description
```

#### Make Changes
- Follow the coding standards above
- Test changes thoroughly
- Update documentation if needed
- Ensure no linting errors

#### Commit Changes
```bash
git add .
git commit -m "feat: Add new feature with description

- Implemented X functionality
- Updated Y component
- Fixed Z issue"
```

#### Push and Create Pull Request
```bash
git push origin feature/feature-name
# Create PR via GitHub web interface
```

### 3. Code Review Process
- **Functionality** - Does it work as expected?
- **Code quality** - Clean, readable, maintainable
- **Performance** - No unnecessary re-renders
- **Accessibility** - WCAG compliant
- **Responsive design** - Works on all devices
- **Error handling** - Graceful failure handling
- **Testing** - Adequate test coverage
- **Documentation** - Well documented

## Testing

### Component Testing
- **React Testing Library** for component tests
- **Jest** for unit tests
- **Test coverage** for critical components
- **Accessibility testing** with axe-core

### Test Structure
```javascript
describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles user interaction', () => {
    render(<ComponentName />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockFunction).toHaveBeenCalled();
  });
});
```

## Development Workflow

### Daily Development
```bash
# Pull latest changes
git pull origin master

# Create feature branch
git checkout -b feature/new-feature

# Make changes and test
npm run dev

# Run tests
npm test

# Commit changes
git add .
git commit -m "feat: Add new feature"

# Push and create PR
git push origin feature/new-feature
```

### Quality Assurance
```bash
# Lint code
npm run lint

# Run tests
npm test

# Build for production
npm run build

# Check bundle size
npm run build:analyze
```

## Documentation

When adding or modifying components:
1. **Update this CONTRIBUTING.md** file
2. **Add JSDoc comments** to component files
3. **Update README.md** if major changes
4. **Add PropTypes** for all props
5. **Include usage examples**

## Support

For technical issues or questions:
- **GitHub Issues:** Report bugs and request features
- **Email:** ceotrlimited@gmail.com
- **Phone:** +234 806 450 8595

---

**CEOTR Ltd ERP Suite — Developed by CEO – Chukwuka Emmanuel Ogugua.**

#### Fork & Clone
```bash
# Fork on GitHub (via web interface)
# Then clone your fork
git clone https://github.com/your-username/ceotrLtdErpSuite.git
cd ceotrLtdErpSuite
```

#### Create Feature Branch
```bash
# Create a descriptive branch name
git checkout -b feature/amazing-new-feature
# or
git checkout -b fix/bug-description
# or
git checkout -b docs/update-documentation
```

#### Make Your Changes
- Follow the coding standards below
- Test your changes thoroughly
- Update documentation if needed
- Ensure no linting errors

#### Commit Your Changes
```bash
# Stage your changes
git add .

# Write a clear commit message
git commit -m "Add amazing new feature

- Implemented X functionality
- Updated Y component
- Fixed Z issue
- Added tests for A feature"

# Follow conventional commits format:
# feat: add new feature
# fix: fix a bug
# docs: update documentation
# style: code style changes
# refactor: code refactoring
# test: add tests
# chore: maintenance tasks
```

#### Push & Create Pull Request
```bash
# Push to your fork
git push origin feature/amazing-new-feature

# Create Pull Request via GitHub web interface
# Provide clear description of changes
```

## Coding Standards

### JavaScript/React
- **ES6+ syntax** required
- **Functional components** with hooks preferred
- **PropTypes** for component props
- **Custom hooks** for reusable logic
- **Error boundaries** for robust error handling

### Styling
- **TailwindCSS** for all styling
- **Mobile-first** responsive design
- **Consistent spacing** using Tailwind utilities
- **Custom components** in `src/index.css`
- **No inline styles** (use CSS classes)

### File Structure
```
src/
├── components/          # React components
│   ├── ComponentName.jsx
│   └── ComponentName.test.jsx
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── constants/          # Constants and configuration
└── types/              # TypeScript definitions (future)
```

### Component Guidelines
```jsx
// Good component structure
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({ title, items, onSelect }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Component logic here
  }, [items]);

  const handleSelect = (item) => {
    setSelectedItem(item);
    onSelect(item);
  };

  return (
    <div className="my-component">
      <h3 className="text-lg font-bold">{title}</h3>
      {items.map((item) => (
        <div key={item.id} onClick={() => handleSelect(item)}>
          {item.name}
        </div>
      ))}
    </div>
  );
};

MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired
};

export default MyComponent;
```

## Testing Requirements

### Component Testing
- **React Testing Library** for component tests
- **Jest** for unit tests
- **Test coverage** for critical components
- **Accessibility testing** with axe-core

### Test Structure
```javascript
// ComponentName.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  const mockProps = {
    title: 'Test Title',
    items: [{ id: 1, name: 'Item 1' }],
    onSelect: jest.fn()
  };

  it('renders correctly', () => {
    render(<MyComponent {...mockProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('handles item selection', () => {
    render(<MyComponent {...mockProps} />);
    fireEvent.click(screen.getByText('Item 1'));
    expect(mockProps.onSelect).toHaveBeenCalledWith(mockProps.items[0]);
  });
});
```

## Documentation Requirements

### Code Documentation
- **JSDoc comments** for functions and components
- **README updates** for new features
- **Inline comments** for complex logic
- **API documentation** for new endpoints

### Component Documentation
```jsx
/**
 * MyComponent - Description of what this component does
 *
 * @param {string} title - The title to display
 * @param {Array} items - Array of items to render
 * @param {Function} onSelect - Callback when item is selected
 * @returns {JSX.Element} Rendered component
 */
```

## Code Review Process

### What We Look For
- **Functionality** - Does it work as expected?
- **Code quality** - Clean, readable, maintainable
- **Performance** - No unnecessary re-renders
- **Accessibility** - WCAG compliant
- **Responsive design** - Works on all devices
- **Error handling** - Graceful failure handling
- **Testing** - Adequate test coverage
- **Documentation** - Well documented

### Review Checklist
- [ ] **Code style** follows project conventions
- [ ] **No linting errors** or warnings
- [ ] **Tests pass** and cover new functionality
- [ ] **Responsive design** works on mobile/desktop
- [ ] **Accessibility** features implemented
- [ ] **Performance** optimized
- [ ] **Documentation** updated
- [ ] **No breaking changes** to existing API

## Development Workflow

### Daily Development
```bash
# 1. Pull latest changes
git pull origin master

# 2. Create feature branch
git checkout -b feature/new-feature

# 3. Make changes and test
npm run dev

# 4. Run tests
npm test

# 5. Commit changes
git add .
git commit -m "feat: Add new feature with description"

# 6. Push and create PR
git push origin feature/new-feature
```

### Quality Assurance
```bash
# Lint code
npm run lint

# Run tests
npm test

# Build for production
npm run build

# Check bundle size
npm run analyze
```

## Pull Request Requirements

### PR Title Format
```
type(scope): Brief description

Examples:
feat(auth): Add user login functionality
fix(portfolio): Resolve image loading issue
docs(readme): Update installation instructions
style(components): Improve button styling
```

### PR Description Template
```markdown
## Description
Brief description of changes

## Changes Made
- Added new feature X
- Fixed bug Y
- Updated component Z

## Testing
- Manual testing completed
- Unit tests added
- Cross-browser testing done

## Screenshots
[Before/After screenshots if applicable]

## Related Issues
Closes #123
References #456
```

## Development Tools

### Required Tools
- **Node.js** 18+
- **npm** or **yarn**
- **Git**
- **Code Editor** (VS Code recommended)

### Recommended Extensions
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - CSS utilities
- **React Developer Tools** - React debugging
- **GitLens** - Git integration

### Testing Tools
- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **Cypress** (optional) - E2E testing

## Getting Help

### Community Support
- **GitHub Issues** - Bug reports and feature requests
- **Discussions** - Q&A and community help
- **Documentation** - Check README and docs

### Development Team
- **Email:** ceotrlimited@gmail.com
- **Phone:** +234 806 450 8595
- **Response Time:** 24-48 hours

## Recognition

### Contribution Levels
- **Contributor** - Submitted first PR
- **Bronze** - 5+ PRs merged
- **Silver** - 10+ PRs merged
- **Gold** - 20+ PRs merged
- **Platinum** - Major feature contributions

### Hall of Fame
Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation
- Special mentions in updates

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the original project.

---

**CEOTR Ltd ERP Suite — Developed by CEO – Chukwuka Emmanuel Ogugua.**
