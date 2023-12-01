import { writeFileSync } from "fs";
import { Googlefonts } from "@librefont/googlefonts";

const googlefonts = new Googlefonts(process.env.GOOGLE_FONTS_KEY);

const sorts = [null, "alpha", "date", "popularity", "style", "trending"];

const capabilitys = [null, "WOFF2", "VF"];

for (const sort of sorts) {
  for (const capability of capabilitys) {
    const params = Object.fromEntries(
      Object.entries({
        sort,
        capability,
      }).filter(([_, v]) => v !== null),
    );

    const webfontList = await googlefonts.getWebfonts({
      ...params,
    });

    writeFileSync(
      `./webfontList/sort_${sort || "default"}_capability_${
        capability || "default"
      }.json`,
      JSON.stringify(webfontList, null, 2),
    );
  }
}
