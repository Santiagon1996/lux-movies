# 🎬 LuxMovies App

**Technical Challenge for LuxExperience**

LuxMovies App is a **web application** created as a technical challenge for the Frontend Engineer position. Its goal is to implement a comprehensive solution for browsing movies, viewing their details, and managing a wish list.

The project is designed to demonstrate skills in structuring, developing, and managing both client-side and server-side code.

### Key Features

- **Category Navigation:** The homepage displays three carousels, each with a different movie category.
- **Details Pages:** Each movie has a dedicated page with description, image, and a button to add it to the wishlist.
- **Visual Differentiation:** The details page adapts its style depending on the category (font, button, and other elements).
- **Wishlist:** A dedicated section displays all movies added by the user.

### Architecture and Technology

- **Frontend:** Built with **React** and **TypeScript**.
- **Styling:** Styled using **SCSS**, without the use of CSS Modules, Styled Components, or Tailwind.
- **Build Tool:** **Vite** is used for bundling, with support for **Server-Side Rendering (SSR)**.
- **Routing:** React Router
- **Data Fetching:** TanStack Query (fetching and caching)
- **Global State:** Redux
- **API:** The application connects to an external API (The Movie Database API is recommended) to fetch movie data.

### Evaluation Criteria

This project was optimized to meet the following evaluation criteria:

- **Code Quality:** Clean, reusable, and well-structured component-based code.
- **Development Principles:** Adherence to **DRY (Don't Repeat Yourself)** principles.
- **Testing:** Comprehensive unit tests with Jest and integration tests with curl scripts.
- **SSR Strategy:** Implementation of an effective Server-Side Rendering strategy.

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### 🔧 Installation and Running the Project

1. Clone the repository:

```bash
git clone [https://github.com/Santiagon1996/lux-movies.git]
```

2. Install dependencies:

```bash
npm install

```

3. Create a .env file in the project root with your TMDb API key:

```
Important Notes:

Both the API Key (V3) and the Access Token (V4) are provided by TMDb
.

You must log into your TMDb account and generate your own API Key and Access Token.

Do not commit or share your credentials publicly. Use .env and .gitignore to keep them safe.

BASE_URL=https://api.themoviedb.org/3
API_TOKEN=your_access_token_here
NODE_ENV=development
```

4. Start the development server (with SSR support):

```
npm run dev:server
```

- Runs on http://localhost:3000
- Serves SSR pages and API endpoints (/api/...)

5. In a separate terminal, start the Vite development server (CSR + HMR):

```
npm run dev:client
```

- Runs on http://localhost:5173
- Any fetch to /api/... is proxied to Express (3000)
- Supports hot module replacement (HMR)

6. Open your browser at http://localhost:5173
   to see the app.
