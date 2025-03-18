// firebaseOperations.js

export const fetchPosts = (setPosts, setLoading, setError) => {
    setLoading(true);

    let eventSource;

    try {
        // Initial fetch for existing posts
        const fetchData = async () => {
            try {
                const res = await fetch("/api/posts");
                if (!res.ok) throw new Error("Failed to fetch posts");
                
                const data = await res.json();
                setPosts(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching posts:", error.message);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData(); // Fetch existing posts once

        // Set up SSE for real-time updates
        const connectSSE = () => {
            eventSource = new EventSource("/api/posts/stream");

            eventSource.onmessage = (event) => {
                setPosts(JSON.parse(event.data));
                setLoading(false);
            };

            eventSource.onerror = (error) => {
                console.error("SSE Error:", error);
                setError("Reconnecting...");
                eventSource.close();

                // Attempt to reconnect after 3 seconds
                setTimeout(connectSSE, 3000);
            };
        };

        connectSSE(); // Start SSE

        return() => eventSource.close(); // Cleanup when component unmounts
        
    } catch (error) {
        console.error("Error setting up SSE:", error.message);
        setError(error.message);
        setLoading(false);
    }
};


export const createPost = async (session, newPost, image, setNewPost, setImage) => {
    if (!session) return alert("Please sign in to post"); 
    if (!newPost.trim() && !image) return;

    await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session, newPost, image }),
    });

    setNewPost("");
    setImage(null);
};

export const deletePost = async (session, postId) => {
    if (!session) return alert("Please sign in to delete posts");

    await fetch("/api/posts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
    });
};

export const toggleLike = async (session, postId) => {
    if (!session) return alert("Please sign in to like posts");

    await fetch("/api/posts/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session, postId }),
    });
};

export const addComment = async (session, postId, commentText, setCommentText) => {
    if (!session) return alert("Please sign in to comment");
    if (!commentText.trim()) return;

    await fetch("/api/posts/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session, postId, commentText }),
    });

    setCommentText("");
};

export const removeComment = async (session, postId, commentIndex) => {
    if (!session) return alert("Please sign in to delete comments");

    await fetch("/api/posts/comment/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session, postId, commentIndex }),
    });
};
