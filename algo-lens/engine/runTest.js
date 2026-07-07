const {compile}=require("./compiler");
const {run}=require("./runner");
const {compare}=require("./comparator");

async function runTest(test){

    const c=await compile();

    if(!c.success){

        return{

            success:false,

            compileError:true,

            error:c.error

        };

    }

    const r=await run(

        c.executable,

        test.input

    );

    if(r.timeout){

        return{

            success:false,

            timeout:true,

            title:test.title,

            expected:test.expectedOutput||test.output,

            actual:"",

            error:"Time Limit Exceeded"

        };

    }

    if(!r.success){

        return{

            success:false,

            runtimeError:true,

            title:test.title,

            expected:test.expectedOutput||test.output,

            actual:r.output,

            error:r.error

        };

    }

    const x=compare(

        test.expectedOutput||test.output,

        r.output

    );

    return{

        success:true,

        title:test.title,

        passed:x.passed,

        expected:x.expected,

        actual:x.actual

    };

}

module.exports={

    runTest

};