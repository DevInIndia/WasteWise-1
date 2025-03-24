// firebaseQueries.js
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const getPostsQuery = () => {
    const postsRef = collection(db, "communityPosts");
    return query(postsRef, orderBy("createdAt", "desc"));
};

export const listenToPosts = (callback) => {
    const postsRef = collection(db, "communityPosts");
    const q = query(postsRef, orderBy("createdAt", "desc"));

    // Firestore real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        
        if (typeof callback === "function") {
            callback(posts); // Send updated posts to the callback
        }
    });

    return unsubscribe; // Ensure this function is returned to stop the listener when needed
};


export const addPostToDB = async (session, newPost, image) => {
    return await addDoc(collection(db, "communityPosts"), {
        user: session.user.name,
        userImage: session.user.image,
        result: newPost,
        imageUrl: image,
        createdAt: serverTimestamp(),
        likes: [],
        comments: [],
    });
};

export const deletePostFromDB = async (postId) => {
    return await deleteDoc(doc(db, "communityPosts", postId));
};

export const getPostRef = (postId) => {
    return doc(db, "communityPosts", postId);
};

export const getPostSnapshot = async (postRef) => {
    return await getDoc(postRef);
};

export const updateLikesInDB = async (postRef, likes) => {
    return await updateDoc(postRef, { likes: [...likes] });
};

export const updateCommentsInDB = async (postRef, comments) => {
    return await updateDoc(postRef, { comments });
};
