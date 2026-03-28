import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useViewMode } from '../../components/ViewContext';
import { PaperView } from './PaperView';
import { HumorView } from './HumorView';

export default function DetailPage() {
  const { id } = useParams();
  const { isHumorMode } = useViewMode();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const fetchPost = useCallback(() => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    fetch(`${apiBaseUrl}/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch post', err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>로딩 중...</div>;
  if (!post) return <div style={{ textAlign: 'center', padding: '3rem' }}>게시글을 찾을 수 없습니다.</div>;

  return isHumorMode 
    ? <HumorView post={post} onCommentAdded={fetchPost} /> 
    : <PaperView post={post} onCommentAdded={fetchPost} />;
}
