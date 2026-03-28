import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

export function HumorView({ post, onCommentAdded }) {
  const [commentContent, setCommentContent] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!post) return <div>삭제되거나 존재하지 않는 게시물입니다.</div>;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    setIsSubmitting(true);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    try {
      const response = await fetch(`${apiBaseUrl}/posts/${post.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: author || '익명',
          content: commentContent
        }),
      });

      if (response.ok) {
        setCommentContent('');
        setAuthor('');
        if (onCommentAdded) onCommentAdded(); // Refresh post data
      } else {
        alert('댓글 등록 실패!');
      }
    } catch (error) {
      console.error('Comment Error:', error);
      alert('서버 연결 오류!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--bg-card)', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <header style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{post.title}</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <span>{post.author} | {post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}</span>
          <span>조회 0 | 추천 0</span>
        </div>
      </header>
      <div style={{ minHeight: '300px', padding: '1rem 0' }}>
        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
          {post.content}
        </pre>
      </div>

      <div style={{ 
        display: 'flex', justifyContent: 'center', gap: '1rem', margin: '3rem 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' 
      }}>
        <button style={{ 
          background: 'var(--accent-color)', color: '#ffffff', padding: '10px 24px', borderRadius: '24px', fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'not-allowed', opacity: 0.7
        }}>
          <ThumbsUp size={20} /> 추천 (0)
        </button>
        <button style={{ 
          background: 'var(--btn-bg)', color: 'var(--btn-text)', padding: '10px 24px', borderRadius: '24px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer'
        }}>
          <Share2 size={20} /> 공유
        </button>
      </div>

      <div>
        <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageSquare size={20} /> 댓글 {post.comments?.length || 0}
        </h3>
        
        <form onSubmit={handleCommentSubmit} style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
            <input 
              type="text"
              placeholder="닉네임"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              style={{ width: '120px', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--highlight-bg)', color: 'var(--text-main)', outline: 'none' }}
            />
            <input 
              type="text" 
              placeholder="댓글을 남겨보세요..." 
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              style={{ flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--highlight-bg)', color: 'var(--text-main)', outline: 'none' }} 
              required
            />
            <button 
              type="submit" 
              disabled={isSubmitting}
              style={{ background: 'var(--accent-color)', color: '#ffffff', padding: '0 20px', borderRadius: '6px', fontWeight: 'bold', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}
            >
              {isSubmitting ? '...' : '등록'}
            </button>
          </div>
        </form>
        
        {post.comments && post.comments.map(comment => (
          <div key={comment.id} style={{ borderBottom: '1px solid var(--border-color)', padding: '1rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <strong style={{ color: 'var(--text-main)' }}>{comment.author}</strong>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                {comment.created_at ? new Date(comment.created_at).toLocaleString() : ''}
              </span>
            </div>
            <div style={{ color: 'var(--text-main)', lineHeight: '1.4' }}>{comment.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
