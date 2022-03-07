import { ViteSSGContext } from "vite-ssg";

export type ViteModule = (ctx: ViteSSGContext) => void;
