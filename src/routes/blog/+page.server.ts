import { dev } from "$app/environment";
import { client } from "$lib/sanity/client";
import { previewClient } from "$lib/sanity/client.server";
import { postsQuery } from "$lib/sanity/queries";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const preview = dev && !!previewClient;
  const sanity = preview ? previewClient! : client;
  try {
    const posts = await sanity.fetch(postsQuery);
    return { posts: posts ?? [], preview };
  } catch (err) {
    console.error("Sanity fetch error:", err);
    return { posts: [], preview: false };
  }
};
