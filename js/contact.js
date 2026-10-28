import { contactChannels } from './contact-data.js';
import { initContactChannels } from './contact-channels.js';
import { initIdeaMailbox } from './idea-mailbox.js';

initIdeaMailbox(document.querySelector('[data-idea-mailbox]'));
initContactChannels(document.querySelector('[data-contact-channels]'), contactChannels);
