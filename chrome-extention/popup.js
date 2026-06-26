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

                console.log("Response:",response);

                if(!response){

                    p.innerText="NO RESPONSE";
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

startBtn.addEventListener(
    "click",
    async()=>{

        if(!currentProblem){

            p.innerText="❌ No Problem Found";
            return;

        }

        const a={

            platform:currentProblem.platform,

            contestId:currentProblem.contestId,

            problemIndex:currentProblem.problemIndex,

            problemName:currentProblem.problemName,

            rating:currentProblem.rating,

            tags:currentProblem.tags,

            url:currentProblem.url,

            solved:false

        };

        console.log("Sending Data:",a);

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

            console.log("Status:",r.status);
            console.log("Status Text:",r.statusText);

            const t=await r.text();

            console.log("Response:",t);

            if(r.ok){

                p.innerText="✅ Problem Saved Successfully";

            }
            else{

                p.innerText="❌ "+t;

            }

        }
        catch(e){

            console.error("Fetch Error:",e);

            p.innerText="❌ Failed To Save Problem";

        }

    }
);