// This is a minimal Cloudflare Worker that serves your Vite-built assets
export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        // In production, this will serve the built assets
        // The @cloudflare/vite-plugin handles this automatically
        return env.ASSETS.fetch(request);
    },
} satisfies ExportedHandler<Env>;

// Environment interface (add your bindings here if needed)
interface Env {
    ASSETS: Fetcher;
}