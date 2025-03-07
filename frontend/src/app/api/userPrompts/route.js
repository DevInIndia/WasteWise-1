import { NextResponse } from "next/server";
import { db } from "../../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing prompt ID" }, { status: 400 });
    }

    await deleteDoc(doc(db, "userPrompts", id));

    return NextResponse.json({ message: "Prompt deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete prompt", details: error.message }, { status: 500 });
  }
}
