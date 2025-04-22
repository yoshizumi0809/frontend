import React, { useContext, useState } from 'react';
import { PostListContext } from '../providers/PostListProvider.tsx';

export default function SearchPost(){
    const { postList, setPostList } = useContext(PostListContext); // コンテキストから取得
    const [searchText, setSearchText] = useState('');
    const [originalPostList] = useState(postList); // 元の配列のコピー

    const onSearchPost = () => {
        const filtered = originalPostList.filter(post =>
          post.content.includes(searchText)
        );
        setPostList(filtered);
    };

    return(
        
        <>
            <span>メッセージを検索</span>
            <input
                type="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <button type="submit" onClick={onSearchPost}>🔍</button>
        </>
    )
}