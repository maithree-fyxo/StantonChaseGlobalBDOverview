import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base MUST match the GitHub repo name for Pages project sites:
// site will be served at https://<owner>.github.io/StantonChaseGlobalBDOverview/
export default defineConfig({
  base: '/StantonChaseGlobalBDOverview/',
  plugins: [react()],
});
