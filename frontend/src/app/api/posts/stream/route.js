import { listenToPosts } from "../../communityPosts/firebaseQueries";

export const config = { runtime: "edge" }; // Run on Edge for faster execution

export async function GET(req) {
    return new Response(new ReadableStream({
        start(controller) {
            // Start Firestore real-time listener
            const unsubscribe = listenToPosts((posts) => {
                controller.enqueue(`data: ${JSON.stringify(posts)}\n\n`);
            });

            // Handle client disconnect
            req.signal.addEventListener("abort", () => {
                unsubscribe(); // Stop Firestore listener
                controller.close();
            });
        }
    }), {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            "Connection": "keep-alive",
        },
    });
}
