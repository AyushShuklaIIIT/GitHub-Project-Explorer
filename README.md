# 🚀GitHub Project Explorer  

**A dynamic, modern dashboard for discovering, analyzing, and bookmarking trending open-source projects on GitHub.**  

This web application provides a clean and intuitive interface to explore repositories, filter them by various criteria, and view key anlaytics through interactive charts. It also includes personalization features like bookmarking and note-taking, making it a powerful tool for developers to keep track of interesting projects.

## ✨Key Features

- **Trending Repository Feed:** Fetches and displays a live feed of trending repositories from the GitHub REST API based on time ranges (day, week, month).
- **Powerful Filtering & Sorting:**
    - Real-time search by repository name.
    - Filter by programming language.
    - Sort results by stars, forks, or last updated date.
- **Interactive Data Visualization:**
    - **Language Distribution:** A dynamic dougnut chart showing the breakdown of languages in the current view.
    - **Star Trends**: A line chart visualizing the star counts of the top repositories.
- **Detailed Repository View:**
    - Click on any repository to open a detailed side drawer.
    - Fetches and renders the full `README.md` with proper Markdown, HTML, and emoji support.
    - Displays syntax-highlighted code blocks within the README.
    - Shows the top contributors for the selected repository.
- **Personalization:**
    - **Bookmark Repos:** Save your favorite repositories for later.
    - **Take Notes:** Add personal notes to any repositories. All bookmarks and notes are saved locally in your browser.
    - **Dedicated Views:** Separate sidebar sections to view only your bookmarked projects or repositories with notes.
- **Modern & Responsive UI**: Built with Tailwind CSS for a sleek, dark-themed, and responsive user experience that works well on all screen sizes.

## 🛠️Tech Stack

This project is built with a modern frontend stack, showcasing a component-based architecture and efficient state management.

- **Core:** React.js, Vite
- **Styling:** Tailwind CSS, FontAwesome Icons
- **API:** GitHub REST API
- **Charts:** Chart.js with `react-chartjs-2`
- **Markdown Rendering:** react-markdown with `remark-gfm` (for tables, etc.) and `rehype-raw` (for HTML).
- **Syntax Highlighting:** `react-syntax-highlighter` for code blocks in READMEs.
- **State Management:** React Hooks (`useState`, `useEffect`, `useCallback`)
- **Utilities:** `date-fns` for time calculations.

## ⚙️Getting Started

Follow these instructions to get a local copy of the project up and running on your machine.

**Prerequisites**  
You need to have Node.js (version 18.x or higher) and npm installed on your computer.

**Installation**  

1. **Clone the repository:**
    ```bash
    git clone https://github.com/AyushShuklaIIIT/GitHub-Project-Explorer.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd GitHub-Project-Explorer
    ```
3. **Install the dependencies:**
    ```bash
    npm install
    ```
4. **Run the development server:**
    ```bash
    npm run dev
    ```

The application should now be running on `http://localhost:5173`.

## 🚀Future Improvements

This project has a solid foundation, but there are many ways it could be extended:

- **User Authentication:** Implement GitHub OAuth to allow users to log in.
- **Backend Storage:** Use a backend service like Firebase (Firestore) to save bookmarks and notes to a user's account, allowing them to persist across devices.
- **Starred Repos:** With authentication, fetch and display the user's actual starred repositories from GitHub.
- **Advanced Analytics:** Add more charts, such as commit history over time or issue/pull request activity.
- **Caching:** Implement caching for API requests to improve performance and avoid hitting rate limits.
