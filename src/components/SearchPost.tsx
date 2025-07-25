import React, { useContext, useState } from 'react';
import { PostListContext } from '../providers/PostListProvider.tsx';
import { UserContext } from '../providers/UserProvider.tsx';
import { getAllPosts } from '../api/Post.tsx';


export default function SearchPost(){
    const { postList, setPostList } = useContext(PostListContext); // コンテキストから取得
    const { userInfo } = useContext(UserContext); 
    const [searchText, setSearchText] = useState('');

    const onSearchPost = async () => {
    const allPosts = await getAllPosts(userInfo.token);
    const filtered = allPosts
        .filter((post) => post.content.includes(searchText))
        .map((post) => ({
            ...post,
        created_at: new Date(post.created_at),
    }));
    setPostList(filtered);
  };

    return(
        
        <>
            <input
                type="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <button type="submit" onClick={onSearchPost}>🔍</button>
        </>
    )
}