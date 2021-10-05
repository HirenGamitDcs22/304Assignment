const fs=require("fs");
const readline=require("readline");
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
var dirName="";
var fileName="";
var content="";
var instraction=()=>{
    console.log("\nEnter 1 for Create Directory.");
    console.log("Enter 2 for Remove Directory.");
    console.log("Enter 3 for Write File.");
    console.log("Enter 4 for Read File.");
    console.log("Enter 5 for Delete File.");
    console.log("Enter 6 for Append data to file.");
    console.log("Enter 7 for Update / Replace file with new data.");
    console.log("Enter 8 for Rename File");
    console.log("Enter 9 for Exit.");
}
var start=()=>{
    rl.question("\nEnter your choice: ",(ans)=>{
        if(ans==="1"){
            createDirWizard();
        }
        else if(ans==="2"){
            removeDirWizard();
        }else if(ans==="3"){
            writeFileWizard();
        }else if(ans==="4"){
            readFileWizard();
        }else if(ans==="5"){
            deleteFileWizard();
        }else if(ans==="6"){
            appendDataFileWizard();
        }else if(ans==="7"){
            updateFileWizard();
        }else if(ans==="8"){
            renameFileWizard();
        }else if(ans==="9"){
            rl.close();
        }else{
            console.log("Wrong Choice. please try again");
            start();``
        }
    });
}
var repeat=()=>{
    instraction();
    start();
}

repeat();

var createDirWizard=()=>{
    rl.question("Enter Directory Name: ",(ans)=>{
        dirName=ans;
        creatDir();
    })
}
var creatDir=()=>{
    fs.mkdir(dirName,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Directory Created Successfully...! " +dirName);
        }
        repeat();
    });
}

var removeDirWizard=()=>{
    rl.question("Enter Directory Name: ",(ans)=>{
        dirName=ans;
        removeDir();
    })
}
var removeDir=()=>{
    fs.rmdir(dirName,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log(dirName+" Directory Removed Successfully...!");
        }
        repeat();
    });
}

var writeFileWizard=()=>{
    rl.question("Enter File Name: ",(ans)=>{
        fileName=ans;
        rl.question("Enter File Content : ",(ans)=>{
            content=ans;
            writeFileData();
        });
    });
}
var writeFileData=()=>{
    fs.writeFile(fileName+".txt",content,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("File Created Successfully...! "+fileName);
        }
        repeat();
    });
}

var readFileWizard=()=>{
    rl.question("Enter File Name: ",(ans)=>{
        fileName=ans;
        fs.readFile(fileName+".txt","utf8",(err,result)=>{
            if(err){
                console.log(err);
            }else{
                console.log(result);
            }
            repeat();
        });
    });
}

var deleteFileWizard=()=>{
    rl.question("Enter file Name :",(ans)=>{
        fs.unlink(ans+".txt",(err)=>{
            if(err){
                console.log(err);
            }else{
                console.log(ans+".txt File Deleted Successfully...!");
            }
            repeat();
        });
    });
}

var appendDataFileWizard=()=>{
    rl.question("Enter File name to Append:",(ans)=>{
        fileName=ans;
        rl.question("Enter Content:",(ans)=>{
            content=ans;
            fs.appendFile(fileName+".txt",content,(err)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(fileName+".txt  File Append Successfully...!");
                }
                repeat();
            });
        });
    });
}

var updateFileWizard=()=>{
    rl.question("Enter file name:",(ans)=>{
        fileName=ans;
        rl.question("Enter content to replace : ",(ans)=>{
            content=ans;
            rl.question("Enter new Content to replace:",(ans)=>{
                const repstring=ans;
                fs.readFile(fileName+".txt","utf8",(err,data)=>{
                    if(err){
                        console.log(err);
                        repeat();
                    }else{
                        const result=data.replace(content,repstring);
                        fs.writeFile(fileName+".txt",result,(err)=>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log(fileName+".txt  File Updated.");
                            }
                            repeat();
                        });
                    }
                });
            });
        });
    });
}

var renameFileWizard=()=>{
    rl.question("Enter old File name:",(ans)=>{
        var oldfile=ans;
        rl.question('Enter new File Name:',(ans)=>{
            fs.rename(oldfile+".txt",ans+".txt",(err)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(oldfile+".txt File is Renamed to "+ans+".txt");
                }
                repeat();
            });
        });
    });
}
