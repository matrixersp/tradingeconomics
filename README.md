# Project Setup Instructions

## Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed (version 14.x or higher recommended).
- A package manager like [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) installed.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/matrixersp/tradingeconomics.git
   cd tradingeconomics
   ```

2. **Install dependencies**:
   Using npm:

   ```bash
   npm install
   ```

   Or using pnpm:

   ```bash
   pnpm install
   ```

3. **Set up environment variables**:
   - Copy the example environment file to create your own `.env` file:

     ```bash
     cp example.env .env
     ```

   - Open the `.env` file in a text editor and update the variables with your specific configuration (e.g., API keys, database credentials, etc.).

## Running the Project

- After setting up the `.env` file, you can start the project with:

  ```bash
  npm run dev
  ```

  Or with yarn:

  ```bash
  pnpm run dev
  ```
