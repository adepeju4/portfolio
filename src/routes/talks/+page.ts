import { client } from "$lib/sanity/client";
import { talksQuery } from "$lib/sanity/queries";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  try {
    const talks = await client.fetch(talksQuery);
    return { talks: talks ?? [] };
  } catch (err) {
    console.error("Sanity fetch error:", err);
    return { talks: [] };
  }
};
