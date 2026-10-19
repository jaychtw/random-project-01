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
