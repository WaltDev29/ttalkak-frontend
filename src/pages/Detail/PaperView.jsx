import React, { useState } from 'react';

export function PaperView({ post, onCommentAdded }) {
  const [commentContent, setCommentContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!post) return <div>404 Not Found</div>;

  const fakePost = post.fake_post || {};

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
          author: 'Anonymous Researcher',
          content: commentContent
        }),
      });

      if (response.ok) {
        setCommentContent('');
        if (onCommentAdded) onCommentAdded(); 
      } else {
        alert('Submission failed.');
      }
    } catch (error) {
      console.error('Comment Error:', error);
      alert('Error connecting to the peer review database.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '2rem 4rem', border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
      {/* Journal Header */}
      <div style={{ 
        borderBottom: '2px solid var(--text-main)', paddingBottom: '1rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'
      }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Your Archive Journal of Sciences
        </div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Vol. 42 / Issue 7 / {fakePost.created_at ? fakePost.created_at.substring(0,4) : ''}
        </div>
      </div>

      <h1 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '1.8rem', lineHeight: '1.3' }}>
        {fakePost.title}
      </h1>
      <div style={{ textAlign: 'center', fontStyle: 'italic', marginBottom: '2.5rem' }}>
        {fakePost.author}
        <br />
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Date: {fakePost.created_at ? new Date(fakePost.created_at).toLocaleDateString() : ''}</span>
      </div>
      
      <h3 style={{ marginTop: '2.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Abstract</h3>
      <p style={{ textAlign: 'justify', lineHeight: 1.6 }}>{fakePost.content}</p>

      <h3 style={{ marginTop: '2.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>1. Introduction</h3>
      <p style={{ textAlign: 'justify', lineHeight: 1.6 }}>
        This study investigates the implications of the presented phenomena within a broader academic context. 
        The findings suggest significant correlation between initial data points and subsequent observed outcomes.
      </p>
      
      <h3 style={{ marginTop: '2.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>2. Methodology</h3>
      <p style={{ textAlign: 'justify', lineHeight: 1.6 }}>
        The researchers employed a multi-faceted approach involving deep learning models and qualitative linguistic analysis 
        to ensure the integrity and transformation of raw data into polished scholarly outputs.
      </p>
      
      <div style={{ textAlign: 'center', margin: '3rem 0', padding: '2rem', background: 'var(--highlight-bg)', border: '1px solid var(--border-color)' }}>
        <span style={{ color: 'var(--text-muted)' }}>[Figure 1: Conceptual diagram of the data transformation process]</span>
      </div>

      <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '3px double var(--border-color)' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.4rem' }}>Peer Review & Scholar Discussions</h3>
        
        {post.comments && post.comments.map(comment => {
          const fakeComment = comment.fake_comment || {};
          return (
          <div key={comment.id} style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid var(--border-color)', background: 'var(--highlight-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px dotted var(--border-color)', paddingBottom: '0.5rem' }}>
              <strong style={{ fontSize: '1.1rem' }}>{fakeComment.author || 'Anonymous Peer'}</strong>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                {fakeComment.created_at ? new Date(fakeComment.created_at).toLocaleString() : ''}
              </span>
            </div>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
              {fakeComment.content || 'Pending scholarly review...'}
            </p>
          </div>
        )})}
        
        <div style={{ marginTop: '3rem' }}>
          <h4 style={{ marginBottom: '1rem' }}>Submit Formal Response</h4>
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Draft your rebuttal or scholarly commentary here..."
              rows={4}
              style={{
                width: '100%', padding: '1rem', fontFamily: 'inherit', fontSize: '0.95rem', border: '1px solid var(--border-color)', background: 'var(--highlight-bg)', color: 'var(--text-main)', resize: 'vertical', marginBottom: '1rem'
              }}
              required
            />
            <div style={{ textAlign: 'right' }}>
              <button 
                type="submit" 
                disabled={isSubmitting}
                style={{
                  padding: '0.5rem 1.5rem', fontFamily: 'inherit', fontWeight: 'bold', background: 'var(--btn-bg)', color: 'var(--btn-text)', border: '1px solid var(--border-color)', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? 'Submitting Review...' : 'Submit Commentary'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
