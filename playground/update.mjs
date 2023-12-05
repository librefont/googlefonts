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
      JSON.stringify(webfontList.items, null, 2),
    );
  }
}

const data = (await googlefonts.getWebfonts()).items;

let variantsList = [];

let subsetsList = [];

let categoriesList = [];

for (let i = 0; i < data.length; i++) {
  const { variants, subsets, category } = data[i];

  for (let j = 0; j < variants.length; j++) {
    if (!variantsList.includes(variants[j])) {
      variantsList.push(variants[j]);
    }
  }

  for (let j = 0; j < subsets.length; j++) {
    if (!subsetsList.includes(subsets[j])) {
      subsetsList.push(subsets[j]);
    }
  }

  if (!categoriesList.includes(category)) {
    categoriesList.push(category);
  }
}

writeFileSync("./webfontList/variants.json", JSON.stringify(variantsList));

writeFileSync("./webfontList/subsets.json", JSON.stringify(subsetsList));

writeFileSync("./webfontList/categories.json", JSON.stringify(categoriesList));
