const vscode=require("vscode");
const fs=require("fs");
const path=require("path");

const api=require("./services/api");
const getDifficulty=require("./utils/difficulty");

class AlgoLensProvider{

    constructor(context){

    this.context=context;

    this.v=null;

    this.problem=null;

    this.status="🟢 Ready";

    this.state="READY";

    this.timer=null;

    this.seconds=0;

    this.hints=[];

    this.session=null;

    this.tests={

    sampleTests:[],

    edgeCases:[]

    };

    this.onRunTest=null;

}

    async resolveWebviewView(v){

        this.v=v;

        v.webview.options={

            enableScripts:true,

            localResourceRoots:[

                vscode.Uri.joinPath(
                    this.context.extensionUri,
                    "webview"
                )

            ]

        };

        v.webview.onDidReceiveMessage(

            async a=>{

                if(a.command==="ready"){

    this.postProblem();

    this.postStatus();

    this.postTimer();

    this.setHints(this.hints);

    this.setTests(this.tests);

    return;

}

                if(a.command==="runTest"){

    console.log("RUN TEST MESSAGE RECEIVED");

    console.log(this.onRunTest);

    if(this.onRunTest){

        console.log("CALLING onRunTest");

        this.onRunTest(a.test);

    }

    else{

        console.log("onRunTest is undefined");

    }

    return;

}
                if(a.command==="start"){

                    vscode.commands.executeCommand(
                        "algo-lens.startSession"
                    );

                    return;

                }

                if(a.command==="pause"){

                    vscode.commands.executeCommand(
                        "algo-lens.pauseSession"
                    );

                    return;

                }

                if(a.command==="resume"){

                    vscode.commands.executeCommand(
                        "algo-lens.resumeSession"
                    );

                    return;

                }

                if(a.command==="complete"){

                    vscode.commands.executeCommand(
                        "algo-lens.completeSession"
                    );

                }

                if(a.command==="hintLocked"){

            vscode.window.showInformationMessage(

             "Hint unlocks in "+a.remaining+" seconds."

            );

                 return;

            }

            }

        );

        await this.loadProblem();

        this.render();

        setInterval(async()=>{

    await this.loadProblem();

    this.postProblem();

    this.v.webview.postMessage({
    type:"problemChanged"
    });

    },3000);

    }

    async loadProblem(){

    try{

        const p=await api.getLatestProblem();

        console.log("AI Generated:",p.aiGenerated);
        console.log("EdgeCases:",p.edgeCases?.length);
        console.log(p.edgeCases);

        let changed=false;

        if(!this.problem){

            changed=true;

        }

        else if(

            this.problem.contestId!==p.contestId ||

            this.problem.problemIndex!==p.problemIndex

        ){

            changed=true;

        }

        this.problem=p;

        if(changed){

            this.stopTimer();

            this.setElapsed(0);

            this.setState("READY");

            this.setStatus("🟢 Ready");

            this.setHints([]);

            this.postProblem();

this.setTests({

    sampleTests:this.problem.sampleTests||[],

    edgeCases:this.problem.edgeCases||[]

});

if(this.problem.aiGenerated){

    this.setHints(

        (this.problem.hints||[]).map(x=>x.text||x)

    );

    this.setTests({

        sampleTests:this.problem.sampleTests||[],

        edgeCases:this.problem.edgeCases||[]

    });

}
else{

    this.setHints([
        "Generating Hint 1...",
        "Generating Hint 2...",
        "Generating Hint 3..."
    ]);

    const poll=setInterval(async()=>{

        try{

            const p=await api.getLatestProblem();

            if(

                p._id===this.problem._id &&

                p.aiGenerated

            ){

                clearInterval(poll);

                this.problem=p;

                this.setHints(

                    (p.hints||[]).map(x=>x.text||x)

                );

                this.setTests({

                    sampleTests:p.sampleTests||[],

                    edgeCases:p.edgeCases||[]

                });

                this.postProblem();

            }

        }

        catch(e){

            console.error(e);

        }

    },3000);

}

        }

    }

    catch(e){

        vscode.window.showErrorMessage(

            "Cannot connect to backend"

        );

    }

}

