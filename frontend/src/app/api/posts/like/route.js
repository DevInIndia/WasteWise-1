// app/api/posts/like/route.js
import { NextResponse } from "next/server";
import { getPostRef, getPostSnapshot, updateLikesInDB } from "../../communityPosts/firebaseQueries";

export async function POST(req) {
    const { session, postId } = await req.json();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const postRef = getPostRef(postId);
    const postSnap = await getPostSnapshot(postRef);
    if (!postSnap.exists()) return NextResponse.json({ error: "Post not found" }, { status: 404 });

    const post = postSnap.data();
    let likes = new Set(post.likes || []);

    if (likes.has(session.user.email)) {
        likes.delete(session.user.email);
    } else {
        likes.add(session.user.email);
    }

    await updateLikesInDB(postRef, likes);
    return NextResponse.json({ success: true });
}
