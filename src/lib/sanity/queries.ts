import { defineQuery } from 'groq';

// --- Projects ---

export const projectsQuery = defineQuery(`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    image,
    tags,
    liveUrl,
    repoUrl,
    featured,
    order
  }
`);

export const featuredProjectsQuery = defineQuery(`
  *[_type == "project" && featured == true] | order(order asc) {
    _id,
    title,
    slug,
    description,
    image,
    tags,
    liveUrl,
    repoUrl
  }
`);

// --- Blog Posts ---

export const postsQuery = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    tags,
    publishedAt,
    "author": author->{ name, image }
  }
`);

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    body,
    tags,
    publishedAt,
    "author": author->{ name, image, bio, socialLinks }
  }
`);

// --- Author (for About / Contact section) ---

export const authorQuery = defineQuery(`
  *[_type == "author"][0] {
    _id,
    name,
    headline,
    bio,
    "bioText": pt::text(bio),
    image,
    skills,
    socialLinks
  }
`);
