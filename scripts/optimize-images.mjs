import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import sharp from 'sharp';

const ROOT = resolve(import.meta.dirname, '..');
const PUBLIC = join(ROOT, 'public');
const STATIC = join(PUBLIC, 'static');
const OUT = join(STATIC, 'opt');

const MANIFEST = [
	{ src: 'hero.jpg', name: 'hero', widths: [768, 1280, 1920], quality: 86 },
	{ src: 'Mission.jpg', name: 'mission', widths: [768, 1280, 1920], quality: 76 },
	{ src: 'Youthfel.jpg', name: 'community', widths: [640, 1024, 1400], quality: 78 },
	{ src: 'SundayS2.jpg', name: 'sunday-service', widths: [640, 960], quality: 78 },
	{ src: 'SundayS1.jpg', name: 'service-early', widths: [640, 960], quality: 78 },
	{ src: 'SundaySchool.jpg', name: 'sunday-school', widths: [640, 960], quality: 78 },
	{ src: 'biblestudy.jpg', name: 'fellowship', widths: [1280, 1920], quality: 78 },

	/*
	 * Square index plates for the Worship list. These three sources fight each
	 * other: two are 3:2 landscape and one is 2:3 portrait, and their mean
	 * luminance runs 46 / 69 / 157 out of 255. Centre-cropping them into one
	 * landscape box lost the portrait subject entirely and no CSS could make a
	 * 46 and a 157 read as one set, so the crop and the tone are both corrected
	 * here: `square` crops to 1:1 on the most detailed region rather than the
	 * middle, and `tone` pulls each toward a shared target luminance.
	 */
	{
		src: 'SundayS1.jpg',
		name: 'plate-early',
		widths: [256, 384],
		quality: 82,
		square: true,
		tone: 105,
	},
	{
		src: 'SundayS2.jpg',
		name: 'plate-service',
		widths: [256, 384],
		quality: 82,
		square: true,
		tone: 105,
	},
	{
		src: 'SundaySchool.jpg',
		name: 'plate-school',
		widths: [256, 384],
		quality: 82,
		square: true,
		tone: 105,
	},
];

const kb = (bytes) => Math.round(bytes / 1024);

const luminance = (stats) =>
	0.2126 * stats.channels[0].mean +
	0.7152 * stats.channels[1].mean +
	0.0722 * stats.channels[2].mean;

/*
 * Brightness needed to move an image toward the target. Clamped, because
 * dragging a very dark frame all the way up washes the blacks out and lifts
 * sensor noise — better to close most of the gap than to overcook it.
 */
const toneFactor = (measured, target) => Math.min(1.55, Math.max(0.75, target / measured));

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

/*
 * Icons and the social card.
 *
 * The crest is a round mark on transparency — 83% of its pixels are clear — so
 * the web icons keep their alpha and stay round. Only the Apple touch icon gets
 * a paper background, because iOS composites a transparent icon onto black and
 * applies its own rounded mask, so it needs an opaque square with breathing
 * room inside that mask.
 *
 * Google wants a search favicon that is 48px or a multiple of it, which the
 * 48px ICO only just satisfies, so 192 and 512 PNGs sit alongside it.
 */
const CREST = 'logo/logo_small.svg';
const PAPER = { r: 251, g: 250, b: 247, alpha: 1 };
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 };

async function crestAt(size, inset) {
	const inner = Math.round(size * inset);
	return sharp(join(STATIC, CREST), { density: 600 })
		.resize(inner, inner, { fit: 'contain', background: CLEAR })
		.toBuffer();
}

async function plate(size, background, inset) {
	return sharp({ create: { width: size, height: size, channels: 4, background } })
		.composite([{ input: await crestAt(size, inset), gravity: 'centre' }])
		.png({ compressionLevel: 9 })
		.toBuffer();
}

