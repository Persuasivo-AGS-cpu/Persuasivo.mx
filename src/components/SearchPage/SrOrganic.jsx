import React from 'react';
import SrResult from './SrResult';
import { searchResults } from '../../data/searchPage';

export default function SrOrganic() {
  return (
    <>
      {searchResults.map((r) => <SrResult key={r.id} {...r} />)}
    </>
  );
}
