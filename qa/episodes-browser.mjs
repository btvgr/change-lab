/** QA de navegador. Requiere Playwright externo; no añade dependencias al sitio.
 * CHANGE_LAB_PLAYWRIGHT puede apuntar a su instalación existente.
 */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { writeFile } from 'node:fs/promises';
import { startPagesServer, prefix } from './pages-server.mjs';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.CHANGE_LAB_PLAYWRIGHT || 'playwright');
const server = await startPagesServer({port:0});
const browser = await chromium.launch({channel:'chrome',headless:true});
const origin = `http://127.0.0.1:${server.address().port}${prefix}`;
const results = [];
try {
  for (const [slug, keys, count] of [['pandillaje',[0,1,2],4],['ciberacoso',[1,0,2],5],['fast-fashion',[1,0,2],4]]) {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', e=>errors.push(e.message));
    await page.goto(`${origin}temas/${slug}.html`);
    await page.waitForFunction(()=>document.querySelector('video').readyState>=2);
    const before = await page.locator('video').evaluate(v=>({paused:v.paused,time:v.currentTime,autoplay:v.autoplay,preload:v.preload,controls:v.controls,inline:v.playsInline,width:v.videoWidth,height:v.videoHeight,duration:v.duration,poster:v.poster,tracks:v.textTracks.length}));
    assert.equal(before.paused,true); assert.equal(before.time,0); assert.equal(before.autoplay,false);
    assert.equal(before.preload,'metadata'); assert.equal(before.controls,true); assert.equal(before.inline,true);
    assert.equal(before.width/before.height,9/16); assert.ok(before.duration>0);
    await page.locator('video').evaluate(v=>v.play());
    await page.waitForFunction(()=>document.querySelector('video').currentTime>.3);
    const playing = await page.locator('video').evaluate(v=>({paused:v.paused,time:v.currentTime,muted:v.muted,volume:v.volume,frames:v.getVideoPlaybackQuality().totalVideoFrames}));
    assert.equal(playing.paused,false); assert.equal(playing.muted,false); assert.ok(playing.frames>0);
    await page.locator('video').evaluate(v=>v.pause());
    assert.equal(await page.locator('video').evaluate(v=>v.paused),true);
    assert.equal(await page.locator('.character-card').count(),count);
    for (let i=0;i<3;i++) {
      const card = page.locator('.quiz-question').nth(i);
      await card.locator('button').click();
      assert.equal(await card.getAttribute('data-result'),'empty');
      await card.locator('input').nth((keys[i]+1)%3).check(); await card.locator('button').click();
      assert.equal(await card.getAttribute('data-result'),'retry');
      assert.ok((await card.locator('.quiz-feedback').textContent()).length>30);
      await card.locator('input').nth(keys[i]).check(); await card.locator('button').click();
      assert.equal(await card.getAttribute('data-result'),'correct');
    }
    await page.locator('[data-quiz-reset]').click(); assert.equal(await page.locator('.quiz-question input:checked').count(),0);
    const responsive=[];
    for (const width of [375,768,1024,1440]) {
      await page.setViewportSize({width,height:900});
      await page.locator('footer').scrollIntoViewIfNeeded();
      await page.locator('h1').scrollIntoViewIfNeeded();
      await page.evaluate(()=>document.fonts.ready);
      const layout=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth,broken:[...document.images].filter(i=>i.complete&&(!i.naturalWidth)).map(i=>i.src)}));
      assert.ok(layout.document<=width,`${slug} desborde ${width}: ${layout.document}`); assert.deepEqual(layout.broken,[]);
      responsive.push({width,...layout});
      if(slug!=='fast-fashion') await page.screenshot({path:`qa/${slug}-${width}.png`,fullPage:true});
    }
    for(const href of await page.locator('a[href]').evaluateAll(nodes=>nodes.map(n=>n.href))) {
      const url=new URL(href);
      if(!href.startsWith(origin))continue;
      assert.equal((await page.request.head(href.split('#')[0])).status(),200,href);
      if(url.hash&&url.pathname.endsWith(`${slug}.html`)) assert.equal(await page.locator(url.hash).count(),1);
    }
    if(slug!=='fast-fashion') {
      await page.locator('.episode-dialogue summary').click(); assert.ok(await page.locator('.episode-dialogue').getAttribute('open')!==null);
    }
    assert.deepEqual(errors,[]);
    results.push({slug,before,playing,responsive,quiz:'vacío, error, acierto y reinicio: OK',navigation:'OK',errors});
    await page.close();
  }
  const page = await browser.newPage();
  await page.goto(origin+'problematicas.html');
  assert.equal(await page.locator('#archive-grid .archive-card').count(),3);
  await page.locator('#topic-search').fill('CIBERACOSO'); await page.locator('#topic-search').press('Enter');
  assert.equal(await page.locator('#archive-grid .archive-card').count(),1);
  await page.locator('#archive-reset').click();
  await page.locator('[data-category="Sociedad"]').click();
  assert.equal(await page.locator('#archive-grid .archive-card').count(),1);
  await page.locator('#archive-reset').click();
  await page.locator('footer').scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>[...document.querySelectorAll('#archive-grid img')].every(i=>i.complete&&i.naturalWidth));
  results.push({catalog:'Tres pósteres cargados; búsqueda y filtros OK'});
  for (const slug of ['pandillaje','ciberacoso']) {
    const failed = await browser.newPage();
    await failed.route(`**/assets/videos/${slug}.mp4`, route=>route.abort());
    await failed.goto(`${origin}temas/${slug}.html`);
    await failed.waitForFunction(()=>document.querySelector('[data-media-placeholder]').hidden===false);
    assert.ok((await failed.locator('[data-media-status]').textContent()).includes('no está disponible'));
    assert.equal(await failed.locator('video').isVisible(),false);
    await failed.close();
    const fallback = await browser.newPage({javaScriptEnabled:false});
    await fallback.goto(`${origin}temas/${slug}.html`);
    assert.equal(await fallback.locator('video').getAttribute('controls'),'');
    assert.equal(await fallback.locator('[data-quiz-fallback] li').count(),3);
    assert.equal(await fallback.locator('.episode-dialogue li').count(),slug==='pandillaje'?11:15);
    await fallback.close();
    results.push({slug,failure:'Estado honesto ante video inaccesible: OK',noJavaScript:'Video HTML5, preguntas y diálogos accesibles: OK'});
  }
  await writeFile('qa/episodes-results.json',JSON.stringify(results,null,2)+'\n');
  console.log(JSON.stringify(results,null,2));
} finally {
  await browser.close(); server.closeAllConnections(); await new Promise(resolve=>server.close(resolve));
}
