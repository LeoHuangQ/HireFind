const uploadJob = async (file)=>{
    console.log("request body:", {job: file})
    const res = await fetch("http://localhost:3000/job/matching",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"job": file})
    });

    return res.json();
}

export const generateNewResume = async (job) => {
    console.log("request body:", {job})
    const res = await fetch("http://localhost:3000/job/generate",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"job": job})
    });

    return res.json();
}

export default uploadJob;