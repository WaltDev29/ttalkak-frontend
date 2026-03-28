import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function HumorView() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    try {
      const response = await fetch(`${apiBaseUrl}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author, content }),
      });

      if (response.ok) {
        alert('레전드 썰 등록 완료!');
        navigate('/');
      } else {
        alert('등록 실패! 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('서버 연결 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      background: 'var(--bg-card)', 
      borderRadius: '8px', 
      padding: '1.5rem', 
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
    }}>
      <h2 style={{ color: 'var(--accent-color)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        ✏️ 썰 풀기
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input 
          type="text" 
          placeholder="제목 (어그로 필수)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '12px', 
            background: 'var(--highlight-bg)', 
            border: '1px solid var(--border-color)', 
            color: 'var(--text-main)', 
            borderRadius: '6px',
            fontSize: '1.1rem',
            outline: 'none'
          }} 
          required 
        />
        
        <input 
          type="text" 
          placeholder="닉네임 (작성자)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '12px', 
            background: 'var(--highlight-bg)', 
            border: '1px solid var(--border-color)', 
            color: 'var(--text-main)', 
            borderRadius: '6px',
            fontSize: '1.1rem',
            outline: 'none'
          }} 
          required 
        />
        
        <textarea 
          placeholder="오늘 있었던 레전드 썰 푼다..."
          rows="12"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '12px', 
            background: 'var(--highlight-bg)', 
            border: '1px solid var(--border-color)', 
            color: 'var(--text-main)', 
            borderRadius: '6px',
            resize: 'vertical',
            fontSize: '1.05rem',
            lineHeight: '1.5',
            outline: 'none'
          }} 
          required 
        />
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', gap: '10px' }}>
          <button type="button" onClick={() => navigate(-1)} disabled={isSubmitting} style={{ 
            background: 'var(--btn-bg)', 
            color: 'var(--btn-text)', 
            padding: '12px 24px', 
            borderRadius: '4px',
            fontWeight: 'bold',
            border: 'none',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            opacity: isSubmitting ? 0.6 : 1
          }}>
            취소
          </button>
          <button type="submit" disabled={isSubmitting} style={{ 
            background: 'var(--accent-color)', 
            color: '#ffffff', 
            padding: '12px 30px', 
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            border: 'none',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            opacity: isSubmitting ? 0.6 : 1
          }}>
            {isSubmitting ? '등록 중...' : '등록'}
          </button>
        </div>
      </form>
    </div>
  );
}
