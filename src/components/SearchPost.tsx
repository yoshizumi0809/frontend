import React, { useContext, useState } from 'react';
import { PostListContext } from '../providers/PostListProvider.tsx';

export default function SearchPost(){
    const { postList, setPostList } = useContext(PostListContext); // コンテキストから取得
    const [searchText, setSearchText] = useState('');

    const onSearchPost = () => {
    const filtered = postList.filter(post =>
      post.content.includes(searchText)
    );
    setPostList(filtered); // 絞り込んだリストに置き換え（元に戻す機能もあとで入れると良い）
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