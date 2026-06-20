import { createClient } from "@sanity/client";
import {
  PUBLIC_SANITY_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
} from "$env/static/public";
import { SANITY_API_READ_TOKEN } from "$env/static/private";

/**
 * Draft-aware client for local preview. 
 * **/

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
