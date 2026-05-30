// Uses system theme by default. Add your manual theme switch later if needed.
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
if(prefersLight){
  document.documentElement.style.setProperty('--bg','#f8fafc');
}
