const {spawn}=require("child_process");

function run(executable,input,timeLimit=2000){

    return new Promise((resolve)=>{

        const p=spawn(executable,[],{

            stdio:["pipe","pipe","pipe"]

        });

        let out="";
        let err="";
        let done=false;

        const timer=setTimeout(()=>{

            if(done){

                return;

            }

            done=true;

            p.kill("SIGKILL");

            resolve({

                success:false,

                timeout:true,

                output:"",

                error:"Time Limit Exceeded"

            });

        },timeLimit);

        p.stdout.on("data",x=>{

            out+=x.toString();

        });

        p.stderr.on("data",x=>{

            err+=x.toString();

        });

        p.on("error",e=>{

            if(done){

                return;

            }

            done=true;

            clearTimeout(timer);

            resolve({

                success:false,

                timeout:false,

                output:"",

                error:e.message

            });

        });

        p.on("close",code=>{

            if(done){

                return;

            }

            done=true;

            clearTimeout(timer);

            resolve({

                success:code===0,

                timeout:false,

                output:out,

                error:err,

                exitCode:code

            });

        });

        p.stdin.write(input);

        if(!input.endsWith("\n")){

            p.stdin.write("\n");

        }

        p.stdin.end();

    });

}

module.exports={

    run

};