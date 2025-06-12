const username = 'LibraAkaja';
const repo = 'Image-Metadata-Viewer';

fetch(`https://api.github.com/repos/${username}/${repo}`)
    .then(response => response.json())
    .then(data => {
        document.querySelector('.star-count').textContent = data.stargazers_count;
    })
    .catch(error => {
        console.error('GitHub API error:',error);
        document.querySelector('.star-count').textContent = '-';
    });

import { changeCSS } from "./dynamic.js";

document.querySelector(".gitHubStar").addEventListener("mouseenter",()=>{
    document.querySelector("#star").src = "/Assets/star-yellow.svg";
});

document.querySelector(".gitHubStar").addEventListener("mouseleave",()=>{
    changeCSS("#star","opacity","0.8");
    changeCSS("#star","transition","opacity 0.4s ease");
    setTimeout(()=>{
        document.querySelector("#star").src = "/Assets/star-white.svg";
        changeCSS("#star","opacity","1")
    },500);
});