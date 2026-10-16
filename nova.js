/* nova canvas: drifting particles slowly drawn toward a bright core */
(function(){const c=document.getElementById('nova');if(!c)return;const x=c.getContext('2d');let W,H,dpr,ps=[];
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 function size(){dpr=Math.min(devicePixelRatio||1,2);W=c.clientWidth;H=c.clientHeight;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0);
  const n=Math.round(Math.min(220,W*H/7000));ps=[];for(let i=0;i<n;i++)ps.push(mk())}
 const core=()=>({x:W*(W<860?.7:.74),y:H*.42});
 function mk(){const a=Math.random()*Math.PI*2,r=Math.random()*Math.max(W,H)*.75+40;const o=core();return{a,r,s:.0006+Math.random()*.0016,z:Math.random(),x:o.x+Math.cos(a)*r,y:o.y+Math.sin(a)*r*.55}}
 function draw(t){x.clearRect(0,0,W,H);const o=core();
  const g=x.createRadialGradient(o.x,o.y,0,o.x,o.y,Math.min(W,H)*.5);g.addColorStop(0,'rgba(233,164,60,.30)');g.addColorStop(.25,'rgba(233,164,60,.08)');g.addColorStop(1,'rgba(233,164,60,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
  for(const p of ps){if(!reduce){p.a+=p.s;p.r*=.9993;if(p.r<6)Object.assign(p,mk())}
   p.x=o.x+Math.cos(p.a)*p.r;p.y=o.y+Math.sin(p.a)*p.r*.55;const near=Math.max(0,1-p.r/(Math.min(W,H)*.6));
   x.fillStyle=`rgba(${near>.5?'245,200,130':'210,218,230'},${.18+p.z*.45+near*.3})`;x.beginPath();x.arc(p.x,p.y,.5+p.z*1.3+near*.6,0,Math.PI*2);x.fill()}
  x.fillStyle='rgba(255,236,200,.95)';x.beginPath();x.arc(o.x,o.y,2.2+Math.sin(t/900)*.5,0,Math.PI*2);x.fill();
  if(!reduce)requestAnimationFrame(draw)}
 size();addEventListener('resize',size);requestAnimationFrame(draw)})();
