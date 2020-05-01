
docReady(function() {
   var btn = document.querySelector("#js-menu-toggle");
   var menu = document.querySelector("#js-menu");
   var icon = btn.querySelector("i");

   btn.addEventListener("click",function(){
   		if(menu.offsetParent === null){
   			menu.classList.remove("m-hide");
   			icon.classList.remove("fa-bars")
   			icon.classList.add("fa-times");
   		}else{
   			menu.classList.add("m-hide");
   			icon.classList.remove("fa-times");
   			icon.classList.add("fa-bars");
   		}
   })

   	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('./sw.js', {scope: './'})
		.then((reg) => { //worked    
	    	console.log('Registration succeeded. ' + reg.scope);
	  	}).catch((error) => {    
	    	console.log('Registration failed with ' + error);
	  	});
	}

});

function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    


