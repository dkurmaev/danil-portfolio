import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const ROOT = process.cwd();

const covers = [
  {
    input: 'public/images/projects/dklab/dklab_hero.png',
    output: 'public/images/projects/dklab/cover.webp',
  },
  {
    input: 'public/images/projects/italiano-daily/bot_hero.png',
    output: 'public/images/projects/italiano-daily/cover.webp',
  },
  {
    input: 'public/images/projects/olidort-bedachungen/olidort-hero.png',
    output: 'public/images/projects/olidort-bedachungen/cover.webp',
  },
  {
    input: 'public/images/projects/spacebox-burger/spaceburger-hero.png',
    output: 'public/images/projects/spacebox-burger/cover.webp',
    // The source is a full page screenshot; crop to just the hero fold so
    // the "Bestsellers" section below it doesn't bleed into the card.
    extract: { left: 0, top: 0, width: 1889, height: 620 },
  },
];

async function createCover({ input, output, extract }) {
  const inputPath = resolve(ROOT, input);
  const outputPath = resolve(ROOT, output);

  await mkdir(dirname(outputPath), { recursive: true });

  const image = sharp(inputPath);
  const metadata = await image.metadata();

  if (extract) {
    image.extract(extract);
  }

  await image
    .resize({
      width: 1800,
      withoutEnlargement: true,
    })
    .webp({
      quality: 84,
      effort: 5,
    })
    .toFile(outputPath);

  const result = await sharp(outputPath).metadata();

  console.log(`✓ ${input}`);
  console.log(`  ${metadata.width}x${metadata.height}`);
  console.log(`  → ${output}`);
  console.log(`  ${result.width}x${result.height}\n`);
}

for (const cover of covers) {
  try {
    await createCover(cover);
  } catch (error) {
    console.error(`✗ Failed: ${cover.input}`);
    console.error(error);
    process.exitCode = 1;
  }
}
