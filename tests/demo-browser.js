() => {
 const g=midnightGrounds,results=[];
 const check=(name,pass)=>{results.push({name,pass:!!pass});if(!pass)throw Error(name);};
 try {
 check('personal envelope is the opening screen',!g.giftUI.hidden&&!!document.querySelector('#gift-open'));
 document.querySelector('#gift-open').click();
 check('romantic letter includes appreciation and care',g.giftUI.textContent.includes('appreciate you')&&g.giftUI.textContent.includes('take good care'));
 document.querySelector('#gift-play').click();g.$('begin').click();
 check('story starts after letter',g.started&&!g.paused&&g.giftUI.hidden);
 g.update(.15);check('Mama T guidance includes distance and direction',g.$('route-name').textContent==='Find Mama T'&&g.$('distance').textContent.includes('m away')&&g.$('arrow').style.transform.includes('rotate'));
 const oldAngle=g.$('arrow').style.transform;g.player.setPosition(-8,0,3);g.update(.15);
 check('direction changes when player passes objective',g.$('arrow').style.transform!==oldAngle);
 const oldChapter=g.chapter;g.chapter=2;g.refreshObjective();g.update(.15);check('guide follows later story objectives',g.$('route-name').textContent==='Cemetery');g.chapter=oldChapter;g.refreshObjective();
 const n=g.npcs.find(n=>n.role==='shopper'),before=g.unlocked;n.hp=1;g.impact(n);check('a takedown unlocks one keepsake',g.unlocked===before+1);g.impact(n);check('same defeated character cannot unlock twice',g.unlocked===before+1);
 g.openGallery();check('gallery pauses play and explains missing photos',g.paused&&!g.giftUI.hidden&&g.giftUI.textContent.includes('Personal photos'));
 document.querySelector('#gift-back').click();check('closing gallery resumes play',!g.paused&&g.giftUI.hidden);
 g.scheduleMusic();check('music scheduler produces notes after user gesture',g.audio.state==='running'&&g.musicTimer&&g.musicBeat>0);
 g.soundOn=false;g.syncAudio();check('mute silences soundtrack',g.master.gain.value===0);g.soundOn=true;g.syncAudio();
 check('six new residents added',g.npcs.length===23);check('scenery is batched',g.staticBatchCount===689);
 check('no horizontal page overflow',document.documentElement.scrollWidth<=innerWidth);
 return {passed:results.length,results};
 } catch(e){return {passed:results.filter(r=>r.pass).length,error:e.message,results};}
}
