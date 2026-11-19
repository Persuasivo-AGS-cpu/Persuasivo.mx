import React from 'react';
import {
  comandaCopy, comandaServices, comandaTimings, comandaBudgets, toggleService,
} from '../../data/comanda';

export default function ComandaForm({ form, setForm }) {
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const pickTiming = (t) => setForm((f) => ({ ...f, timing: f.timing === t ? '' : t }));

  return (
    <form className="cm-form" onSubmit={(e) => e.preventDefault()} noValidate>
      <div className="cm-grid2">
        <label className="cm-field"><span>Tu nombre *</span>
          <input type="text" autoComplete="name" value={form.name} onChange={set('name')} />
        </label>
        <label className="cm-field"><span>Empresa o sitio web</span>
          <input type="text" autoComplete="organization" placeholder="ej. miempresa.com" value={form.company} onChange={set('company')} />
        </label>
        <label className="cm-field"><span>WhatsApp</span>
          <input type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} />
        </label>
        <label className="cm-field"><span>Correo</span>
          <input type="email" autoComplete="email" value={form.email} onChange={set('email')} />
        </label>
      </div>

      <fieldset className="cm-fieldset">
        <legend>{comandaCopy.servicesLegend}</legend>
        <div className="cm-chips">
          {comandaServices.map((s) => (
            <button key={s.id} type="button" className="cm-chip" aria-pressed={form.services.includes(s.id)}
              onClick={() => setForm((f) => ({ ...f, services: toggleService(f.services, s.id) }))}>
              {s.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="cm-fieldset">
        <legend>{comandaCopy.timingLegend}</legend>
        <div className="cm-chips">
          {comandaTimings.map((t) => (
            <button key={t} type="button" className="cm-chip" aria-pressed={form.timing === t} onClick={() => pickTiming(t)}>{t}</button>
          ))}
        </div>
      </fieldset>

      <label className="cm-field"><span>{comandaCopy.budgetLabel}</span>
        <select value={form.budget} onChange={set('budget')}>
          <option value="">{comandaCopy.budgetEmpty}</option>
          {comandaBudgets.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </label>

      <label className="cm-field"><span>{comandaCopy.notesLabel}</span>
        <textarea rows={3} maxLength={400} value={form.notes} onChange={set('notes')} />
      </label>
    </form>
  );
}
