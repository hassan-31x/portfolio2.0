/** Optimize generated poster artwork without changing its design.
 * Usage: node scripts/build-project-covers.mjs /path/to/named-png-originals
 */
import sharp from 'sharp'
import { mkdir, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const sourceDirectory = process.argv[2]
if (!sourceDirectory)
  throw new Error('Pass the directory containing the generated PNG originals, named <project>.png.')
const posters = JSON.parse(await readFile('design/project-covers/poster-prompts.json', 'utf8'))
const outputDirectory = 'public/images/projects/posters'
await mkdir(outputDirectory, { recursive: true })
for (const { name, output } of posters) {
  await sharp(resolve(sourceDirectory, `${name}.png`))
    .resize(1200, 750, { fit: 'cover', position: 'centre' })
    .webp({ quality: 90 })
    .toFile(output)
  console.log(`Saved ${output}`)
}
