import { animate, inView } from 'motion';

type RevealOptions = {
	y?: number;
	delay?: number;
	duration?: number;
	amount?: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const prefersReduced = () =>
	typeof window !== 'undefined' &&
	window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Fade + slide an element up when it scrolls into view (once). */
export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	const { y = 12, delay = 0, duration = 0.55, amount = 0.15 } = options;

	if (prefersReduced()) return;

	node.style.opacity = '0';
	let played = false;

	const stop = inView(
		node,
		() => {
			if (played) return;
			played = true;
			animate(node, { opacity: [0, 1], y: [y, 0] }, { duration, delay, ease: EASE });
		},
		{ amount }
	);

	return { destroy: () => stop() };
}

/** Fade + slide an element up immediately on mount (route / page-load entrance). */
export function enter(node: HTMLElement, options: RevealOptions = {}) {
	const { y = 8, delay = 0, duration = 0.4 } = options;

	if (prefersReduced()) return;

	node.style.opacity = '0';
	animate(node, { opacity: [0, 1], y: [y, 0] }, { duration, delay, ease: EASE });
}
