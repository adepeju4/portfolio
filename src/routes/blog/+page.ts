import { client } from "$lib/sanity/client";
import { postsQuery } from "$lib/sanity/queries";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  try {
    const posts = await client.fetch(postsQuery);
    return { posts: posts ?? [] };
  } catch (err) {
    console.error("Sanity fetch error:", err);
    return { posts: [] };
  }
};
