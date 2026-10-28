export function getContactLinks(channels) {
  const links = [];
  const email = typeof channels?.email === 'string' ? channels.email.trim() : '';
  if (/^[a-z0-9._%+-]+@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(email)) {
    links.push({ label: email, url: `mailto:${email}`, kind: 'Correo institucional' });
  }
  for (const social of Array.isArray(channels?.socials) ? channels.socials : []) {
    if (typeof social?.label === 'string' && social.label.trim() && /^https:\/\/[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?(?::\d+)?(?:[/?#][^\s]*)?$/i.test(social.url)) {
      links.push({ label: social.label.trim(), url: social.url, kind: 'Red oficial' });
    }
  }
  return links;
}
export function initContactChannels(root, channels) {
  if (!root) return;
  const list = root.querySelector('[data-channels-list]');
  const pending = root.querySelector('[data-channels-pending]');
  if (!list || !pending) return;
  const links = getContactLinks(channels);
  list.replaceChildren();
  links.forEach((channel) => {
    const item = document.createElement('li');
    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = channel.kind;
    const link = document.createElement('a');
    link.className = 'text-link';
    link.href = channel.url;
    link.textContent = channel.label;
    item.append(label, link);
    list.append(item);
  });
  list.hidden = links.length === 0;
  pending.hidden = links.length > 0;
}

