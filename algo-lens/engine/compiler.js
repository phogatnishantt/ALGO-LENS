const vscode=require("vscode");
const path=require("path");
const fs=require("fs");
const {spawn}=require("child_process");

async function compile(){

    const e=vscode.window.activeTextEditor;

    if(!e){

        return{

            success:false,
            error:"No active editor."

        };

    }

    const f=e.document.fileName;

    if(path.extname(f)!==".cpp"){

        return{

            success:false,
            error:"Open a C++ source file."

        };

    }

    if(e.document.isDirty){

        await e.document.save();

    }

    const d=path.dirname(f);

    const n=path.basename(f,".cpp");

    const o=path.join(d,n);

    if(process.platform==="win32"){

        o+=".exe";

    }

    return new Promise((resolve)=>{

        const a=[
            f,
            "-std=c++17",
            "-O2",
            "-o",
            o
        ];

        const c=spawn("g++",a);

        let err="";

        c.stderr.on("data",x=>{

            err+=x.toString();

        });

        c.on("error",()=>{

            resolve({

                success:false,
                error:"g++ compiler not found."

            });

        });

        c.on("close",code=>{

            if(code!==0){

                resolve({

                    success:false,
                    error:err

                });

                return;

            }

            if(!fs.existsSync(o)){

                resolve({

                    success:false,
                    error:"Compilation failed."

                });

                return;

            }

            resolve({

                success:true,
                executable:o,
                source:f

            });

        });

    });

}

module.exports={

    compile

};