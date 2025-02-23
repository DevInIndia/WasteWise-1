import { NextResponse } from "next/server";
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs,addDoc ,serverTimestamp} from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userEmail, prompt, result, imageUrl } = body;
    if (!userEmail || !prompt || !result) {
      console.error(" Missing required fields!");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await addDoc(collection(db, "userPrompts"), {
      userEmail,
      prompt,
      result,
      imageUrl,
      createdAt: serverTimestamp(),
    });

    console.log("Data successfully saved to Firestore!");
    return NextResponse.json({ message: "Prompt saved successfully" }, { status: 200 });
  } catch (error) {
    console.error(" Error in API route:", error);
    return NextResponse.json({ error: "Failed to save prompt", details: error.message }, { status: 500 });
  }
}


export async function GET(request) {
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get("email"); // Get email from the query parameter

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Query the userPrompts collection and filter by user email
    const promptsRef = collection(db, "userPrompts");
    const q = query(promptsRef, where("userEmail", "==", email));
    const querySnapshot = await getDocs(q);

    const prompts = querySnapshot.empty
      ? []
      : querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

    return NextResponse.json(prompts, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return NextResponse.json({ error: "Error fetching prompts" }, { status: 500 });
  }
}
