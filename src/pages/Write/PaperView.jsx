import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function PaperView() {
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
        alert('Publication submitted successfully!');
        navigate('/');
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('Connection error. Please check the API server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--bg-card)', padding: '2rem', border: '1px solid var(--border-color)' }}>
      <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '2rem' }}>
        Submit New Manuscript
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Manuscript Title</label>
          <input 
            type="text" 
            placeholder="Critical Analysis of..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '10px', background: 'var(--highlight-bg)', border: '1px solid var(--border-color)', color: 'var(--text-main)', fontFamily: 'inherit' }} 
            required 
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Primary Author</label>
          <input 
            type="text" 
            placeholder="John Doe, PhD"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ width: '100%', padding: '10px', background: 'var(--highlight-bg)', border: '1px solid var(--border-color)', color: 'var(--text-main)', fontFamily: 'inherit' }} 
            required 
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Abstract / Full Text</label>
          <textarea 
            placeholder="Describe your research methodologies and findings..."
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: '100%', padding: '10px', background: 'var(--highlight-bg)', border: '1px solid var(--border-color)', color: 'var(--text-main)', fontFamily: 'inherit', resize: 'vertical' }} 
            required 
          />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button type="button" onClick={() => navigate(-1)} disabled={isSubmitting} style={{ 
            background: 'var(--btn-bg)', color: 'var(--btn-text)', padding: '8px 20px', border: '1px solid var(--border-color)', cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}>
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting} style={{ 
            background: 'var(--text-main)', color: 'var(--bg-color)', padding: '8px 30px', fontWeight: 'bold', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1
          }}>
            {isSubmitting ? 'Submitting...' : 'Submit Manuscript'}
          </button>
        </div>
      </form>
    </div>
  );
}
