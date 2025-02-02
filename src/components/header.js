import { useState } from "react";

function Navbar() {
    return (
        <>
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="logo">🎬 MoviesMate AI</div>
                <ul className="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#trending">Trending</a></li>
                    <li><a href="#categories">Categories</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
                <button className="cta-button">Get AI Suggestions</button>
            </nav>

            {/* Hero Section */}
            <header className="hero">
                <div className="hero-content">
                    <h1>Discover Movies with AI</h1>
                    <p>Experience a next-gen movie search powered by Artificial Intelligence.</p>
                    <button className="hero-btn">Start Exploring</button>
                </div>
            </header>

            {/* Movie Categories */}
            <section id="categories" className="categories">
                <h2>🎭 Explore by Genre</h2>
                <div className="genre-container">
                    <div className="genre-card">Sci-Fi</div>
                    <div className="genre-card">Action</div>
                    <div className="genre-card">Thriller</div>
                    <div className="genre-card">Comedy</div>
                    <div className="genre-card">Drama</div>
                    <div className="genre-card">Horror</div>
                </div>
            </section>

            {/* Footer Section */}
            <footer id="about" className="footer">
                <p>📽️ Powered by MoviesMate AI | 2025</p>
            </footer>
        </>
    );
}

export default Navbar;
