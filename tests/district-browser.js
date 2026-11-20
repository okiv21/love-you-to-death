() => {
 const g=window.midnightGrounds,results=[];
 const check=(name,pass,detail)=>{results.push({name,pass:!!pass,detail});if(!pass)throw Error(name);};
 const step=(seconds)=>{for(let i=0;i<Math.ceil(seconds/.025);i++)g.update(.025);};
 try {
 g.started=true;g.paused=false;g.$('note').hidden=true;g.keys={};
 check('district expanded beyond old market',g.bounds.maxX-g.bounds.minX>=100&&g.graves[0].z<-40);
 g.player.setPosition(-4,0,3);g.interact();check('market story conversation opens',!g.$('note').hidden);g.$('choices').querySelector('button').click();check('market lead advances to office',g.chapter===1);
 g.player.setPosition(g.officePoint);g.interact();g.$('choices').querySelector('button').click();check('office record marks cemetery',g.chapter===2);
 const storyGrave=g.graves[0];g.player.setPosition(storyGrave.x,0,storyGrave.z+2.8);g.keys.f=true;step(4.2);check('cemetery parcel advances story',g.chapter===3&&!g.nia.hidden);g.closeNote();
 g.player.setPosition(g.busStop);g.interact();check('story has reachable ending',g.chapter===4&&g.storyComplete&&!g.$('note').hidden);g.closeNote();
 const plot=g.graves[2];g.player.setPosition(plot.x,0,plot.z+2.8);g.keys.f=true;step(1);check('partial excavation lowers soil',plot.progress>.2&&plot.progress<.3);g.keys.f=false;step(.1);const progress=plot.progress;step(.2);check('release preserves dig progress',plot.progress===progress&&!g.action);g.keys.f=true;step(3.3);check('excavation opens grave',plot.state==='open');
 g.climb();step(1.2);check('climb enters grave',g.inGrave===plot&&g.player.getPosition().y<-1);g.keys.r=true;step(.1);check('cannot refill while inside',!g.action&&plot.state==='open');g.climb();step(1.2);check('climb returns safely to edge',g.inGrave===null&&Math.abs(g.player.getPosition().y)<.001&&g.canStand(g.player.getPosition().x,g.player.getPosition().z));g.keys.r=true;step(3.7);check('empty grave can be refilled',plot.state==='closed'&&plot.progress===0&&plot.soil.enabled);
 g.keys.f=true;step(4.2);const body=g.npcs.find(n=>n.role==='shopper');body.state='dead';body.hp=0;body.entity.setPosition(plot.x,.22,plot.z+2.8);body.entity.setEulerAngles(90,0,0);g.grab();check('body pickup',g.dragging===body);g.keys.f=true;step(.8);g.keys.f=false;step(.1);check('cancel lowering restores body',body.state==='dead'&&g.dragging===body&&body.entity.getPosition().z>plot.z+2);g.keys.f=true;step(2);check('lowering leaves body visible in open grave',plot.state==='occupied'&&body.state==='lowered'&&body.entity.enabled&&!g.dragging);g.keys.r=true;step(1);g.keys.r=false;step(.1);check('cancel refill leaves body and open soil state',plot.state==='occupied'&&!plot.soil.enabled);g.keys.r=true;step(3.7);check('refill completes burial',plot.state==='buried'&&body.state==='buried'&&!body.entity.enabled);g.keys.f=true;step(4.2);check('exhumation clears occupant and restores one body',plot.state==='open'&&plot.occupant===null&&body.state==='dead'&&body.entity.enabled);
 // Isolate a victim to test the real moving blade without chance interference.
 g.npcs.forEach(n=>{n.hidden=true;n.entity.enabled=false;});const victim=g.npcs.find(n=>n.role==='worker');victim.hidden=false;victim.entity.enabled=true;victim.hp=2;victim.state='alive';victim.stagger=99;victim.panic=0;victim.entity.setPosition(20,0,-10);g.player.setPosition(20,0,-11.4);g.face.set(0,0,1);g.player.setEulerAngles(0,0,0);g.tool.setLocalEulerAngles(-25,0,0);g.updateGrip();g.attack();step(.15);check('attack wind-up has no early damage',victim.hp===2);step(.65);check('swept blade connects once',victim.hp===1);victim.entity.setPosition(20,0,-10);victim.stagger=99;g.attack();step(.9);check('second strike begins death',victim.hp===0&&['falling','dead'].includes(victim.state));step(.8);check('fall finishes',victim.state==='dead');
 victim.state='alive';victim.hp=2;victim.stagger=99;victim.entity.setPosition(20,0,-13);g.attack();step(.9);check('target behind player is not hit',victim.hp===2);victim.entity.setPosition(23,0,-10);g.attack();step(.9);check('out of reach target is not hit',victim.hp===2);
 check('hands stay on shovel grip',g.gripError<.001);
 g.player.setPosition(20,0,-18);g.stamina=100;g.keys.d=true;g.keys.shift=true;const before=g.player.getPosition().x;step(.5);g.keys={};check('sprint gives catch-up speed',g.player.getPosition().x-before>2.5&&g.stamina<100);
 g.attack();const movingStart=g.player.getPosition().x;g.keys.d=true;step(.2);g.keys={};check('player can move during swing',g.player.getPosition().x>movingStart);g.cancelAction();
 const route=g.pathTo(new pc.Vec3(0,0,7),new pc.Vec3(43.5,0,-45.2));check('market to cemetery route exists',route.length>20);
 g.player.setPosition(55,0,-40);g.renderMap();check('map follows player position',g.mapPlayer.x===55&&g.mapPlayer.z===-40);
 const car=g.cars[0],carStart=car.entity.getPosition().x;g.elapsed=16;step(1);check('traffic moves on green',car.entity.getPosition().x!==carStart);
 car.entity.setPosition(-2.5,0,car.lane);car.speed=0;g.elapsed=1;g.updateTraffic(.1);check('traffic queues at red crossing',car.stopped);
 check('audio context exists after begin input',!!g.audio);g.sound('soil');check('sound event reaches mixer',g.lastSound==='soil');
 g.soundOn=false;g.syncAudio();check('mute silences master',g.master.gain.value===0);g.soundOn=true;g.syncAudio();
 return {passed:results.length,results};
 }catch(e){return {error:e.message,results};}
}
