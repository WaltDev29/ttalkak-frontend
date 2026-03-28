import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ThumbsUp, Eye } from 'lucide-react';

export function HumorView({ posts }) {
  if (!posts) return null;
  
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--bg-card)', borderRadius: '8px', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: 'var(--accent-color)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
         🔥 인기글 실시간 랭킹
      </h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {posts.map((post, idx) => (
          <li key={post.id} style={{
            background: 'var(--highlight-bg)', borderRadius: '6px', marginBottom: '1rem', padding: '1rem', borderLeft: `4px solid ${idx === 0 ? '#ff5252' : 'var(--accent-color)'}`, transition: 'transform 0.2s', cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Link to={`/post/${post.id}`} style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: 'var(--text-main)' }}>
                  <span style={{ color: idx < 3 ? '#ff5252' : 'var(--text-muted)', marginRight: '8px' }}>{idx + 1}</span>
                  {post.title}
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                  {post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.8rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-main)' }}>
                  {post.author}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Eye size={14}/> 0</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffb74d' }}><ThumbsUp size={14}/> 0</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ff5252' }}><MessageCircle size={14}/> {post.comments ? post.comments.length : 0}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