async function buildIcons() {
	if (!existsSync(join(STATIC, CREST))) {
		console.warn(`  SKIP icons (missing): ${CREST}`);
		return;
	}

	console.log('');
	console.log('  Icons');

	// Tab and search icons: transparent, and near full-bleed since there is no
	// background for the mark to breathe against.
	for (const size of [192, 512]) {
		const buf = await plate(size, CLEAR, 0.94);
		writeFileSync(join(PUBLIC, `icon-${size}.png`), buf);
		console.log(
			`    ${String(size + 'px').padEnd(7)} -> icon-${size}.png  ${kb(buf.length)} KB  transparent`,
		);
	}

	const apple = await plate(180, PAPER, 0.76);
	writeFileSync(join(PUBLIC, 'apple-touch-icon.png'), apple);
	console.log(`    180px   -> apple-touch-icon.png  ${kb(apple.length)} KB  on paper`);

	// Crawlers still probe /favicon.ico directly, and the declared shortcut was
	// pointing at a path that did not exist. sharp has no ICO encoder, so the
	// original multi-size ICO (16/32/48, with its alpha intact) is reused there.
	const ico = join(ROOT, 'icon.ico');
	if (existsSync(ico)) {
		writeFileSync(join(PUBLIC, 'favicon.ico'), readFileSync(ico));
		console.log(`    16/32/48 -> favicon.ico  ${kb(statSync(ico).size)} KB  original, unmodified`);
	}
}

async function buildSocialCard() {
	const src = join(STATIC, 'hero.jpg');
	if (!existsSync(src)) {
		console.warn('  SKIP social card (missing): hero.jpg');
		return;
	}

	const W = 1200;
	const H = 630;

	const base = await sharp(src)
		.resize(W, H, { fit: 'cover', position: sharp.strategy.attention })
		.toBuffer();

	// Same scrim the hero uses, so the card and the page look related.
	const scrim = Buffer.from(
		`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id="s" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stop-color="#14211c" stop-opacity="0.32"/>
					<stop offset="55%" stop-color="#14211c" stop-opacity="0.42"/>
					<stop offset="100%" stop-color="#14211c" stop-opacity="0.82"/>
				</linearGradient>
			</defs>
			<rect width="${W}" height="${H}" fill="url(#s)"/>
		</svg>`,
	);

	const crest = await sharp(join(STATIC, CREST), { density: 600 })
		.resize({ height: 150 })
		.toBuffer();

	const buf = await sharp(base)
		.composite([
			{ input: scrim, top: 0, left: 0 },
			{ input: crest, top: H - 150 - 56, left: 72 },
		])
		.jpeg({ quality: 82, progressive: true, mozjpeg: true })
		.toBuffer();

	writeFileSync(join(PUBLIC, 'og.jpg'), buf);
	console.log('');
	console.log('  Social card');
	console.log(`    ${W}x${H} -> og.jpg  ${kb(buf.length)} KB`);
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
			let pipeline = sharp(input);

			if (item.square) {
				pipeline = pipeline.resize(width, width, {
					fit: 'cover',
					position: sharp.strategy.attention,
				});
			} else {
				pipeline = pipeline.resize({ width, withoutEnlargement: true });
			}

			if (item.tone) {
				// Measure the cropped frame, not the original: the crop changes the tone.
				const cropped = await pipeline.clone().png().toBuffer();
				const brightness = toneFactor(luminance(await sharp(cropped).stats()), item.tone);
				pipeline = pipeline.modulate({ brightness });
			}

			const buf = await pipeline.webp({ quality: item.quality, effort: 5 }).toBuffer();
			const { writeFileSync } = await import('node:fs');
			writeFileSync(target, buf);
			after += buf.length;
			console.log(
				`    ${String(width + 'w').padEnd(6)} -> opt/${item.name}-${width}.webp  ${kb(buf.length)} KB`,
			);
		}
	}

	await optimizeSvgAssets();
	await buildIcons();
	await buildSocialCard();

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
