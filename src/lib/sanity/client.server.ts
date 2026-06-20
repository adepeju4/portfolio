import { createClient, type SanityClient } from "@sanity/client";
import {
  PUBLIC_SANITY_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
} from "$env/static/public";
import { env } from "$env/dynamic/private";

/**
 * Draft-aware client for local preview. Uses the "drafts" perspective so
 * queries return unpublished edits. Resolved lazily and only in dev, so the
 * token is never required (or read) during the production prerender build.
 * Server-only — never import this into universal/client code.
 */
let cached: SanityClient | null | undefined;

export function getPreviewClient(): SanityClient | null {
  if (cached !== undefined) return cached;

  const token = env.SANITY_API_READ_TOKEN;
  cached = token
    ? createClient({
        projectId: PUBLIC_SANITY_PROJECT_ID,
        dataset: PUBLIC_SANITY_DATASET,
        apiVersion: "2024-01-01",
        useCdn: false,
        token,
        perspective: "drafts",
      })
    : null;

  return cached;
}
