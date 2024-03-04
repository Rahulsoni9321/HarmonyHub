const zod=require ("zod");

let signupschema=zod.object({
    email:zod.string().email({message:"Please enter valid email"}),
    firstname:zod.string(),
    lastname:zod.string(),
    gender:zod.string(),
    password:zod.string().min(8,{message:"password should be greater than 7 characters"}).max(16,{message:"password should be less than 17 characters"})
})

const signinschema=zod.object({
    email:zod.string().email(),
    password:zod.string().min(8,{message:"password should be greater than 7 characters"}).max(16,{message:"password should be less than 17 characters"})
})
module.exports={
    signupschema,
    signinschema
}