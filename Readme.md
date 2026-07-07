# AlgoLens 🚀

> AI-Powered Competitive Programming Analytics Platform

AlgoLens is a full-stack competitive programming assistant that helps programmers solve problems more efficiently by combining a Chrome Extension, VS Code Extension, AI-powered hints, AI-generated edge test cases, and an analytics dashboard.

The platform automatically tracks coding sessions, analyzes problems, generates progressive AI hints, creates hidden edge cases, and provides insights into your competitive programming journey.

---

## ✨ Features

### 🎯 Automatic Problem Tracking
- Detects Codeforces problems directly from the browser
- Extracts:
  - Problem statement
  - Rating
  - Tags
  - URL
  - Sample test cases
  - Metadata

### 💻 VS Code Integration
- Start, pause, resume and complete coding sessions
- Live coding timer
- Automatic problem synchronization
- Sidebar with problem details
- One-click test execution

### 🤖 AI Hint System
- Progressive AI-generated hints
- Time-based unlock mechanism
- Hints become available as the solving session progresses
- Prevents spoilers while encouraging problem-solving

### 🧪 AI Edge Test Case Generation
- Generates hidden edge cases using Gemini AI
- Automatic backend generation
- Run custom tests directly inside VS Code
- Detect compilation, runtime and wrong-answer cases

### 📊 Analytics Dashboard *(Frontend)*
- Coding activity visualization
- Problem-solving statistics
- Topic-wise performance
- Rating distribution
- AI usage analytics
- Session history

---

## 🏗 Architecture

```
               Chrome Extension
                      │
                      ▼
               Node.js Backend
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
      MongoDB               Gemini AI
          │                       │
          └───────────┬───────────┘
                      ▼
               VS Code Extension
                      │
                      ▼
          React Analytics Dashboard
```

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Chart.js

### Backend
- Node.js
- Express.js

### AI
- Gemini 2.5 Flash

### Database
- MongoDB

### Extensions
- VS Code Extension API
- Chrome Extension API

---

## 🚀 Workflow

1. Open a Codeforces problem.
2. Chrome Extension extracts the problem.
3. Backend stores the problem in MongoDB.
4. Gemini generates:
   - Progressive hints
   - AI edge test cases
5. VS Code Extension automatically syncs the problem.
6. Start solving.
7. Unlock hints over time.
8. Run AI-generated edge cases.
9. Complete the session.
10. View analytics on the dashboard.

---

## 📂 Project Structure

```
AlgoLens/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── server.js
│
├── vscode-extension/
│
├── chrome-extension/
│
├── frontend/
│
└── README.md
```

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/your-username/AlgoLens.git
cd AlgoLens
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### VS Code Extension

```bash
cd vscode-extension
npm install
```

Press **F5** in VS Code to launch the extension.

### Chrome Extension

1. Open Chrome
2. Go to `chrome://extensions`
3. Enable **Developer Mode**
4. Click **Load Unpacked**
5. Select the `chrome-extension` folder

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📸 Screenshots

> Add screenshots here

- Dashboard
- VS Code Sidebar
- AI Hint System
- AI Test Cases
- Chrome Extension

---

## 🔥 Future Roadmap

- User authentication
- Multi-platform support (LeetCode, AtCoder, CodeChef)
- Personalized AI coaching
- Topic-wise recommendations
- Performance prediction
- Contest analytics
- Team workspaces
- Cloud synchronization

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
