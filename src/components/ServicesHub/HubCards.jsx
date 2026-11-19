import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import HubMini from './HubMini';
import { hubServices, hubGoals, hubGoalsCopy } from '../../data/hub';

export default function HubCards({ goalId }) {
  const reduce = useReducedMotion();
  const goal = hubGoals.find((g) => g.id === goalId);
  const hasRecs = !!goal && goal.ids.length > 0;

  return (
    <div className="hub-grid">
      {hubServices.map((s) => {
        const rec = hasRecs && goal.ids.includes(s.id);
        return (
          <motion.article key={s.id} id={s.slug} className="hub-card"
            data-rec={rec || undefined} data-dim={hasRecs && !rec ? true : undefined}
            initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-6% 0px' }} transition={{ duration: 0.5 }}>
            <HubMini kind={s.mini} />
            <div className="hub-card-head">
              <h2 className="hub-h2">{s.title}</h2>
              {rec && <span className="hub-badge">{hubGoalsCopy.badge}</span>}
            </div>
            <p className="hub-sub">{s.subtitle}</p>
            <p className="hub-p">{s.desc}</p>
            <p className="hub-price">{s.price}</p>
            <Link className="hub-link" to={s.to}>Ver {s.title} →</Link>
          </motion.article>
        );
      })}
    </div>
  );
}
