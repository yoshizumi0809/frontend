import React, { useContext, useEffect } from 'react';
import styled from "styled-components";
import Post from './Post.tsx';
import { PostListContext, PostType } from '../providers/PostListProvider.tsx';
import { UserContext } from '../providers/UserProvider.tsx';
import { getList } from '../api/Post.tsx';

export default function PostList() {
	// ポストリストコンテキスト、ユーザーコンテキストを使用する
	const { postList, setPostList } = useContext(PostListContext);
	const { userInfo } = useContext(UserContext);


	// ポスト一覧を取得する関数

	const getPostList = async() => {
		const posts = await getList(userInfo.token);
		console.log(posts);
	
		// getListで取得したポスト配列をコンテキストに保存する
		let postList: Array<PostType> = [];
		if (posts) {
		  posts.forEach((p: any) => {
			postList.push({
			  id: p.id,
			  user_name: p.user_name,	
			  content: p.content,	
			  created_at: new Date(p.created_at),	
			});			  });	
		}	
		setPostList(postList);	
	  }

	  useEffect(() => {
		getPostList();
	  }, []);

	  return (
		<SPostList>
		  {postList.map((p) => (
			<Post key={p.id} post={p} />
		  ))}
		</SPostList>
	  );
}

const SPostList = styled.div`
  margin-top: 16px;
  height: 100%;
  overflow-y: scroll;
`