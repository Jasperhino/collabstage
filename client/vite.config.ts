import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }), viteTsconfigPaths(), svgrPlugin()],
  resolve: {
    alias: {
      '@server': path.join(__dirname, '../server/src/'),
    },
  },
  server: {
    port: 3000,
  },
});
