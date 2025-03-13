// app/api/posts/comment/delete/route.js
import { NextResponse } from "next/server";
import { getPostRef, getPostSnapshot, updateCommentsInDB } from "../../../../api/communityPosts/firebaseQueries";

export async function POST(req) {
    const { session, postId, commentIndex } = await req.json();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const postRef = getPostRef(postId);
    const postSnap = await getPostSnapshot(postRef);
    if (!postSnap.exists()) return NextResponse.json({ error: "Post not found" }, { status: 404 });

    const post = postSnap.data();
    let comments = post.comments || [];

    if (comments[commentIndex]?.user !== session.user.name) {
        return NextResponse.json({ error: "You can only delete your own comments" }, { status: 403 });
    }

    comments.splice(commentIndex, 1);
    await updateCommentsInDB(postRef, comments);

    return NextResponse.json({ success: true });
}
