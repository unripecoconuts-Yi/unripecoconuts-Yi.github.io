/** Australian mobile like "0412 345 678" → "+61412345678" (empty string if no phone). */
const intl = (phone?: string) => (phone ? `+61${phone.replace(/\D/g, '').replace(/^(61|0)/, '')}` : '');

/** Link that starts a phone call. */
export const telHref = (phone?: string) => (phone ? `tel:${intl(phone)}` : '');

/** Link that opens a text message. */
export const smsHref = (phone?: string) => (phone ? `sms:${intl(phone)}` : '');
