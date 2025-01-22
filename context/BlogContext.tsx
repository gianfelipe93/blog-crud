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
    const [blogs, setBlogs] = useState<Blog[]>([])

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
