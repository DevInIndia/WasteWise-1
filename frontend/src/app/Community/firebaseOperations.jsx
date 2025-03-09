// firebaseOperations.js
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const fetchPosts = (setPosts, setLoading) => {
    const postsRef = collection(db, "communityPosts");
    const q = query(postsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
    setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
});

    return unsubscribe;
};

export const createPost = async (session, newPost, image, setNewPost, setImage) => {
    if (!session) return alert("Please sign in to post"); 
    if (!newPost.trim() && !image) return;

await addDoc(collection(db, "communityPosts"), {
    user: session.user.name,
    userImage: session.user.image,
    result: newPost,
    imageUrl: image,
    createdAt: serverTimestamp(),
    likes: [],
    comments: [],
});

    setNewPost("");
    setImage(null);
};

export const deletePost = async (session, postId) => {
    if (!session) return alert("Please sign in to delete posts");
    await deleteDoc(doc(db, "communityPosts", postId));
};

export const toggleLike = async (session, postId) => {
    if (!session) return alert("Please sign in to like posts");
    const postRef = doc(db, "communityPosts", postId);
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) return;

    const post = postSnap.data();
    let likes = new Set(post.likes || []);

    if (likes.has(session.user.email)) {
    likes.delete(session.user.email);
    } else {
    likes.add(session.user.email);
    }

    await updateDoc(postRef, { likes: [...likes] });
};

export const addComment = async (session, postId, commentText, setCommentText) => {
    if (!session) return alert("Please sign in to comment");
    if (!commentText.trim()) return;

    const postRef = doc(db, "communityPosts", postId);
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) return;

    const post = postSnap.data();
    let comments = post.comments || [];
    comments.push({ user: session.user.name, text: commentText, createdAt: new Date().toISOString() });

    await updateDoc(postRef, { comments });
    setCommentText("");
};

export const removeComment = async (session, postId, commentIndex) => {
    if (!session) return alert("Please sign in to delete comments");
    const postRef = doc(db, "communityPosts", postId);
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) return;

    const post = postSnap.data();
    let comments = post.comments || [];

    if (comments[commentIndex]?.user !== session.user.name) return alert("You can only delete your own comments");

    comments.splice(commentIndex, 1);
    await updateDoc(postRef, { comments });
};
