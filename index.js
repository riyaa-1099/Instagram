import { navbar } from './components/navbar.js';
import { append } from './scripts/append.js'


let navbar_div=document.getElementById("navbar");
navbar_div.innerHTML=navbar();

let posts_div=document.getElementById('posts');
//append needs two things.
const getData=async () => {
let res =await fetch(`https://fathomless-eyrie-02716.herokuapp.com/posts`);
let data= await res.json();
//append(data,posts_div);
createButtons(data.length,2);
};

const getpaginatedData=async (clicked_button, limit) => {
    let res =await fetch(`https://fathomless-eyrie-02716.herokuapp.com/posts?_page=${clicked_button}&_limit=${limit}`);
    let data= await res.json();
    append(data,posts_div);  
    };

getData();
getpaginatedData(1,2);

let button_div=document.getElementById('buttons');

const createButtons=(total_images, images_per_page)=>{
const buttons=Math.ceil(total_images/images_per_page);
//100/2=50
for(let i=1;i<=buttons;i++){
let btn=document.createElement('button');
btn.id=i;
btn.innerText=i;
btn.onclick=()=>{
    //console.log(i);
    getpaginatedData(i,2)
  };
button_div.append(btn)
 };
};
