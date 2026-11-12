/** Digits of an Australian mobile, e.g. "0412 345 678" or "+61 412 345 678" → "0412345678". */
const digits = (phone = '') => phone.replace(/\D/g, '').replace(/^61/, '0');

/** True for a full 10-digit number. A placeholder like "04xx xxx xxx" is not dialable. */
const dialable = (phone?: string) => /^0\d{9}$/.test(digits(phone));

const intl = (phone?: string) => `+61${digits(phone).slice(1)}`;

/**
 * Link for the Call buttons ('' if no phone is set).
 * A placeholder number links to the contact section instead of dialling a broken number.
 */
export const telHref = (phone?: string) => (!phone ? '' : dialable(phone) ? `tel:${intl(phone)}` : '/#contact');

/** Link that opens a text message ('' until a full number is set). */
export const smsHref = (phone?: string) => (dialable(phone) ? `sms:${intl(phone)}` : '');
