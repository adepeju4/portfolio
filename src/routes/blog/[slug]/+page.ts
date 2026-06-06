import { error } from "@sveltejs/kit";
import { client } from "$lib/sanity/client";
import { postBySlugQuery } from "$lib/sanity/queries";
import { urlFor } from "$lib/sanity/image";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const post = await client.fetch(postBySlugQuery, { slug: params.slug });

  if (!post) {
    error(404, "Post not found");
  }

  const ogImage = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return { post, ogImage };
};
