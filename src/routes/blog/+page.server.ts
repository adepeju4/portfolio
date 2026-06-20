import { dev } from "$app/environment";
import { client } from "$lib/sanity/client";
import { getPreviewClient } from "$lib/sanity/client.server";
import { postsQuery } from "$lib/sanity/queries";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const previewClient = dev ? getPreviewClient() : null;
  const preview = !!previewClient;
  const sanity = previewClient ?? client;
  try {
    const posts = await sanity.fetch(postsQuery);
    return { posts: posts ?? [], preview };
  } catch (err) {
    console.error("Sanity fetch error:", err);
    return { posts: [], preview: false };
  }
};
