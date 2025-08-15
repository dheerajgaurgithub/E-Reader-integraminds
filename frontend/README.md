# E-Reader Platform Frontend

This is the frontend for the E-Reader Platform, built with React and Material-UI.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn
- A running instance of the [E-Reader Backend](https://github.com/your-username/ereader-backend)

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ereader-frontend.git
   cd ereader-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the environment variables in `.env`:
   ```
   REACT_APP_API_URL=https://your-render-backend-url.onrender.com/api
   ```

### Development

Start the development server:
```bash
npm start
# or
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository
2. Sign up/Log in to [Vercel](https://vercel.com/)
3. Click "New Project" and import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build` or `yarn build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install` or `yarn`
5. Add Environment Variables (from your `.env` file)
6. Click "Deploy"

### Environment Variables

| Variable Name | Description | Required |
|--------------|-------------|----------|
| `REACT_APP_API_URL` | Base URL of your backend API | Yes |
| `REACT_APP_TOKEN_NAME` | Name for the authentication token in localStorage | No (default: `ereader_token`) |
| `NODE_ENV` | Environment (production/development) | No |

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/      # React context providers
├── pages/         # Page components
├── services/      # API services
├── theme/         # MUI theme configuration
└── utils/         # Utility functions
```

## Available Scripts

- `npm start` - Start the development server
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run deploy` - Deploy to Vercel (after configuration)

## Technologies Used

- React 18
- Material-UI 5
- React Router 6
- Axios for API calls
- Vercel for deployment

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
