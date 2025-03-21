# Pokémon Explorer

## Project Overview
Pokémon Explorer is a web application that allows users to search, filter, and view details of various Pokémon using data from the PokeAPI. The application features pagination, sorting, filtering by Pokémon type, and detailed Pokémon information with an enhanced UI built using ShadCN components.

## Features
- **Search Functionality:** Search for Pokémon by name.
- **Sorting Options:** Sort Pokémon by name (A-Z, Z-A) and base experience (Low to High, High to Low).
- **Multi-Select Filtering:** Filter Pokémon based on multiple types.
- **Pagination:** Load and navigate through Pokémon in batches.
- **Detailed Pokémon View:** View Pokémon details with animations and an enhanced UI.
- **Skeleton Loader:** Displays a skeleton UI while data is being fetched.

## Project Structure
```
project-root/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── pokemon/[name]/page.jsx
│   │   ├── services/
│   ├── components/
│   │   ├── ui/
│   ├── lib/
│   ├── styles/
```

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or later)
- **npm** or **yarn**

### Steps to Run Locally
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/Ajithkumar33267/front-end-coding-challenge.git
   cd front-end-coding-challenge
   ```
2. **Install Dependencies:**
   ```sh
   pnpm install
   # or
   yarn install
   ```
3. **Start the Development Server:**
   ```sh
   pnpm dev
   # or
   yarn dev
   ```
4. **Open in Browser:**
   - Navigate to `http://localhost:3000/`

## Approach & Challenges
### Approach
- Used **React (Next.js)** for frontend.
- Implemented **ShadCN UI** for improved UI components.
- Used **PokeAPI** to fetch Pokémon data.
- Implemented efficient **filtering, sorting, and pagination** for better performance.
- Used **Skeleton Loader** to improve UX during data fetching.

### Challenges & Trade-offs
- **Data Fetching Optimization:** Limited API requests to avoid performance issues.
- **Search Across Pagination:** Ensured search works across all Pokémon, not just the currently fetched ones.
- **Multi-Select Filtering:** Enhanced filtering to support multiple Pokémon types.



## Contact
For any questions, feel free to reach out.

---
Thank you for reviewing my submission! 🚀

