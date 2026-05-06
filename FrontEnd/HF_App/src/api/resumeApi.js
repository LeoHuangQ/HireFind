const uploadResume = async (file)=>{
    console.log("request body:", {resume: file})
    const res = await fetch("http://localhost:3000/resume/parse",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"resume": file})
    });

    return res.json();
}

export const getLastResumeData = async () => {
    const res = await fetch("http://localhost:3000/resume/last-resume", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}

export const getLastParseResult = async () => {
    const res = await fetch("http://localhost:3000/resume/last-parse", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}

export default uploadResume;