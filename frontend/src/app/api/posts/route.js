// app/api/posts/route.js
import { getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";
import { addPostToDB, deletePostFromDB, getPostsQuery } from "../../api/communityPosts/firebaseQueries";

export const revalidate = 10; // Revalidate cache every 10 seconds

export async function GET() {
    try {
        const q = getPostsQuery();
        const snapshot = await getDocs(q);
        const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        return new Response(json.stringify(posts), {
            headers: { "Content-Type": "application/json", "Cache-Control": "s-maxage=10, stale-while-revalidate" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to load posts" }), { status: 500 });
    }
}

export async function POST(req) {
    const { session, newPost, image } = await req.json();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        await addPostToDB(session, newPost, image);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    const { postId } = await req.json();
    if (!postId) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    try {
        await deletePostFromDB(postId);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
