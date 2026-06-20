import { error } from "@sveltejs/kit";
import { dev } from "$app/environment";
import { client } from "$lib/sanity/client";
import { previewClient } from "$lib/sanity/client.server";
import { postBySlugQuery } from "$lib/sanity/queries";
import { urlFor } from "$lib/sanity/image";
import { renderMarkdown } from "$lib/server/markdown";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const preview = dev && !!previewClient;
  const sanity = preview ? previewClient! : client;

  const post = await sanity.fetch(postBySlugQuery, { slug: params.slug });

  if (!post) {
    error(404, "Post not found");
  }

  const ogImage = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).fit("crop").url()
    : undefined;

  const bodyHtml = await renderMarkdown(post.body ?? "");

  return { post, ogImage, preview, bodyHtml };
};