    startTimer(startTime,initialSeconds=0){

    this.stopTimer();

    this.seconds=initialSeconds;

    const a=new Date(startTime);

    this.timer=setInterval(()=>{

        this.seconds=

            initialSeconds+

            Math.floor(

                (Date.now()-a.getTime())/1000

            );

        this.postTimer();

    },1000);

}

    stopTimer(){

        if(this.timer){

            clearInterval(this.timer);

            this.timer=null;

        }

    }

    setElapsed(seconds){

        this.seconds=seconds;

        this.postTimer();

    }

    formatTime(){

        const h=Math.floor(this.seconds/3600);

        const m=Math.floor((this.seconds%3600)/60);

        const s=this.seconds%60;

        return(

            String(h).padStart(2,"0")

            +":"

            +String(m).padStart(2,"0")

            +":"

            +String(s).padStart(2,"0")

        );

    }

    render(){

        if(!this.v){
            return;
        }

        const h=path.join(

            this.context.extensionUri.fsPath,

            "webview",

            "index.html"

        );

        let html=fs.readFileSync(

            h,

            "utf8"

        );

        const css=this.v.webview.asWebviewUri(

            vscode.Uri.joinPath(

                this.context.extensionUri,

                "webview",

                "style.css"

            )

        );

        const js=this.v.webview.asWebviewUri(

            vscode.Uri.joinPath(

                this.context.extensionUri,

                "webview",

                "script.js"

            )

        );

        html=html.replace(
            "style.css",
            css.toString()
        );

        html=html.replace(
            "script.js",
            js.toString()
        );

        this.v.webview.html=html;

    }

    postProblem(){

        if(!this.v){
            return;
        }

        if(!this.problem){
            return;
        }

        const d=getDifficulty(
            this.problem.rating
        );

        const width=Math.min(
            this.problem.rating/35,
            100
        );

        this.v.webview.postMessage({

            type:"problem",

            platform:this.problem.platform,

            contestId:this.problem.contestId,

            problemIndex:this.problem.problemIndex,

            problemName:this.problem.problemName,

            rating:this.problem.rating,

            difficulty:d.label,

            difficultyWidth:width,

            tags:this.problem.tags||[]

        });

    }

    postStatus(){

        if(!this.v){
            return;
        }

        this.v.webview.postMessage({

            type:"status",

            value:this.status,

            state:this.state

        });

    }

    postTimer(){

        if(!this.v){
            return;
        }

        this.v.webview.postMessage({

            type:"timer",

            value:this.formatTime()

        });

    }

    setStatus(a){

        this.status=a;

        this.postStatus();

    }

    setState(a){

        this.state=a;

        this.postStatus();

    }

    refreshProblem(){

        this.loadProblem()
            .then(()=>{

                this.postProblem();

            });

    }

    setHints(hints){

    this.hints=hints;

    if(!this.v){
        return;
    }

    this.v.webview.postMessage({

        type:"hints",

        hints:this.hints

    });

}

setTests(t){

    console.log("========== TESTS ==========");
    console.log("Sample:",t.sampleTests.length);
    console.log("Edge:",t.edgeCases.length);
    console.log(t.edgeCases);

    this.tests=t;

    if(!this.v){
        return;
    }

    this.v.webview.postMessage({

        type:"tests",

        sampleTests:t.sampleTests,

        edgeCases:t.edgeCases

    });

}

showTestLoading(id){

    if(!this.v){

        return;

    }

    this.v.webview.postMessage({

        type:"testLoading",

        id

    });

}

showTestResult(result){

    if(!this.v){

        return;

    }

    this.v.webview.postMessage({

        type:"testResult",

        result

    });

}

updateSession(s){

    console.log("SESSION UPDATE",s.wrongSubmissions);

    this.session=s;

    if(!this.v){
        return;
    }

    this.v.webview.postMessage({

        type:"session",

        wrongSubmissions:s.wrongSubmissions||0,
        successfulRuns:s.successfulRuns||0

    });

}

}

module.exports=AlgoLensProvider;