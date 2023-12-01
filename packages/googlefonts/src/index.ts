import { ofetch } from "ofetch";

export class Googlefonts {
  key: string;
  baseURL = "https://www.googleapis.com/webfonts/v1/webfonts";

  constructor(key: string, baseURL?: string) {
    this.key = key;
    if (baseURL) {
      this.baseURL = baseURL;
    }
  }

  public async getWebfonts(params: {
    sort?: "alpha" | "date" | "popularity" | "style" | "trending";
    family?: string;
    subset?: string;
    capability?: "WOFF2" | "VF";
  }) {
    const webfontList = await ofetch(this.baseURL, {
      parseResponse: JSON.parse,
      params: {
        key: this.key,
        ...params,
      },
    });

    return webfontList;
  }
}
