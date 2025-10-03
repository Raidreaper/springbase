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
  // Science lab set
  if (
    [
      'img_1502', 'img_1709', 'img_1711', 'img_1721',
      'img_1752', 'img_1753', 'img_1754', 'img_1755', 'img_1756', 'img_1757',
      'img_1758', 'img_1759', 'img_1760', 'img_1761', 'img_1762', 'img_1763',
      'img_1764', 'img_1765', 'img_1766', 'img_1767', 'img_1768', 'img_1769',
      'img_1770', 'img_1771', 'img_1772', 'img_1773', 'img_1774', 'img_1775',
      'img_1776', 'img_1777', 'img_1778', 'img_1779', 'img_1780', 'img_1781',
      'img_1782', 'img_1783', 'img_1784', 'img_1785', 'img_1786', 'img_1787',
      'img_1788', 'img_1789', 'img_1790', 'img_1791', 'img_1792', 'img_1793',
      'img_1794', 'img_1795', 'img_1796', 'img_1797', 'img_1798', 'img_1799',
      'img_1800', 'img_1801', 'img_1802', 'img_1803', 'img_1804', 'img_1805',
      'img_1806', 'img_1807', 'img_1808', 'img_1809', 'img_1810', 'img_1811',
      'img_1812'
    ].some((k) => f.startsWith(k))
  ) {
    return 'science-lab';
  }
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

    // Progressive JPEG fallback
    const jpgName = filename.replace(/\.[^.]+$/, `-${width}.jpg`);
    const jpgDest = path.join(outDir, jpgName);
    await image
      .clone()
      .resize({ width })
      .jpeg({ quality: 85, progressive: true, mozjpeg: true })
      .toFile(jpgDest)
      .catch(() => {});
    if (fs.existsSync(jpgDest)) files.push(path.posix.join(album, jpgName));
  }

  // Also write an original-size WebP
  const outName = filename.replace(/\.[^.]+$/, `.webp`);
  const origDest = path.join(outDir, outName);
  await image.clone().webp({ quality: 82 }).toFile(origDest).catch(() => {});
  if (fs.existsSync(origDest)) files.push(path.posix.join(album, outName));

  // And an original-size progressive JPEG
  const jpgOrig = filename.replace(/\.[^.]+$/, `.jpg`);
  const jpgOrigDest = path.join(outDir, jpgOrig);
  await image
    .clone()
    .jpeg({ quality: 85, progressive: true, mozjpeg: true })
    .toFile(jpgOrigDest)
    .catch(() => {});
  if (fs.existsSync(jpgOrigDest)) files.push(path.posix.join(album, jpgOrig));

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


