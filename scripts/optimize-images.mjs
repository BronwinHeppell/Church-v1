import { existsSync, mkdirSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import sharp from 'sharp';

const ROOT = resolve(import.meta.dirname, '..');
const STATIC = join(ROOT, 'public', 'static');
const OUT = join(STATIC, 'opt');

const MANIFEST = [
	{ src: 'hero.jpg', name: 'hero', widths: [768, 1280, 1920], quality: 86 },
	{ src: 'Mission.jpg', name: 'mission', widths: [768, 1280, 1920], quality: 76 },
	{ src: 'Youthfel.jpg', name: 'community', widths: [640, 1024, 1400], quality: 78 },
	{ src: 'SundayS2.jpg', name: 'sunday-service', widths: [640, 960], quality: 78 },
	{ src: 'SundayS1.jpg', name: 'service-early', widths: [640, 960], quality: 78 },
	{ src: 'SundaySchool.jpg', name: 'sunday-school', widths: [640, 960], quality: 78 },
];

const kb = (bytes) => Math.round(bytes / 1024);

function report() {
	const rows = [];
	const walk = (dir) => {
		for (const entry of readdirSync(dir, { withFileTypes: true })) {
			const p = join(dir, entry.name);
			if (entry.isDirectory()) {
				if (entry.name !== 'opt') walk(p);
			} else if (/\.(jpe?g|png)$/i.test(entry.name)) {
				rows.push(p);
			}
		}
	};
	walk(STATIC);

	console.log('\nSource inventory (originals, untouched):\n');
	const out = [];
	for (const p of rows) {
		const meta = sharp(readFileSync(p)).metadata();
		out.push(
			meta.then((m) => ({
				rel: p.replace(STATIC, '').replace(/\\/g, '/'),
				w: m.width,
				h: m.height,
				kb: kb(statSync(p).size),
			})),
		);
	}
	return Promise.all(out).then((list) => {
		list.sort((a, b) => b.kb - a.kb);
		for (const r of list)
			console.log(`  ${r.rel.padEnd(32)} ${String(r.w + 'x' + r.h).padEnd(12)} ${r.kb} KB`);
		console.log(`\n  TOTAL ${list.reduce((s, r) => s + r.kb, 0)} KB across ${list.length} files\n`);
	});
}

const SVG_ASSETS = [{ src: 'logo/logo_small.svg', name: 'crest', width: 320, quality: 88 }];

async function optimizeSvgAssets() {
	for (const item of SVG_ASSETS) {
		const srcPath = join(STATIC, item.src);
		if (!existsSync(srcPath)) {
			console.warn(`  SKIP (missing): ${item.src}`);
			continue;
		}
		const buf = await sharp(srcPath, { density: 200 })
			.resize({ width: item.width })
			.webp({ quality: item.quality })
			.toBuffer();
		const { writeFileSync } = await import('node:fs');
		writeFileSync(join(OUT, `${item.name}-${item.width}.webp`), buf);
		console.log(
			`\n  ${item.src}  ${kb(statSync(srcPath).size)} KB` +
				`\n    ${item.width}w   -> opt/${item.name}-${item.width}.webp  ${kb(buf.length)} KB`,
		);
	}
}

async function optimize() {
	mkdirSync(OUT, { recursive: true });
	let before = 0;
	let after = 0;

	for (const item of MANIFEST) {
		const srcPath = join(STATIC, item.src);
		if (!existsSync(srcPath)) {
			console.warn(`  SKIP (missing): ${item.src}`);
			continue;
		}
		const input = readFileSync(srcPath);
		const meta = await sharp(input).metadata();
		before += statSync(srcPath).size;
		console.log(`\n  ${item.src}  ${meta.width}x${meta.height}  ${kb(statSync(srcPath).size)} KB`);

		for (const width of item.widths) {
			if (width > meta.width) {
				console.warn(
					`    ${width}w  skipped: source is only ${meta.width}px wide, refusing to upscale`,
				);
				continue;
			}
			const target = join(OUT, `${item.name}-${width}.webp`);
			mkdirSync(dirname(target), { recursive: true });
			const buf = await sharp(input)
				.resize({ width, withoutEnlargement: true })
				.webp({ quality: item.quality, effort: 5 })
				.toBuffer();
			const { writeFileSync } = await import('node:fs');
			writeFileSync(target, buf);
			after += buf.length;
			console.log(
				`    ${String(width + 'w').padEnd(6)} -> opt/${item.name}-${width}.webp  ${kb(buf.length)} KB`,
			);
		}
	}

	await optimizeSvgAssets();

	console.log(
		`\n  Originals kept in place. Derivatives total ${kb(after)} KB (largest set) vs ${kb(before)} KB of originals.\n`,
	);
}

const mode = process.argv[2];
if (mode === '--report') {
	await report();
} else {
	await optimize();
}
