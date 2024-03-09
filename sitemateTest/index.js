// server.js
import express from 'express';
const app = express();
const PORT = 5002;

// Middleware
app.use(express.json());

// Routes
import { router as issuesRoutes } from './src/routes/issues.routes.js';
app.use('/api/issues', issuesRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
