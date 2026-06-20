import { createClient } from "@sanity/client";
import {
  PUBLIC_SANITY_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
} from "$env/static/public";
import { SANITY_API_READ_TOKEN } from "$env/static/private";

/**
 * Draft-aware client for local preview. Uses the "drafts" perspective so
 * queries return unpublished edits. Null when no token is configured.
 * Loaders gate usage on `dev`, so drafts only appear locally.
 * Server-only — never import this into universal/client code.
 *
 * NOTE: $env/static/private requires SANITY_API_READ_TOKEN to be *defined*
 * at build time in every environment (it can be empty). It is set locally in
 * .env; on the host (Render) add an env var SANITY_API_READ_TOKEN (empty is
 * fine) or the build will fail with "not exported by virtual:env/static/private".
 */
export const previewClient = SANITY_API_READ_TOKEN
  ? createClient({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      apiVersion: "2024-01-01",
      useCdn: false,
      token: SANITY_API_READ_TOKEN,
      perspective: "drafts",
    })
  : null;
