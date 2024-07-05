import React from 'react';

const MediaPost = () => {
    const posts = [
        {
            avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/38638c67d523e19dcf21fc35a84f15f32b881a14ac26a17dee0a841b7717ea0e?apiKey=f7a84a3244c847b980b62828a7d406c5&",
            username: "Max",
            date: "26/06/2024",
            content: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
            options: "https://cdn.builder.io/api/v1/image/assets/TEMP/b604a5129cf64f9e73b5ec24a24aec03d553d024f7a7703ae8def7ceffdac2c6?apiKey=f7a84a3244c847b980b62828a7d406c5&"
        },
        {
            avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/ec82f7ec3a40d221d596e8413dd2011a7d987bbab503b6151cf2a71137706973?apiKey=f7a84a3244c847b980b62828a7d406c5&",
            username: "Jack",
            date: "26/06/2024",
            content: "Lorem ipsum dolor sit amet consectetur. Pellentesque amet gravida massa molestie platea tincidunt pulvinar.",
            options: "https://cdn.builder.io/api/v1/image/assets/TEMP/3ad3d4afdebab484b2a2f82df00183dd17c3525b861a44d65b6a7806524c1014?apiKey=f7a84a3244c847b980b62828a7d406c5&"
        },
        {
            avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/ef0634cffba0d5c44dca3775ecf9b598197284a331f0a1a1564f2eb637c3a6c1?apiKey=f7a84a3244c847b980b62828a7d406c5&",
            username: "Janny",
            date: "26/06/2024",
            content: "Lorem ipsum dolor sit amet consectetur. Pellentesque amet gravida massa molestie platea tincidunt pulvinar.",
            options: "https://cdn.builder.io/api/v1/image/assets/TEMP/00f62c611921142ff3f86abceade08c333907d6087a59e8f59e6d5c7a5fc1227?apiKey=f7a84a3244c847b980b62828a7d406c5&"
        },
        {
            avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/d5a740decbd5fb7e5d2cd8a78bca865e1f56ca38002539381d96cfb3ab544c65?apiKey=f7a84a3244c847b980b62828a7d406c5&",
            username: "Oliver",
            date: "26/06/2024",
            content: "Lorem ipsum dolor sit amet consectetur. Pellentesque amet gravida massa molestie platea tincidunt pulvinar.",
            options: "https://cdn.builder.io/api/v1/image/assets/TEMP/67ac9ff8de0148764c8f4477d11e424bf8ac2889df1e9b602ab9f2c194cb2b4b?apiKey=f7a84a3244c847b980b62828a7d406c5&"
        }
    ];
    return (
        <div className="social-posts">
            <div className="posts-grid">
                {posts.map((post, index) => (
                    <article className="post-column" key={index}>
                        <div className="post">
                            <div className="post-header">
                                <div className="user-info">
                                    <img src={post.avatar} alt={`${post.username}'s avatar`} className="user-avatar" />
                                    <div className="user-details">
                                        <span className="username">{post.username}</span>
                                        <time className="post-date">{post.date}</time>
                                    </div>
                                </div>
                                <img src={post.options} alt="Post options" className="post-options" />
                            </div>
                            <p className="post-content">{post.content}</p>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default MediaPost;

