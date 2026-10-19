import {test,expect} from '@playwright/test';
test('complete all seven chapters, restore progress, and restart',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');
 await expect(page.getByRole('heading',{name:'A light in the fog'})).toBeVisible();
 await page.getByRole('button',{name:'How to play'}).click();await expect(page.getByText('Follow the golden thread.')).toBeVisible();await page.getByRole('button',{name:'I’m ready'}).click();
 await page.getByRole('button',{name:'Turn mirror 1,',exact:false}).click();await expect(page.locator('#moves')).toHaveText('1');await page.getByRole('button',{name:'Undo'}).click();await expect(page.locator('#moves')).toHaveText('0');
 await page.getByRole('button',{name:'Hint',exact:false}).click();await expect(page.locator('#hint-text')).toContainText('mirror 1');
 for(let chapter=0;chapter<7;chapter++){
  const mirrors=page.locator('.mirror-hit');const count=await mirrors.count();for(let i=0;i<count;i++)await mirrors.nth(i).click();
  await expect(page.locator('#letter')).toBeVisible();await expect(page.locator('#lit')).toHaveText(`${count} / ${count}`);await expect(page.locator('#letter-text')).not.toBeEmpty();
  if(chapter<6)await page.locator('#next').click();
 }
 await expect(page.locator('#letter-title')).toHaveText('Every window, a star.');await expect(page.locator('.dot.complete')).toHaveCount(7);
 await page.reload();await expect(page.locator('.dot.complete')).toHaveCount(7);await expect(page.locator('#chapter')).toContainText('07');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:`test-results/tidelight-${test.info().project.name}.png`,fullPage:true});expect(errors).toEqual([]);
});
test('reset, keyboard mirror control, and sound toggle work',async({page})=>{
 await page.goto('/');const mirror=page.locator('.mirror-hit').first();await mirror.focus();await page.keyboard.press('Enter');await expect(page.locator('#moves')).toHaveText('1');await page.getByRole('button',{name:'Reset',exact:true}).click();await expect(page.locator('#moves')).toHaveText('0');await page.getByRole('button',{name:'Enable sound'}).click();await expect(page.getByRole('button',{name:'Mute sound'})).toHaveAttribute('aria-pressed','true');
});
test('corrupt saved progress does not prevent play',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('tidelight-save','null'));await page.goto('/');await expect(page.locator('.mirror-hit')).toHaveCount(2);await page.locator('.mirror-hit').first().click();await expect(page.locator('#moves')).toHaveText('1');
});
test('language toggle preserves the current puzzle, undo, hints, and saved preference',async({page})=>{
 await page.goto('/');await page.locator('.mirror-hit').first().click();
 const lit=await page.locator('#lit').textContent();
 await page.getByRole('button',{name:'切換為繁體中文'}).click();
 await expect(page.locator('html')).toHaveAttribute('lang','zh-Hant');await expect(page.locator('#chapter-name')).toHaveText('霧中的一束光');
 await expect(page.locator('#moves')).toHaveText('1');await expect(page.locator('#lit')).toHaveText(lit);
 await expect(page.locator('.mirror-hit').first()).toHaveAttribute('aria-label','轉動第 1 面鏡子，第 4 欄、第 4 列');
 await page.getByRole('button',{name:'復原',exact:false}).click();await expect(page.locator('#moves')).toHaveText('0');
 await page.getByRole('button',{name:'提示',exact:false}).click();await expect(page.locator('#hint-text')).toContainText('第 1 面鏡子');
 await page.getByRole('button',{name:'Switch to English'}).click();await expect(page.locator('#hint-text')).toContainText('mirror 1');
 await page.getByRole('button',{name:'切換為繁體中文'}).click();await page.reload();await expect(page.locator('html')).toHaveAttribute('lang','zh-Hant');
 await page.getByRole('button',{name:'遊戲說明'}).click();await expect(page.getByRole('heading',{name:'沿著金色的光前行。'})).toBeVisible();await page.getByRole('button',{name:'準備好了'}).click();
 await page.getByRole('button',{name:'開啟音效'}).click();await expect(page.getByRole('button',{name:'關閉音效'})).toBeVisible();
 await page.getByRole('button',{name:'Switch to English'}).click();await expect(page.getByRole('button',{name:'Mute sound'})).toBeVisible();
});
test('all seven Chinese chapters and letters work, including switching an open letter',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'切換為繁體中文'}).click();
 for(let chapter=0;chapter<7;chapter++){
  await expect(page.locator('#chapter-name')).toHaveText(['霧中的一束光','繞遠路回家','潮汐之間','小小的星座','大海記得的事','最遠的那扇窗','直到天亮'][chapter]);
  const mirrors=page.locator('.mirror-hit'),count=await mirrors.count();for(let i=0;i<count;i++)await mirrors.nth(i).click();
  await expect(page.locator('#letter')).toBeVisible();await expect(page.locator('#letter-text')).toContainText(/[\u4e00-\u9fff]/);
  await expect(page.locator('#letter-title')).toHaveText(chapter===6?'每一扇窗，都是一顆星。':'小島醒來了。');
  if(chapter===0){await page.getByRole('button',{name:'Switch to English'}).click();await expect(page.locator('#letter-text')).toContainText('We thought');await expect(page.locator('#moves')).toHaveText(String(count));await page.getByRole('button',{name:'切換為繁體中文'}).click();}
  if(chapter<6)await page.locator('#next').click();
 }
 await expect(page.locator('.dot.complete')).toHaveCount(7);
 await page.screenshot({path:`test-results/tidelight-chinese-${test.info().project.name}.png`,fullPage:true});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.getByRole('button',{name:'再停留一會兒'}).click();await expect(page.locator('#hint-text')).toContainText('港灣');
 await page.getByRole('button',{name:'Switch to English'}).click();await expect(page.locator('#hint-text')).toContainText('harbor');
});
