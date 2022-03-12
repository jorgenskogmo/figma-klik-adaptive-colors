const esbuild = require('esbuild');
const {readFile, writeFile} = require('fs').promises;
const minify = require('html-minifier-terser').minify;

// sandbox

esbuild
  .build({
    entryPoints: ['src/plugin.ts'],
    bundle: true,
    platform: 'node',
    target: ['node10.4'],
    outfile: 'dist/plugin.js'
  })
  .catch(() => process.exit(1));

// iframe UI

(async () => {
  const script = esbuild.buildSync({
    entryPoints: ['src/ui.ts'],
    bundle: true,
    minify: true,
    write: false,
    target: ['chrome58', 'firefox57', 'safari11', 'edge18']
  });

  const html = await readFile('src/ui.html', 'utf8');

  const minifyOptions = {
    collapseWhitespace: true,
    keepClosingSlash: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true
  };

  await writeFile(
    'dist/ui.html',
    `<script>${script.outputFiles[0].text}</script>${await minify(html, minifyOptions)}`
  );
})();