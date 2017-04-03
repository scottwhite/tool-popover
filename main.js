(()=>{
  let popovers, activepopover, activebutton;

  function genpopover(){
    let div = document.createElement('div');
    div.classList.add('popover');
    div.classList.add('pop-left');
    div.style.display = 'none';
    let content = document.createElement('div');
    content.classList.add('popover-content');
    div.appendChild(content);
    document.body.appendChild(div);
    activepopover = div;
  }
  function updatetext(txt){
    let n = activepopover.children[0];
    n.textContent = txt;
  }
  function showpopover(evnt){
    hidepopover(evnt);
    let btn = evnt.target;
    let box = btn.getBoundingClientRect();
    activebutton = btn;
    activepopover.style.display='block';
    activepopover.style.left = '-10000px';
    updatetext(btn.getAttribute('info-text'));
    checkboundary();
    evnt.stopPropagation();
    evnt.preventDefault();
  }

  function hidepopover(evnt){
    activepopover.style.display = 'none';
  }
  function checkboundary(evnt){
    if(activepopover){
      let w = window.innerWidth - 100;
      let targetbox = activebutton.getBoundingClientRect();
      console.log(activepopover);
      activepopover.style.top = targetbox.bottom + 10+ 'px'; //caret height
      let pos = targetbox.left + targetbox.width/2 -20;
      let box = activepopover.getBoundingClientRect();
      if(targetbox.right + 200 >= w){
        console.log('LFFIPPPPPPP')
        activepopover.style.left = (pos - box.width + 45) + 'px';
        activepopover.classList.remove('pop-left');
        activepopover.classList.add('pop-right');
      }else{
        activepopover.style.left = pos + 'px';
        activepopover.classList.remove('pop-right');
        activepopover.classList.add('pop-left');
      }
      
    }
  }
  function setup(){
    popovers = document.querySelectorAll('button[class="popover-btn"]');
    popovers.forEach((btn)=>{
      btn.addEventListener('click', showpopover);
    })
    document.addEventListener('click', hidepopover);
    window.addEventListener('resize', checkboundary);
    genpopover();
  }
  document.addEventListener('DOMContentLoaded', ()=>{
    setup();
  })
})()