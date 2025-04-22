import React from 'react';
import PostList from './PostList.tsx';
import Pagenation from './Pagenation.tsx';
import SearchPost from './SearchPost.tsx';
export default function Contents() {
	return (
		<>
			<SearchPost/>
			<PostList/>
			<Pagenation/>
		</>
		
	)
}