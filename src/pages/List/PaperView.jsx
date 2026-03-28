import React from 'react';
import { Link } from 'react-router-dom';

export function PaperView({ posts }) {
  if (!posts) return null;

  return (
    <div>
      <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        Recent Publications
      </h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map(post => {
          const fakePost = post.fake_post || {};
          return (
          <li key={post.id} style={{ marginBottom: '2rem' }}>
            <Link to={`/post/${post.id}`} style={{ 
              fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--link-color)', display: 'block', marginBottom: '0.5rem'
            }}>
              {fakePost.title || 'Untitled Paper'}
            </Link>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              {fakePost.author || 'Unknown Author'} &bull; {fakePost.created_at ? new Date(fakePost.created_at).toLocaleDateString() : ''}
            </div>
            <p style={{ margin: 0, lineHeight: 1.5, color: 'var(--text-main)' }}>
              {fakePost.content || 'No abstract available.'}
            </p>
          </li>
        )})}
      </ul>
    </div>
  );
}
