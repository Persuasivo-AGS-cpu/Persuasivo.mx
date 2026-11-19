export const WA_NUMBER = '528110731510';

export const waLink = (text = 'Hola, quiero una cotización') =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

// Destino de los pedidos por correo (formsubmit). Mismo valor que el formulario anterior.
export const LEAD_ENDPOINT = 'https://formsubmit.co/ajax/hola@persuasivo.mx';
