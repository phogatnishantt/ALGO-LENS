const vscode=require("vscode");
const AlgoLensProvider=require("./AlgoLensProvider");
const api=require("./services/api");
const {runTest}=require("./engine");


async function activate(context){

    const provider=new AlgoLensProvider(context);

   provider.onRunTest=async(test)=>{

    provider.showTestLoading(test.id);

    try{

        const result=await runTest(test);

        console.log("RUN RESULT:",result);

        if(sessionId){

            if(result.passed){

                console.log("Incrementing successful run");

                await api.incrementSuccessfulRun(sessionId);

            }

            else{

                console.log("Incrementing wrong submission");

                await api.incrementWrongSubmission(sessionId);

            }

            const s=await api.getSessionById(sessionId);

            console.log("SESSION:",s);

            provider.updateSession(s);

        }

        provider.showTestResult({

            ...result,

            id:test.id

        });

    }

    catch(e){

        console.error("RunTest Error:",e);

        provider.showTestResult({

            id:test.id,

            success:false,

            compileError:true,

            error:e.message

        });

    }

};
    let currentProblemId="";

    let sessionId=null;

    let sessionState="READY";

    context.subscriptions.push(

        vscode.window.registerWebviewViewProvider(

            "algolensSidebar",

            provider

        )

    );

    vscode.window.showInformationMessage(
        "AlgoLens Activated!"
    );

    try{

        const a=await api.getActiveSession();

        if(a){

            sessionId=a._id;

            if(a.status==="ACTIVE"){

                sessionState="ACTIVE";

                provider.setState("ACTIVE");

                provider.setStatus("🟢 Coding");

                provider.startTimer(
                a.lastResumeTime,
                a.totalDuration
                );

                provider.seconds=a.totalDuration;

                provider.updateSession(a);

            }

            else{

                sessionState="PAUSED";

                provider.setState("PAUSED");

                provider.setStatus("🟡 Paused");

                provider.setElapsed(
                    a.totalDuration
                );

            }

        }

        else{

            sessionState="READY";

            provider.setState("READY");

            provider.setStatus("🟢 Ready");

        }

    }

    catch(e){

        sessionState="READY";

        provider.setState("READY");

        provider.setStatus("🟢 Ready");

    }

    context.subscriptions.push(

        vscode.commands.registerCommand(

            "algo-lens.startSession",

            async()=>{

                try{

                    const s=await api.getActiveSession();

if(s){

    sessionId=s._id;

    sessionState="ACTIVE";

    provider.setState("ACTIVE");

    provider.setStatus("🟢 Coding");

    provider.startTimer(

        s.lastResumeTime,

        s.totalDuration

    );

    vscode.window.showWarningMessage(

        "A session is already active."

    );

    return;

}

sessionState="READY";

                    if(!provider.problem){

                        vscode.window.showErrorMessage(
                            "No problem loaded."
                        );

                        return;

                    }

                   const a=await api.startSession(
                     provider.problem
                    );

                     sessionId=a._id;

                    currentProblemId=

                     provider.problem.contestId+

                     "-"+

                    provider.problem.problemIndex;

                    sessionState="ACTIVE";

                    provider.setState("ACTIVE");

                    provider.setStatus(
                        "🟢 Coding"
                    );

                    provider.setElapsed(0);

                    const b=await api.getActiveSession();

                    provider.startTimer(

                   b.lastResumeTime,

                         b.totalDuration

                        );
                }

                catch(e){

                    vscode.window.showErrorMessage(
                        e.message
                    );

                }

            }

        )

    );

context.subscriptions.push(

    vscode.commands.registerCommand(

        "algo-lens.pauseSession",

        async()=>{

            try{

                if(sessionState!=="ACTIVE"){

                    return;

                }

                const a=await api.pauseSession(
                    sessionId
                );

                sessionState="PAUSED";

                provider.stopTimer();

                provider.setElapsed(
                    a.totalDuration
                );

                provider.setState(
                    "PAUSED"
                );

                provider.setStatus(
                    "🟡 Paused"
                );

            }

            catch(e){

                vscode.window.showErrorMessage(
                    e.message
                );

            }

        }

    )

);

 context.subscriptions.push(

    vscode.commands.registerCommand(

        "algo-lens.resumeSession",

        async()=>{

            try{

                if(sessionState!=="PAUSED"){

                    return;

                }

                const a=await api.resumeSession(
                    sessionId
                );

                sessionState="ACTIVE";

                provider.setState(
                    "ACTIVE"
                );

                provider.setStatus(
                    "🟢 Coding"
                );

                provider.startTimer(

                    a.lastResumeTime,

                    a.totalDuration

                );

            }

            catch(e){

                vscode.window.showErrorMessage(
                    e.message
                );

            }

        }

    )

);
    context.subscriptions.push(

        vscode.commands.registerCommand(

            "algo-lens.completeSession",

            async()=>{

                try{

                    if(sessionState==="READY"){

                        vscode.window.showWarningMessage(
                            "No active session."
                        );

                        return;

                    }

                    await api.completeSession(
                        sessionId
                    );

                    sessionId=null;

                    sessionState="READY";

                    provider.stopTimer();

                    provider.setElapsed(0);

                    provider.setState(
                        "READY"
                    );

                    provider.setStatus(
                        "🟢 Ready"
                    );

                    provider.refreshProblem();

                    vscode.window.showInformationMessage(
                        "Session Completed"
                    );

                }

                catch(e){

                    vscode.window.showErrorMessage(
                        e.message
                    );

                }

            }

        )

    );

    setInterval(async()=>{

    try{

        const p=await api.getLatestProblem();

        const id=

            p.contestId+

            "-"+

            p.problemIndex;

        if(currentProblemId===""){

    currentProblemId=id;

    await provider.refreshProblem();

    return;

}

        if(id!==currentProblemId){

    currentProblemId=id;

    await provider.refreshProblem();

    const s=await api.getActiveSession();

    if(!s){

        sessionId=null;

        sessionState="READY";

        provider.stopTimer();

        provider.setElapsed(0);

        provider.setState("READY");

        provider.setStatus("🟢 Ready");

    }

    else{

        sessionId=s._id;

        sessionState=s.status;

        if(s.status==="ACTIVE"){

            provider.setState("ACTIVE");

            provider.setStatus("🟢 Coding");

            provider.startTimer(

                s.lastResumeTime,

                s.totalDuration

            );

        }

        else{

            provider.setState("PAUSED");

            provider.setStatus("🟡 Paused");

            provider.setElapsed(

                s.totalDuration

            );

        }

    }

}

    }

    catch(e){

        console.error(e);

    }

},3000);
}

function deactivate(){}

module.exports={

    activate,

    deactivate

};