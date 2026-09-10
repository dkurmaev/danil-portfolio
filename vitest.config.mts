import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      // 'server-only' throws unconditionally outside Next's RSC bundler
      // (node_modules/server-only/index.js) — Next resolves it to a no-op
      // only under the "react-server" export condition, which Vitest's
      // plain Node runtime doesn't set. Point it at that same no-op build
      // here, so engine modules keep `import 'server-only'` (CLAUDE.md §4)
      // without every test run throwing on module load.
      'server-only': fileURLToPath(
        new URL('./node_modules/server-only/empty.js', import.meta.url),
      ),
    },
  },
});
