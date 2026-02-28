import { error } from "@sveltejs/kit";
import { client } from "$lib/sanity/client";
import { postBySlugQuery } from "$lib/sanity/queries";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const post = await client.fetch(postBySlugQuery, { slug: params.slug });

  if (!post) {
    error(404, "Post not found");
  }

  return { post };
};
