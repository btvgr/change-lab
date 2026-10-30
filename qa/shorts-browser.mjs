import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { writeFile } from 'node:fs/promises';
import { startPagesServer, prefix } from './pages-server.mjs';
import { episodes } from '../js/episodes-data.js';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.CHANGE_LAB_PLAYWRIGHT || 'playwright');
const server = await startPagesServer({ port: 0 });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const origin = `http://127.0.0.1:${server.address().port}${prefix}`;
const result = { responsive: [], playback: [], errors: [] };
try {
  const page = await browser.newPage({ viewport: {width:1440,height:900} });
  const requested = [];
  page.on('request', r=>{if(r.url().endsWith('.mp4'))requested.push(r.url());});
  page.on('pageerror', e=>result.errors.push(e.message));
  await page.goto(origin+'shorts.html');
  await page.evaluate(()=>document.fonts.ready);
  const feed=page.locator('[data-shorts-feed]');
  const videos=page.locator('video');
  const counter=page.locator('[data-counter]');
  const next=page.locator('[data-next]'), previous=page.locator('[data-previous]');
  const play=page.locator('[data-play]'), sound=page.locator('[data-sound]'), speed=page.locator('[data-speed]');
  const settled=async index=>{
    await page.waitForFunction(index=>{
      const f=document.querySelector('[data-shorts-feed]');
      return Math.abs(f.scrollTop-index*f.clientHeight)<2 && document.querySelector('[data-counter]').textContent.startsWith(String(index+1).padStart(2,'0'));
    },index);
  };
  assert.equal(await videos.count(),3);
  assert.equal(await previous.isDisabled(),true);
  assert.equal(await next.isDisabled(),false);
  assert.equal(await feed.evaluate(n=>getComputedStyle(n).scrollSnapType),'y mandatory');
  assert.equal(await videos.evaluateAll(nodes=>nodes.every(v=>v.paused&&v.muted&&!v.autoplay&&v.playsInline)),true);
  assert.equal(await videos.nth(0).getAttribute('preload'),'metadata');
  assert.equal(await videos.nth(1).getAttribute('preload'),'none');
  assert.equal(await videos.nth(2).getAttribute('preload'),'none');
  assert.ok(requested.every(url=>url.endsWith('/pandillaje.mp4')));
  result.initialMedia='Only active metadata eligible; inactive MP4s not requested';
  for(const [i,[slug,e]] of Object.entries(episodes).entries()) {
    assert.equal(await videos.nth(i).getAttribute('src'),e.media.src);
    assert.equal(await videos.nth(i).getAttribute('poster'),e.media.poster);
    assert.equal(await page.locator('.reel-meta a').nth(i).getAttribute('href'),`temas/${slug}.html`);
    for(const route of [e.media.src,e.media.poster,`temas/${slug}.html`]) assert.equal((await page.request.head(origin+route)).status(),200);
  }
  for(const width of [375,768,1024,1440]) {
    await page.setViewportSize({width,height:900});
    await settled(0);
    const layout=await page.evaluate(()=>{
      const r=n=>{const b=n.getBoundingClientRect();return {x:b.x,y:b.y,width:b.width,height:b.height,right:b.right,bottom:b.bottom};};
      return {width:innerWidth,document:document.documentElement.scrollWidth,height:innerHeight,documentHeight:document.documentElement.scrollHeight,
        viewer:r(document.querySelector('[data-shorts-feed]')),video:r(document.querySelector('video')),controls:[...document.querySelectorAll('.short-control')].map(r),
        panels:[...document.querySelectorAll('.short-panel')].map(r)};
    });
    assert.equal(layout.document,width);assert.equal(layout.documentHeight,900);
    assert.ok(Math.abs(layout.panels[0].height-layout.viewer.height)<2);
    assert.ok(layout.panels[1].y>=layout.viewer.bottom-2);
    assert.ok(Math.abs(layout.video.width/layout.video.height-9/16)<.003);
    for(const c of layout.controls) { assert.ok(c.width>=44&&c.height>=44); assert.ok(c.x>=0&&c.right<=width&&c.y>=0&&c.bottom<=900); }
    if(width>=768) assert.ok(layout.controls[0].x>=layout.video.right, 'Desktop controls beside video');
    else assert.ok(layout.controls[0].y>=layout.video.bottom, 'Mobile controls below video');
    if(width<1024) {
      await page.locator('.menu-toggle').click();assert.equal(await page.locator('.site-nav').isVisible(),true);
      await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-toggle').evaluate(n=>n===document.activeElement),true);
    }
    await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth));
    await page.screenshot({path:`qa/shorts-${width}.png`});
    result.responsive.push(layout);
  }
  for(let i=0;i<3;i++) {
    if(i) {await next.click();await settled(i);}
    assert.equal(await videos.evaluateAll(nodes=>nodes.every(v=>v.paused)),true);
    await play.click();
    await page.waitForFunction(i=>{const v=document.querySelectorAll('video')[i];return !v.paused&&v.currentTime>.2;},i);
    assert.equal(await play.getAttribute('aria-label'),'Pausar video');
    await speed.click();assert.equal(await videos.nth(i).evaluate(v=>v.playbackRate),2);assert.equal(await speed.textContent(),'2x');
    await speed.click();assert.equal(await videos.nth(i).evaluate(v=>v.playbackRate),1);
    await sound.click();assert.equal(await videos.nth(i).evaluate(v=>v.muted),false);
    await sound.click();assert.equal(await videos.nth(i).evaluate(v=>v.muted),true);
    await play.click();assert.equal(await videos.nth(i).evaluate(v=>v.paused),true);
    await play.click();await speed.click();
    result.playback.push(await videos.nth(i).evaluate(v=>({duration:v.duration,frames:v.getVideoPlaybackQuality().totalVideoFrames,rate:v.playbackRate,muted:v.muted})));
  }
  assert.equal(await next.isDisabled(),true);
  await previous.click();await settled(1);
  assert.equal(await videos.nth(2).evaluate(v=>v.paused),true);
  assert.equal(await videos.nth(2).evaluate(v=>v.playbackRate),1);
  assert.equal(await videos.nth(1).evaluate(v=>v.playbackRate),1);
  assert.equal(await speed.textContent(),'1x');
  assert.equal(await videos.evaluateAll(nodes=>nodes.every(v=>v.paused)),true);
  await feed.focus();await page.keyboard.press('ArrowUp');await settled(0);
  await page.keyboard.press('ArrowDown');await settled(1);
  await speed.focus();await page.keyboard.press('ArrowDown');await settled(1);
  await play.click();
  await feed.hover();await page.mouse.wheel(0,900);await settled(2);
  assert.equal(await videos.nth(1).evaluate(v=>v.paused),true);
  assert.equal(await videos.nth(2).evaluate(v=>v.paused),true);
  result.navigation='Buttons, keyboard viewer-only, native wheel, scroll snap, boundary disabling and pause on change: PASS';
  await page.emulateMedia({reducedMotion:'reduce'});
  await previous.click();await settled(1);
  assert.equal(await feed.evaluate(n=>getComputedStyle(n).scrollBehavior),'auto');
  result.reducedMotion='PASS';
  // Active panel cannot be displaced by resize; no hidden videos may play.
  for (const [width,height] of [[375,667],[768,1024],[1440,900],[375,812]]) {
    await page.setViewportSize({width,height});
    try { await settled(1); }
    catch(error) { console.log(await feed.evaluate(n=>({width:innerWidth,height:innerHeight,scroll:n.scrollTop,client:n.clientHeight,counter:document.querySelector('[data-counter]').textContent,panels:[...n.children].map(p=>({height:p.clientHeight,offset:p.offsetTop}))})));throw error; }
  }
  await videos.nth(0).evaluate(v=>v.play().catch(()=>{}));
  assert.equal(await videos.nth(0).evaluate(v=>v.paused),true);
  const failure=await browser.newPage();
  await failure.route('**/assets/videos/pandillaje.mp4',r=>r.abort());
  await failure.goto(origin+'shorts.html');await failure.locator('[data-play]').click();
  await failure.locator('[data-status]').waitFor({state:'visible'});await failure.close();
  result.failure='Error message: PASS';
  assert.deepEqual(result.errors,[]);
  await writeFile('qa/shorts-results.json',JSON.stringify(result,null,2)+'\n');
  console.log(JSON.stringify(result,null,2));
} finally { await browser.close();server.closeAllConnections();await new Promise(resolve=>server.close(resolve)); }
