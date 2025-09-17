/**
 * Entry point of the application.
 * 
 * - Imports the global base CSS styles.
 * - Imports and initializes the router to handle hash-based navigation.
 */

//import './styles/base.css';
import { initRouter } from './routes/route.js';
import '../src/styles/login.css';
import '../src/styles/dashboard.css';
import '../src/styles/register.css';

/**
 * Initialize the client-side router.
 * This sets up listeners and renders the correct view on app start.
 */
initRouter();