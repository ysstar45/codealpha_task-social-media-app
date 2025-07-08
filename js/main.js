document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/api/posts/all")
        .then(res => res.json())
        .then(posts => {
            const container = document.getElementById("post-container");
            posts.forEach(post => {
                const div = document.createElement("div");
                div.innerHTML = `
          <p><b>${post.user.username}</b></p>
          <img src="http://localhost:5000/${post.image}" width="200"><br>
          <p>${post.caption}</p>
          <button onclick="likePost('${post._id}')">Like (${post.likes.length})</button>
          <form onsubmit="commentPost(event, '${post._id}')">
            <input type="text" name="comment" placeholder="Comment...">
            <button type="submit">Comment</button>
          </form>
        `;
                container.appendChild(div);
            });
        });
});

function likePost(postId) {
    fetch(`http://localhost:5000/api/posts/${postId}/like`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: localStorage.getItem('userId') })
    }).then(() => location.reload());
}

function commentPost(event, postId) {
    event.preventDefault();
    const text = event.target.comment.value;
    fetch(`http://localhost:5000/api/posts/${postId}/comment`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: localStorage.getItem('userId'), text })
    }).then(() => location.reload());
}