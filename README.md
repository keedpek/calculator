#Task: 
docs.google.com/document/d/1zpXXeSae-BlcxPKgw3DhxZA92cspVailrPYoaXSYrW8/edit#heading=h.5dt3hghpa22f

How to Run the App
Development
Install dependencies:

```bash
npm install
```
Start development server:

```bash
npm start
```
Runs on http://localhost:3000 with hot reloading

Production Build
Create optimized build:

```bash
npm run build
```
Outputs to /dist folder. Contains index.html and bundle.js

Project Structure
text
calculator/
├── .husky/                # Git hooks configuration
│   ├── _/                 # Husky internal files
│   ├── pre-commit         # Pre-commit hook running ESLint and Prettier
├── src/                   # Application source code
│   ├── index.js           # Main application entry point, contains calculator logic and eventListeners
│   ├── ThemeManager.js    # Theme switching logic
│   ├── style.css          # All styles
│   └── index.html         # HTML marckup
├── .gitignore             # Default gitignore file
├── .prettierrc            # Prettier formatting rules
├── eslint.config.js       # ESLint configuration
├── package.json           # Project dependencies and scripts
└── webpack.config.js      # Webpack configuration
