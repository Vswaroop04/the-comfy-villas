const { build } = require('esbuild');

build({
	entryPoints: ['src/index.ts'],
	minify: true,
	platform: 'node',
	bundle: true,
	outfile: 'dist/build.js',
	external: ['sharp', 'yamlparser', 'request'],
})
	.then(() => console.log('Build Complete!🎉'))
	.catch(() => {
		console.error('Build failed 😿');
		process.exit(1);
	});
