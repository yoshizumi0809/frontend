import React, { useContext } from 'react';
import styled from "styled-components";
import { PostListContext } from '../providers/PostListProvider.tsx';

export default function Pagenation(){

    const {page, setPage} = useContext(PostListContext)
    const gotoPreviousPage = () =>{
        setPage(Math.max(1, page - 1));
    }

    const gotoNextPage = () =>{
        setPage(page + 1)
    }

    return(
        <SPagenation>
            <button onClick={gotoPreviousPage} disabled={page === 1}>« 前のページ</button>
            <button onClick={gotoNextPage}>次のページ »</button>
        </SPagenation>
    )
}


const SPagenation = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  justify-content: center;
  border-top: 1px solid #ccc;
`;