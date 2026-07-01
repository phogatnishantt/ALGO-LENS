const p=document.getElementById("problem");
const startBtn=document.getElementById("startBtn");

let currentProblem=null;

chrome.tabs.query(
    {active:true,currentWindow:true},
    (tabs)=>{

        chrome.tabs.sendMessage(
            tabs[0].id,
            {type:"GET_PROBLEM"},
            (response)=>{

                if(chrome.runtime.lastError){

                    p.innerText="❌ "+chrome.runtime.lastError.message;
                    return;

                }

                if(!response){

                    p.innerText="❌ No Problem Found";
                    return;

                }

                currentProblem=response;

                p.innerText=JSON.stringify(
                    currentProblem,
                    null,
                    2
                );

            }
        );

    }
);

startBtn.onclick=async()=>{

    if(!currentProblem){

        p.innerText="❌ No Problem Found";
        return;

    }

    const a={

    platform:currentProblem.platform,

    contestId:currentProblem.contestId,

    problemIndex:currentProblem.problemIndex,

    problemName:currentProblem.problemName,

    statement:currentProblem.statement,

    constraints:currentProblem.constraints,

    rating:currentProblem.rating,

    tags:currentProblem.tags,

    url:currentProblem.url,

    sampleTests:currentProblem.sampleTests,

    solved:false

};

    try{

        const r=await fetch(
            "http://localhost:8000/api/problems",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(a)
            }
        );

        const t=await r.text();

        if(r.ok){

            p.innerText="✅ Problem Saved Successfully";

        }

        else{

            p.innerText="❌ "+t;

        }

    }

    catch(e){

        console.error(e);

        p.innerText="❌ Failed To Save Problem";

    }

};