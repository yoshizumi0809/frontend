import React, { useContext, useEffect } from 'react';
import styled from "styled-components";
import Post from './Post.tsx';
import { PostListContext, PostType } from '../providers/PostListProvider.tsx';
import { UserContext } from '../providers/UserProvider.tsx';
import { getList } from '../api/Post.tsx';

export default function PostList() {
	// ポストリストコンテキスト、ユーザーコンテキストを使用する
	const { postList, setPostList, page } = useContext(PostListContext);
	const { userInfo } = useContext(UserContext);


	// ポスト一覧を取得する関数

	const POSTS_PER_PAGE = 10;
	const start = (page - 1) * POSTS_PER_PAGE;

	const getPostList = async() => {
		const posts = await getList(userInfo.token, start, POSTS_PER_PAGE);
		console.log(posts);
	
		// getListで取得したポスト配列をコンテキストに保存する
		let postList: Array<PostType> = [];
		if (posts) {
		  posts.forEach((p: any) => {
			postList.push({
				post_id:   p.post_id,
				user_name: p.user_name,
				user_id:   p.user_id,
				login_id:  p.login_id,
				content:   p.content,
				created_at: new Date(p.created_at),
			});			  
		});	
		}	
		setPostList(postList);	
	}

	  useEffect(() => {
		getPostList();
	  }, [page]);

	  return (
		<>
			<SPostList>
			{postList.map((p) => (
				<Post key={p.post_id} post={p} />
			))}
			</SPostList>
			<SReloadButton onClick={getPostList}>リロード</SReloadButton>
		</>
		
	  );
	}

const SPostList = styled.div`
  margin-top: 16px;
  height: 100%;
  overflow-y: scroll;
`
const SReloadButton = styled.button`
  background-color: #222222;
  padding: 4px;
  border-radius: 8px;
  color: #fafafa;
  width: 100%;
`