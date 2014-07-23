window.onload = function(){
    var ul = document.querySelector('aside > ul');
    ul.addEventListener("click",function(event){
        var a = event.target;
        var ul = a.parentNode.querySelector('ul');
        if(ul){
            ul.style.display = ul.style.display == 'none'||ul.style.display == ''? 'block':'none';
        }
    });
}
