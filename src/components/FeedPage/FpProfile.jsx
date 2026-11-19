import React from 'react';
import { feedProfile, FEED_WA } from '../../data/feedPage';

export default function FpProfile() {
  return (
    <div className="fp-profile">
      <span className="fp-avatar" aria-hidden="true">P</span>
      <div className="fp-profile-id"><strong>{feedProfile.name}</strong><span>{feedProfile.role}</span></div>
      <a className="fp-follow" href={FEED_WA} target="_blank" rel="noopener noreferrer" aria-label={feedProfile.followLabel}>
        {feedProfile.follow}
      </a>
    </div>
  );
}
