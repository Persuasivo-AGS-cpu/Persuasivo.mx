import React from 'react';
import { Link } from 'react-router-dom';
import { hubGoals, hubGoalsCopy, hubServices, hubGoalWa } from '../../data/hub';

export default function HubGoals({ goalId, onChange }) {
  const goal = hubGoals.find((g) => g.id === goalId);
  const recs = goal ? hubServices.filter((s) => goal.ids.includes(s.id)) : [];

  return (
    <div className="hub-goals">
      <p className="hub-goals-title" id="hub-goals-label">{hubGoalsCopy.title}</p>
      <div className="hub-chips" role="group" aria-labelledby="hub-goals-label">
        {hubGoals.map((g) => (
          <button key={g.id} type="button" className="hub-chip" aria-pressed={goalId === g.id}
            onClick={() => onChange(goalId === g.id ? null : g.id)}>
            {g.label}
          </button>
        ))}
      </div>
      <div className="hub-reco" aria-live="polite">
        {goal && (
          <div className="hub-reco-box">
            {recs.length > 0 ? (
              <>
                <p><b>{hubGoalsCopy.recommend}</b></p>
                <ul>
                  {recs.map((s) => (
                    <li key={s.id}><Link to={s.to}><b>{s.title}</b></Link>: {s.why}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p>{goal.note}</p>
            )}
            <a className="hub-btn" href={hubGoalWa(goal.label)} target="_blank" rel="noopener noreferrer">{hubGoalsCopy.button}</a>
          </div>
        )}
      </div>
    </div>
  );
}
