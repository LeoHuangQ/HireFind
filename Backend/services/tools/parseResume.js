export const parseResumeTool ={
    name: "parse_resume",
    description: "Extract structured resume data",
    input_schema:{
        type:"object",
        properties:{
            text:{type:"string"}
        },
        required:["text"]
    }
}