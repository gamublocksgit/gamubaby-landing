import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const assetsDir = path.join(process.cwd(), "public", "assets");
const pngs = (await readdir(assetsDir)).filter((name) => name.endsWith(".png"));

await Promise.all(
  pngs.map(async (name) => {
    const source = path.join(assetsDir, name);
    const target = path.join(assetsDir, name.replace(/\.png$/, ".webp"));
    try {
      const [sourceStat, targetStat] = await Promise.all([
        stat(source),
        stat(target).catch(() => null),
      ]);
      if (targetStat && targetStat.mtimeMs >= sourceStat.mtimeMs) return;
    } catch {
      // Continue to regeneration; build should fail only if sharp cannot read/write.
    }

    await sharp(source)
      .webp({ quality: name === "logo.png" ? 90 : 82 })
      .toFile(target);
  }),
);
