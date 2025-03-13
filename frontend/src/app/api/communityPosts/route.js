import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "../../firebaseConfig";

export async function GET(req) {
  try {

    const snapshot = await getDocs(q);
    const fetchedPosts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(fetchedPosts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts", details: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { id, imageUrl, prompt, result, userEmail, userName, userImage } = await req.json();
    if (!id || !userEmail || !prompt || !result) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if already shared
    const existingQuery = query(collection(db, "communityPosts"), where("originalId", "==", id));
    const existingDocs = await getDocs(existingQuery);

    if (!existingDocs.empty) {
      return NextResponse.json({ error: "Already shared" }, { status: 409 });
    }

    await addDoc(collection(db, "communityPosts"), {
      originalId: id,
      imageUrl,
      prompt,
      result,
      userEmail,
      userName,
      userImage,
      createdAt: serverTimestamp(),
      comments: [],
    });

    return NextResponse.json({ message: "Shared successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to share", details: error.message }, { status: 500 });
  }
}
