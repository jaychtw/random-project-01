// Text is kept separate from puzzle state so changing language never restarts play.
export const zhChapters = [
 {name:'霧中的一束光',place:'近岸',intro:'每一段旅程，都從一束光開始。',letter:'我們以為，大海已經吞沒了所有的光。直到你的燈光出現。我們便燒了一壺水，等你來。',from:'瑪拉 · 近岸'},
 {name:'繞遠路回家',place:'柳灣',intro:'有時候，前進的路也會迂迴。',letter:'孩子們趴在窗邊，數著遠方閃爍的燈光。好幾個星期以來，他們第一次帶著微笑入睡。',from:'伊沃 · 柳灣'},
 {name:'潮汐之間',place:'鹽花園',intro:'即使在鹹水裡，也有美好的事物悄悄生長。',letter:'鹽花只在燈塔的光裡綻放。今晚，整片山坡都泛著銀光。',from:'希娜 · 鹽花園'},
 {name:'小小的星座',place:'鸕鶿海峽',intro:'有人回應的那一刻，孤島就不再孤單。',letter:'我一直在修那台老收音機。還是聽不見人聲。不過，你的燈光本身，就是一場對話。',from:'歐倫 · 鸕鶿海峽'},
 {name:'大海記得的事',place:'舊觀星臺',intro:'有些事物，從未真正失去。',letter:'今晚，你的光掠過了望遠鏡。我沒有看見新的星星，只看見一位老朋友，正循著光回來。',from:'艾妲 · 觀星臺'},
 {name:'最遠的那扇窗',place:'無名之北',intro:'海的另一端，總有人在等候。',letter:'我在窗邊留了一根蠟燭，想著也許有人會需要。我不知道，原來也有人為我留著一盞燈。',from:'任 · 無名之北'},
 {name:'直到天亮',place:'回家的路上',intro:'你照亮的，從來都不是一片空蕩的海。',letter:'一扇接著一扇，窗裡亮起了燈。海依然遼闊，夜依然深沉。但我們再也不必獨自面對。謝謝你，守燈人。',from:'群島 · 此刻同在'}
];
export const messages = {
 chapter:[n=>`CHAPTER 0${n} / 07`,n=>`第 0${n} 章 / 共 07 章`],
 chapterLabel:[(n,name)=>`Chapter ${n}: ${name}`,(n,name)=>`第 ${n} 章：${name}`],
 mirror:[(n,x,y)=>`Turn mirror ${n}, column ${x}, row ${y}`,(n,x,y)=>`轉動第 ${n} 面鏡子，第 ${x} 欄、第 ${y} 列`],
 rising:['Currently rising diagonal','目前為右上斜向'],falling:['Currently falling diagonal','目前為右下斜向'],
 enableSound:['Enable sound','開啟音效'],muteSound:['Mute sound','關閉音效'],
 awake:['The island is awake.','小島醒來了。'],final:['Every window, a star.','每一扇窗，都是一顆星。'],
 next:['Continue the journey →','繼續旅程 →'],again:['Begin again ↻','重新啟航 ↻'],
 harbor:['The harbor is glowing. Choose another chapter above whenever you’re ready.','港灣已亮起燈光。準備好時，隨時可以選擇上方的其他章節。'],
 hint:[(n,x,y)=>`A gentle nudge: turn mirror ${n}, at column ${x}, row ${y}.`,(n,x,y)=>`小小的提示：轉動第 ${n} 面鏡子，位於第 ${x} 欄、第 ${y} 列。`],
 title:['Tidelight — Letters from the sea','Tidelight 潮光 — 來自大海的信'],
 description:['A quiet lighthouse puzzle. Bend the light. Bring them home.','一款靜謐的燈塔解謎遊戲。轉動鏡子，讓光引領大家回家。']
};
export function translate(language,key,...args){
 const entry=messages[key];if(!entry)throw new Error(`Missing translation: ${key}`);
 const value=entry[language==='zh-Hant'?1:0];return typeof value==='function'?value(...args):value;
}
export const staticChinese = {
 '.edition':'來自大海的信', '#help':'遊戲說明', '.eyebrow':'一點微光，也能照亮遠方',
 'h1':'循著光，<br><em>找到回家的路。</em>',
 '.intro':'霧的彼端，群島正靜靜等候。<br>轉動鏡子，循著微光。<br>讓大海知道，它並不孤單。',
 '.instructions p':'<strong>輕輕一轉，世界就不一樣了。</strong><br>點選鏡子，即可轉動。<br>照亮每座小島，再將光引向港灣。',
 '.live':'<i></i>守燈人值勤中', '#letter .label':'一封信，循光而來', '#view':'再停留一會兒',
 '#help-panel .label':'守燈人手冊', '#help-panel h2':'沿著金色的光前行。',
 '#help-panel p:nth-of-type(1)':'燈塔會向海圖射出一道光。點選或輕觸鏡子，即可在 / 與 \\ 兩種斜向之間切換。光遇到鏡子時，會轉彎九十度。',
 '#help-panel p:nth-of-type(2)':'喚醒每座帶有圓環的小島，再將光引向虛線圓環中的港灣小屋。沒有時間限制，也沒有懲罰。慢慢來就好。',
 '#help-panel p:nth-of-type(3)':'鍵盤操作：按 Tab 選擇鏡子，再按 Enter 或空白鍵轉動。隨時都能使用復原、重置或提示。章節進度會自動儲存。',
 '#close-help':'準備好了 →', '.stat:first-child':'<b id="lit">0 / 0</b>座小島', '.stat:nth-child(2)':'<b id="moves">0</b>次轉動',
 '#undo':'↶ 復原', '#reset':'重置', '#hint':'✧ 提示',
 '.legend':'<span><i>◆</i> 燈塔</span><span><i>╱</i> 轉向鏡</span><span><i>◎</i> 沉睡的小島</span>',
 '.sea-note':'別急，大海有的是時間。', 'footer span:first-child':'七座小島，一線微光。', 'footer span:last-child':'獻給寧靜的時光 · 2026'
};
export const attributeChinese = [
 ['.progress','aria-label','選擇章節'],['.game-area','aria-label','燈塔解謎'],['#sea','aria-label','海圖。使用鏡子按鈕，改變光的方向。'],
 ['#sound','title','切換音效'],['#undo','title','復原上一次轉動'],['#reset','title','重新開始本章']
];
