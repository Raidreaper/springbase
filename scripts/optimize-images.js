import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const sourceDir = path.resolve('src/assets');
const outBase = path.resolve('public/images');
const sizes = [1920, 1280, 960, 640];
const manifest = { albums: {} };

/** Ensure directory exists */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/** Map file to album folder by filename (basic mapping for now) */
function mapToAlbum(filename) {
  const f = filename.toLowerCase();
  if (f.includes('8eada9e5')) return 'staff';
  if (f.includes('c3fc96ba')) return 'parade';
  if (f.includes('af7c268b') || f.includes('142af87f')) return 'assemblies';
  // everything else: community-outreach
  return 'community-outreach';
}

async function processImage(filePath) {
  const filename = path.basename(filePath);
  const album = mapToAlbum(filename);
  const outDir = path.join(outBase, album);
  ensureDir(outDir);

  const image = sharp(filePath);
  const meta = await image.metadata();

  // Generate responsive sizes in WebP
  const files = [];
  for (const width of sizes) {
    if (meta.width && meta.width < width) continue;
    const outName = filename.replace(/\.[^.]+$/, `-${width}.webp`);
    const dest = path.join(outDir, outName);
    await image.clone().resize({ width }).webp({ quality: 82 }).toFile(dest).catch(() => {});
    if (fs.existsSync(dest)) files.push(path.posix.join(album, outName));
  }

  // Also write an original-size WebP
  const outName = filename.replace(/\.[^.]+$/, `.webp`);
  const origDest = path.join(outDir, outName);
  await image.clone().webp({ quality: 82 }).toFile(origDest).catch(() => {});
  if (fs.existsSync(origDest)) files.push(path.posix.join(album, outName));

  if (!manifest.albums[album]) manifest.albums[album] = [];
  manifest.albums[album].push({
    base: filename.replace(/\.[^.]+$/, ''),
    files
  });
}

function listJpgs(dir) {
  return fs.readdirSync(dir)
    .filter(f => /\.(jpe?g|png)$/i.test(f))
    .map(f => path.join(dir, f));
}

async function main() {
  ensureDir(outBase);
  const files = listJpgs(sourceDir);
  if (files.length === 0) {
    console.log('No images found in', sourceDir);
    return;
  }
  console.log('Processing', files.length, 'images...');
  for (const f of files) {
    try {
      await processImage(f);
      console.log('Processed', path.basename(f));
    } catch (err) {
      console.warn('Skipped (unsupported or corrupt):', path.basename(f));
    }
  }
  // write manifest
  ensureDir(outBase);
  fs.writeFileSync(path.join(outBase, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('Done. Output in', outBase, 'and manifest written.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});


