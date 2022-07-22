import anime from "animejs";

const colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"];

let pointerX = 0,
  pointerY = 0;

export const updateCoords = (e,canvasEl) =>{
  pointerX = (e.clientX || e.touches[0].clientX) - canvasEl.getBoundingClientRect().left
    pointerY = e.clientY || e.touches[0].clientY - canvasEl.getBoundingClientRect().top
}

export const animateParticules = (ctx) =>{
  let n =[];
  for (let i = 0; i < 30; i++) {
    n.push(createParticule(pointerX, pointerY, ctx))
  }
  anime.timeline().add({
    targets: n,
    x: (e) => e.endPos.x,
    y: (e) => e.endPos.y,
    radius: 0.1,
    duration: anime.random(1200, 1800),
    easing: "easeOutExpo",
    update: renderParticule
  });
}

const setParticuleDirection = (e) => {
  const t = anime.random (0, 360) * Math.PI / 180,
    a = anime.random (50, 180),
    n = [-1, 1][anime.random (0, 1)] * a;
  return {
    x: e.x + n * Math.cos(t),
    y: e.y + n * Math.sin(t)
  }
}
const createParticule = (e, t, ctx) =>{
  let a = {} as any;
  return a.x = e,
    a.y = t,
    a.color = colors[anime.random(0, colors.length - 1)],
    a.radius = anime.random(16, 32),
    a.endPos = setParticuleDirection(a),
    a.draw = () =>{
      ctx.beginPath()
      ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0)
      ctx.fillStyle = a.color
      ctx.fill()
    },
    a
}

const renderParticule = (e) =>{
  for (let t = 0; t < e.animatables.length; t++) {
    e.animatables[t].target.draw()
  }
}
