// app/api/posts/route.js
import { getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";
import { addPostToDB, deletePostFromDB, getPostsQuery } from "../../api/communityPosts/firebaseQueries";

export async function GET() {
    try {
        const q = getPostsQuery();
        const snapshot = await getDocs(q);
        const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        return NextResponse.json({ error: "Failed to load posts" }, { status: 500 });
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
