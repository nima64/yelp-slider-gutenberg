
const getPerView = (width) =>{
    if (width > 700){
        return 3;
    }else if (width > 400){
        return 2;
    }else {
        return 1;
    }
}
const glideSetup = (element) => {
    if (!element){
        console.log('glider has not been created');
        return
    }
    let initW = element.offsetWidth;
    var glide = new Glide('.glide',{
        perView:getPerView(initW),
    }).mount();
    window.addEventListener('resize', function(){
        let currentW = element.offsetWidth;
        console.log('width ' + currentW);
        glide.update({perView:getPerView(currentW)});
    })
}
window.addEventListener('DOMContentLoaded',()=>{
    const glideE = document.body.querySelector('.glide');
    glideSetup(glideE);
},false)