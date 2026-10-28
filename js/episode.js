import { episodes } from './episodes-data.js';
import { initQuiz } from './quiz.js';
import { initEpisodeMedia } from './episode-media.js';

const page = document.querySelector('[data-episode]');
const episode = episodes[page?.dataset.episode];
if (page && episode) {
  const title = page.querySelector('[data-episode-title]');
  const provisional = page.querySelector('[data-provisional-title]');
  if (title) title.textContent = episode.heroTitle || episode.title;
  const storyTitle = page.querySelector('[data-story-title]');
  if (storyTitle) storyTitle.textContent = episode.title;
  if (provisional) provisional.hidden = !episode.provisionalTitle;
  page.querySelector('video')?.setAttribute('aria-label', `Frutinovela: ${episode.title}`);
  document.title = `${episode.title} — Change Lab`;
  initEpisodeMedia(page.querySelector('[data-episode-media]'), episode.media, new URL('../', import.meta.url));
  initQuiz(page.querySelector('[data-quiz]'), episode.questions);
}


