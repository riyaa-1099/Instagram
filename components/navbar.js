const navbar=()=>{
    return`<div id="logo">
    <a href='/'> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png" alt="" /></a>
   </div>
   <div id="search">
   <input type='text'/> 
 </div>
 
   <div id="options">
     <a href="/create.html"><button id='submit_btn'>Create Post</button></a>
     <a href="/auth.html"><button id='auth_btn'>Sign-up/Log-in</button></a>
    <h3 id="h3"><b></b></h3>
   </div>`
};
export{ navbar };