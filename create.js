import { navbar } from './components/navbar.js';
let navbar_div=document.getElementById("navbar");
navbar_div.innerHTML=navbar();
//ed68c179b77264ff04fd7b3dbdf94056
let arr=JSON.parse(localStorage.getItem("deleted"))||[] ;

let create_btn =document.getElementById('create_btn');

create_btn.onclick=()=>{
//submitting post to server
if(image_url===undefined){
    console.log("Please Wait!")
}
else{
createPost();}
};

let delete_btn =document.getElementById('delete_btn');
delete_btn.onclick=()=>{
//deleting post from server
deletePost();
};

let retrieve_btn =document.getElementById('retrieve_btn');
retrieve_btn.onclick=()=>{
//deleting post from server
retrievePost();
};

let update_btn =document.getElementById('update_btn');
update_btn.onclick=()=>{
//deleting post from server
updatePost();
};

//select file 
let inp_image=document.getElementById('image')
inp_image.onchange=()=>{
    handleImage();
}

let image_url;

//function to get the url for local images
const handleImage=async()=>{
//accept img file
let img=document.getElementById('image');
//access img data
let actual_img =img.files[0]
//imgbb asking to send data in formdata object
//console.log(actual_img)
let form=new FormData()
form.append('image',actual_img);
//lets make the post request

let res=await fetch(`https://api.imgbb.com/1/upload?key=ed68c179b77264ff04fd7b3dbdf94056`,{
    method:'POST',
    body:form,
});
let data=await res.json();
//console.log('data:',data);
image_url=data.data.display_url;
console.log(image_url)
};



const createPost = async()=>{
    //1.grab all data
let id=document.getElementById('id').value;
let caption =document.getElementById('caption').value;
//2. pack all data to be sent an object
let send_this_data={
    id,
    caption,
    image_url,
};
let res= await fetch('https://fathomless-eyrie-02716.herokuapp.com/posts',{

method: 'POST',
body: JSON.stringify(send_this_data),
headers: {
    'Content-Type': 'application/json',
},

});
let data= await res.json();
console.log('data:',data)
};


const retrievePost = async () =>{
    
    let gett=JSON.parse(localStorage.getItem("deleted"));
    
// let dataget=gett.findOne({"id":id})

    let res= await fetch('https://fathomless-eyrie-02716.herokuapp.com/posts',{
    method: 'POST',
    body: JSON.stringify(gett[0]),
    headers: {
        'Content-Type': 'application/json',
    },   
    });
    let data= await res.json();
    console.log('data:',data)
gett.splice(0,1)    
localStorage.setItem("deleted",JSON.stringify(gett));
}


const deletePost = async () =>{
let delete_id = document.getElementById('delete_id').value;
let fin=await fetch(`https://fathomless-eyrie-02716.herokuapp.com/posts/${delete_id}`)
let findata= await fin.json();
arr.push(findata);
 localStorage.setItem("deleted",JSON.stringify(arr))

let res = await fetch(`https://fathomless-eyrie-02716.herokuapp.com/posts/${delete_id}`,{
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
});
let data=await res.json();
console.log('data:',data);
};


const updatePost=async()=>{
    try {
let update_id = document.getElementById('update_id').value;
let new_caption= document.getElementById('update_caption').value;
let send_this_data={
    caption: new_caption,
};
let res= await fetch(`https://fathomless-eyrie-02716.herokuapp.com/posts/${update_id}`,{
    method: 'PATCH',
    body: JSON.stringify(send_this_data),
    headers:{
        'Content-Type':'application/json',
    },
});
let data = await res.json();
console.log('data:',data);
}
catch(err){
    console.log('err:',err)
 }
};