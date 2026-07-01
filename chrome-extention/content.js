console.log("ALGOLENS CONTENT LOADED");

function getSampleTests(){


    const sampleTests=[];

    const sample=document.querySelector(".sample-test");

    if(!sample){
        return sampleTests;
    }

    const inputs=sample.querySelectorAll(".input");
    const outputs=sample.querySelectorAll(".output");

    for(let i=0;i<Math.min(inputs.length,outputs.length);i++){

        const inPre=inputs[i].querySelector("pre");
        const outPre=outputs[i].querySelector("pre");

        sampleTests.push({

            title:`Sample ${i+1}`,

            input:inPre?inPre.innerText.trim():"",

            expectedOutput:outPre?outPre.innerText.trim():""

        });

    }

    return sampleTests;

}

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

    const statementElement = document.querySelector(".problem-statement");

        let statement = "";

        if (statementElement) {
        statement = statementElement.innerText.trim();
    }

    let constraints = "";

    const sections = document.querySelectorAll(".problem-statement > div");

    sections.forEach(div => {
    const h = div.querySelector(".section-title");

    if (
        h &&
        h.innerText.toLowerCase().includes("constraints")
    ) {
        constraints = div.innerText
            .replace("Constraints", "")
            .trim();
    }
    });

    const tagElements=document.querySelectorAll(
        ".tag-box"
    );

    const sampleTests=getSampleTests();

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

    const data = {

    platform:"Codeforces",

    contestId:match[1],

    problemIndex:match[2],

    problemName:title,

    statement:statement,

    constraints:constraints,

    rating:rating,

    tags:tags,

    url:window.location.href,

    sampleTests:sampleTests

};

    return data;

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