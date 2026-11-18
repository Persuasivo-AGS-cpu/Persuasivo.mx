export const WA_NUMBER = '528110731510';

export const waLink = (text = 'Hola, quiero una cotización') =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
