import { redirect } from "@sveltejs/kit";

export const ssr = false;
export const prerender = false;

export function load() {
  if (import.meta.env.PROD) {
    redirect(302, "/");
  }
}
