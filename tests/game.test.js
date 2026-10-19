import {test} from 'node:test';
import assert from 'node:assert/strict';
import {LEVELS,makeLevel,trace,SIZE} from '../src/game.js';
for(let i=0;i<LEVELS.length;i++){
 test(`chapter ${i+1}: scrambled puzzle is unsolved and intended route wakes every island`,()=>{
 const l=makeLevel(i);assert.equal(trace(l).won,false);for(const m of l.mirrors)m.kind=m.solution;
 const r=trace(l);assert.equal(r.won,true);assert.equal(r.lit.size,l.targets.length);assert.deepEqual(r.points.at(-1),l.end);
 });
 test(`chapter ${i+1}: all orientation combinations terminate and cannot skip required islands`,()=>{
 const l=makeLevel(i);for(let bits=0;bits<2**l.mirrors.length;bits++){
 l.mirrors.forEach((m,j)=>m.kind=bits&(1<<j)?'/':'\\');const r=trace(l);assert.ok(r.points.length<=202);if(r.won)assert.equal(r.lit.size,l.targets.length);
 }
 const coordinates=l.path.map(p=>p.join(','));assert.equal(new Set(coordinates).size,coordinates.length);for(const p of l.path)assert.ok(p.every(n=>n>=0&&n<SIZE));
 });
}
test('puzzles instantiate independent state',()=>{const a=makeLevel(0),b=makeLevel(0);a.mirrors[0].kind=a.mirrors[0].solution;assert.notEqual(a.mirrors[0].kind,b.mirrors[0].kind)});
