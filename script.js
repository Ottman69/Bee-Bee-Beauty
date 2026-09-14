document.addEventListener('DOMContentLoaded',()=>{
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.body.classList.add('js-ready');

  const revealTargets=[
    '.section-head',
    '.cards article',
    '.about .visual',
    '.about > div:last-child',
    '.grid div',
    '.testimonial > *',
    '.contact > div',
    'footer > *'
  ];

  const elements=document.querySelectorAll(revealTargets.join(','));
  elements.forEach((el,index)=>{
    el.classList.add('reveal');
    el.style.setProperty('--reveal-delay',`${Math.min(index%5,4)*70}ms`);
  });

  if(reduceMotion){
    elements.forEach(el=>el.classList.add('is-visible'));
    return;
  }

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.14,rootMargin:'0px 0px -40px'});
  elements.forEach(el=>observer.observe(el));

  const header=document.querySelector('header');
  const onScroll=()=>header?.classList.toggle('scrolled',window.scrollY>24);
  onScroll();
  window.addEventListener('scroll',onScroll,{passive:true});

  document.querySelectorAll('.cards article,.contact-card,.grid div').forEach(card=>{
    card.addEventListener('pointermove',e=>{
      if(e.pointerType==='touch') return;
      const rect=card.getBoundingClientRect();
      const x=(e.clientX-rect.left)/rect.width-.5;
      const y=(e.clientY-rect.top)/rect.height-.5;
      card.style.setProperty('--mx',`${x*4}px`);
      card.style.setProperty('--my',`${y*4}px`);
    });
    card.addEventListener('pointerleave',()=>{
      card.style.setProperty('--mx','0px');
      card.style.setProperty('--my','0px');
    });
  });
});