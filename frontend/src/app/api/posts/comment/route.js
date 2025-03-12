// app/api/posts/comment/route.js
import { NextResponse } from "next/server";
import { getPostRef, getPostSnapshot, updateCommentsInDB } from "../../../api/communityPosts/firebaseQueries";

export async function POST(req) {
    const { session, postId, commentText } = await req.json();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const postRef = getPostRef(postId);
    const postSnap = await getPostSnapshot(postRef);
    if (!postSnap.exists()) return NextResponse.json({ error: "Post not found" }, { status: 404 });

    const post = postSnap.data();
    let comments = post.comments || [];
    comments.push({ user: session.user.name, text: commentText, createdAt: new Date().toISOString() });

    await updateCommentsInDB(postRef, comments);
    return NextResponse.json({ success: true });
}
