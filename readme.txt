# Token-Calculator

A static three-page website for estimating AI token usage based on the Genesys Cloud token-based pricing model.

## Repository Structure

```
Token-Calculator/
├── index.html          # Page 1: Feature/theme selection
├── page2.html          # Page 2: Dynamic input forms
├── summary.html        # Page 3: Token summary & report form
├── assets/
│   ├── css/
│   │   └── styles.css   # Styles (inspired by startelecom.ca)
│   └── js/
│       ├── main.js      # (Future shared utilities)
│       ├── page1.js     # Page 1 logic
│       ├── page2.js     # Page 2 logic
│       └── summary.js   # Summary page logic & jsPDF
└── README.md           # This file
```

## Setup & Deployment

1. **Clone the repository**

```bash
# Replace <USERNAME> with your GitHub username
git clone https://github.com/maxvodka/Token-Calculator.git
cd Token-Calculator
```

2. **(Optional) Initialize a new Git repository**

If you start with a local folder instead of cloning:
```bash
git init
git remote add origin https://github.com/maxvodka/Token-Calculator.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

3. **Install Dependencies**

This is a plain HTML/CSS/JS project; there are no additional dependencies to install.

4. **Enable GitHub Pages**

- Go to your GitHub repository settings.
- Under **Pages**, select the **main** branch as the source.
- Click **Save**.
- Your site will be published at `https://maxvodka.github.io/Token-Calculator/`.

5. **Preview Locally**

Simply open `index.html` in your browser, or serve with a simple HTTP server:

```bash
# Using Python 3.x
python -m http.server 8000
```

Then navigate to `http://localhost:8000`.

---

*Happy coding!*
