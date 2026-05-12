import { createContext, useContext } from "react";

/**
 * Internal context that lets wrappers know they're rendered inside a stagger
 * container. Children of a group must NOT set `initial` / `whileInView` of
 * their own — they inherit from the parent so timing is driven by stagger.
 *
 * Components in `/components/animations` consume this context automatically
 * via `useInGroup()`. You never need to read it yourself.
 */
export const AnimationGroupContext = createContext(false);

export const useInGroup = () => useContext(AnimationGroupContext);
