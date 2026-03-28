import React, { useEffect, useState } from 'react';
import { useViewMode } from '../../components/ViewContext';
import { PaperView } from './PaperView';
import { HumorView } from './HumorView';

export default function ListPage() {
  const { isHumorMode } = useViewMode();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
    fetch(`${apiBaseUrl}/posts`)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch posts', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>로딩 중...</div>;

  return isHumorMode ? <HumorView posts={posts} /> : <PaperView posts={posts} />;
}
