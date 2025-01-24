import React, { createContext, ReactNode, useContext, useState } from 'react'
import { Blog } from '../types/Blog'

type BlogContextType = {
    blogs: Blog[];
    addBlog: (blog: Blog) => void;
    editBlog: (index: number, newBlog: Blog) => void;
    removeBlog: (index: number) => void
    getBlogByIndex: (index: number) => Blog
}

const BlogContext = createContext<BlogContextType | null>(null)

const BlogProvider = ({ children }: { children: ReactNode }) => {
    const [blogs, setBlogs] = useState<Blog[]>([
        {
            title: "The Joys of React Native",
            body: "React Native is a fantastic framework for building cross-platform mobile applications. Its declarative style and component-based architecture make it a joy to work with.",
        },
        {
            title: "TypeScript: A Love Story",
            body: "TypeScript brings static typing to JavaScript, making code more robust and maintainable. It's a must-have for any serious JavaScript project.",
        },
        {
            title: "Why I Love My Cavalier King Charles Spaniel",
            body: "Cavalier King Charles Spaniels are the sweetest, most loving dogs. Even though my pup struggles with anxiety, he brings so much joy to my life.",
        },
        {
            title: "The Art of the Perfect Ramen Bowl",
            body: "Ramen is more than just a dish; it's an art form. From the broth to the noodles to the toppings, every element contributes to a symphony of flavor.",
        },
        {
            title: "Brazilian Jiu-Jitsu: More Than Just a Sport",
            body: "BJJ is a martial art that challenges you both physically and mentally. It's a great way to get in shape, learn self-defense, and build discipline.",
        },
        {
            title: "Mastering the Art of the Bass Guitar",
            body: "The bass guitar is the backbone of any band. It provides the groove and lays the foundation for the rest of the music.",
        },
        {
            title: "The Magic of Music: R&B and Pagode",
            body: "Music has the power to move us, inspire us, and connect us. R&B and Pagode are two genres that hold a special place in my heart.",
        },
        {
            title: "My Journey into System Design",
            body: "System design is a fascinating field that requires a deep understanding of software architecture and scalability. I'm excited to share my learning journey with you.",
        },
        {
            title: "Conquering Coding Challenges: LeetCode and HackerRank",
            body: "Coding challenges are a great way to sharpen your problem-solving skills and prepare for technical interviews. I'm sharing my tips and tricks for success.",
        },
        {
            title: "The Power of Introverted Learning",
            body: "Introverts have a unique learning style that often involves deep focus and independent study. I'm embracing my introverted nature and finding ways to learn effectively.",
        },
        {
            title: "Coffee: The Fuel of Champions",
            body: "Coffee is more than just a beverage; it's a ritual, a source of energy, and a way of life. I love exploring different coffee beans and brewing methods.",
        },
        {
            title: "The Importance of a Supportive Partner",
            body: "Having a supportive partner can make all the difference in life. I'm grateful for the love and support of my amazing partner.",
        },
        {
            title: "Weightlifting: A Journey of Strength and Self-Discovery",
            body: "Weightlifting is a challenging but rewarding activity that has helped me build strength, both physically and mentally.",
        },
        {
            title: "Exploring the World of Meat: A Carnivore's Delight",
            body: "As a meat lover, I'm always on the lookout for new and delicious ways to enjoy meat. From perfectly grilled steaks to savory stews, there's a world of flavor to explore.",
        },
        {
            title: "Full-Stack Development: My Passion and Profession",
            body: "Full-stack development allows me to work on both the front-end and back-end of web applications. It's a challenging but rewarding field that I'm passionate about.",
        },
    ])

    const addBlog = (blog: Blog) => {
        setBlogs([...blogs, blog])
    }

    const editBlog = (index: number, newBlog: Blog) => {
        setBlogs(blogs.map((blog: Blog, i: number) => (index === i ? newBlog : blog)))
    }

    const removeBlog = (index: number) => {
        setBlogs(blogs.filter((_: Blog, i: number) => (i !== index)))
    }

    const getBlogByIndex = (index: number) => (blogs[index])

    return (
        <BlogContext.Provider value={{ blogs, addBlog, editBlog, removeBlog, getBlogByIndex }}>
            {children}
        </BlogContext.Provider>
    )
}

const useBlogs = () => {
    const context = useContext(BlogContext);
    if (context === null) {
        throw new Error('useBlogs must be used within an BlogProvider');
    }
    return context;
}


export { useBlogs, BlogProvider }
