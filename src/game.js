export const SIZE = 7;
const chapters = [
  {name:'A light in the fog',place:'THE NEAR SHORE',path:[[0,3],[3,3],[3,1],[6,1]],letter:'We thought the sea had swallowed every light. Then yours appeared. We put the kettle on.',from:'Mara · Near Shore',intro:'Every journey begins with a single light.'},
  {name:'The long way home',place:'WILLOW REACH',path:[[0,5],[2,5],[2,2],[5,2],[5,5],[6,5]],letter:'The little ones counted the flashes from their window. For the first time in weeks, they fell asleep smiling.',from:'Ivo · Willow Reach',intro:'Sometimes the way forward doubles back.'},
  {name:'Between the tides',place:'THE SALT GARDENS',path:[[0,1],[4,1],[4,3],[1,3],[1,5],[6,5]],letter:'The salt flowers only open under lighthouse light. Tonight, the whole hillside is silver.',from:'Sena · Salt Gardens',intro:'Even in salt water, something beautiful grows.'},
  {name:'A small constellation',place:'CORMORANT SOUND',path:[[0,6],[5,6],[5,4],[2,4],[2,1],[6,1]],letter:'I have been fixing the old radio. No voices yet. But your light is a conversation of its own.',from:'Oren · Cormorant Sound',intro:'An island is only lonely until someone answers.'},
  {name:'What the sea remembers',place:'THE OLD OBSERVATORY',path:[[0,2],[2,2],[2,0],[5,0],[5,5],[3,5],[3,4],[6,4]],letter:'Your beam crossed the telescope tonight. I saw no new stars. Only an old friend finding the way back.',from:'Ada · Observatory',intro:'Some things are never truly lost.'},
  {name:'The farthest window',place:'NORTH OF NOWHERE',path:[[0,0],[6,0],[6,2],[1,2],[1,6],[4,6],[4,4],[6,4]],letter:'I kept a candle in the window, just in case. I did not know someone was keeping one for me, too.',from:'Ren · North of Nowhere',intro:'There is always someone on the other shore.'},
  {name:'Until the morning',place:'ALL THE WAY HOME',path:[[0,3],[1,3],[1,0],[5,0],[5,2],[3,2],[3,5],[6,5],[6,6]],letter:'One by one, the windows came alive. The sea is still wide. The night is still dark. But none of us are alone in it anymore. Thank you, keeper.',from:'The islands · Together',intro:'You were never lighting an empty sea.'}
];
export const LEVELS=chapters;
const direction=(a,b)=>[Math.sign(b[0]-a[0]),Math.sign(b[1]-a[1])];
export function makeLevel(index){
 const chapter=chapters[index]; const mirrors=[];
 for(let i=1;i<chapter.path.length-1;i++){
  const [dx,dy]=direction(chapter.path[i-1],chapter.path[i]);
  const [ox,oy]=direction(chapter.path[i],chapter.path[i+1]);
  const solution= ox===-dy && oy===-dx ? '/' : '\\';
  mirrors.push({x:chapter.path[i][0],y:chapter.path[i][1],solution,kind:solution==='/'?'\\':'/'});
 }
 const targets=chapter.path.slice(1,-1).map(([x,y])=>({x,y}));
 return {...chapter,mirrors,targets,start:chapter.path[0],end:chapter.path.at(-1)};
}
export function trace(level){
 let [x,y]=level.start; let [dx,dy]=direction(level.path[0],level.path[1]);
 const points=[[x-dx*.65,y-dy*.65],[x,y]],lit=new Set(),seen=new Set();let won=false;
 for(let step=0;step<200;step++){
  const key=`${x},${y},${dx},${dy}`;if(seen.has(key))break;seen.add(key);
  level.targets.forEach((t,i)=>{if(t.x===x&&t.y===y)lit.add(i)});
  if(x===level.end[0]&&y===level.end[1]){won=lit.size===level.targets.length;break;}
  const m=level.mirrors.find(m=>m.x===x&&m.y===y);
  if(m){[dx,dy]=m.kind==='/'?[-dy,-dx]:[dy,dx];}
  x+=dx;y+=dy;points.push([x,y]);if(x<0||y<0||x>=SIZE||y>=SIZE)break;
 }
 return {points,lit,won};
}
