const axios=require("axios");

const BASE_URL="http://localhost:8000/api";

async function getLatestProblem(){

    const a=await axios.get(
        `${BASE_URL}/problems/latest`
    );

    console.log("LATEST PROBLEM:");
    console.log("AI:",a.data.data.aiGenerated);
    console.log("EDGE:",a.data.data.edgeCases);
    console.log("HINTS:",a.data.data.hints);

    return a.data.data;

}

async function getActiveSession(){

    try{

        const a=await axios.get(
            `${BASE_URL}/sessions/active`
        );

        return a.data.data;

    }

    catch(e){

        if(
            e.response &&
            e.response.status===404
        ){
            return null;
        }

        throw e;

    }

}

async function startSession(problem){

    const a=await axios.post(
        `${BASE_URL}/sessions/start`,
        {
            contestId:problem.contestId,
            problemIndex:problem.problemIndex,
            problemName:problem.problemName
        }
    );

    return a.data.data;

}

async function pauseSession(sessionId){

    const a=await axios.post(
        `${BASE_URL}/sessions/pause/${sessionId}`
    );

    return a.data.data;

}

async function resumeSession(sessionId){

    const a=await axios.post(
        `${BASE_URL}/sessions/resume/${sessionId}`
    );

    return a.data.data;

}

async function completeSession(sessionId){

    const a=await axios.post(
        `${BASE_URL}/sessions/complete/${sessionId}`,
        {
            attempts:1,
            verdict:"Accepted"
        }
    );

    return a.data.data;

}

async function getHints(problem){

    console.log("INSIDE getHints()");
    console.log(problem);

    const r=await axios.post(
        `${BASE_URL}/ai/hints`,
        {
            title:problem.problemName,
            statement:problem.statement,
            constraints:problem.constraints
        }
    );

    console.log("HINT API RESPONSE:",r.data);

    return r.data.data;

}

async function incrementWrongSubmission(sessionId){

    const a=await axios.patch(
        `${BASE_URL}/sessions/${sessionId}/wrong-submission`
    );

    return a.data.data;

}

async function incrementSuccessfulRun(sessionId){

    const a=await axios.patch(
        `${BASE_URL}/sessions/${sessionId}/successful-run`
    );

    return a.data.data;

}

async function getSessionById(sessionId){

    const a=await axios.get(
        `${BASE_URL}/sessions/${sessionId}`
    );

    return a.data.data;

}

module.exports={

    getLatestProblem,
    getActiveSession,
    startSession,
    pauseSession,
    resumeSession,
    completeSession,
    getHints,
    incrementWrongSubmission,
    incrementSuccessfulRun,
    getSessionById

};