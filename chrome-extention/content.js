console.log("ALGOLENS CONTENT LOADED");

function getProblemData(){

    console.log("PATH:",window.location.pathname);

    const path=window.location.pathname;

    let match=path.match(
        /\/contest\/(\d+)\/problem\/([A-Za-z0-9]+)/
    );

    if(!match){

        match=path.match(
            /\/problemset\/problem\/(\d+)\/([A-Za-z0-9]+)/
        );

    }

    if(!match){
        return null;
    }

    const titleElement=document.querySelector(
        ".problem-statement .title"
    );

    let title="NO TITLE";

    if(titleElement){

        title=titleElement.innerText;

        const i=title.indexOf(". ");

        if(i!==-1){

            title=title.substring(i+2);

        }

        title=title.trim();

    }

    const tagElements=document.querySelectorAll(
        ".tag-box"
    );

    const tags=[];

    let rating=0;

    tagElements.forEach(a=>{

        const b=a.innerText.trim();

        if(!b.length){
            return;
        }

        if(b.startsWith("*")){

            const c=parseInt(b.substring(1));

            if(!isNaN(c)){
                rating=c;
            }

        }
        else{

            tags.push(b);

        }

    });

    return{

        platform:"Codeforces",

        contestId:match[1],

        problemIndex:match[2],

        problemName:title,

        rating:rating,

        tags:tags,

        url:window.location.href

    };

}

chrome.runtime.onMessage.addListener(
    (request,sender,sendResponse)=>{

        if(request.type==="GET_PROBLEM"){

            sendResponse(
                getProblemData()
            );

        }

    }
);