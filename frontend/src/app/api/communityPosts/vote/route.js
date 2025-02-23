import { NextResponse } from "next/server";
import { db } from "../../../firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const { postId, userEmail, isUpvote } = await req.json();

    if (!postId || !userEmail) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const postRef = doc(db, "communityPosts", postId);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const post = postSnap.data();
    const upvotes = new Set(post.upvotes || []);
    const downvotes = new Set(post.downvotes || []);
    let voteCount = post.voteCount ?? 0;

    if (isUpvote) {
      if (upvotes.has(userEmail)) {
        // Cancel upvote
        upvotes.delete(userEmail);
        voteCount--;
      } else {
        // Add upvote and remove downvote if exists
        if (downvotes.has(userEmail)) {
          downvotes.delete(userEmail);
          voteCount++;
        }
        upvotes.add(userEmail);
        voteCount++;
      }
    } else {
      if (downvotes.has(userEmail)) {
        // Cancel downvote
        downvotes.delete(userEmail);
        voteCount++;
      } else {
        // Add downvote and remove upvote if exists
        if (upvotes.has(userEmail)) {
          upvotes.delete(userEmail);
          voteCount--;
        }
        downvotes.add(userEmail);
        voteCount--;
      }
    }

    const updateData = {
      upvotes: [...upvotes],
      downvotes: [...downvotes],
      voteCount
    };

    await updateDoc(postRef, updateData);
    
    return NextResponse.json({ 
      success: true,
      data: updateData
    });
  } catch (error) {
    console.error("Error updating vote:", error);
    return NextResponse.json({ error: "Failed to update vote" }, { status: 500 });
  }
}