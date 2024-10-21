import z, { TypeOf } from "zod"

export const signUpInput = z.object({
    name : z.string().optional(),
    email : z.string().email(),
    password : z.string().min(6)

});

// type inference in zod 
export type signUpInput = z.infer<typeof signUpInput>

export const signInInput = z.object({
    email : z.string().optional(),
    password : z.string().min(6)
})

// type inference in zod

export type signInInput = z.infer<typeof signInInput>


export const createBlogInput = z.object({
    title:z.string(),
    content:z.string()  
})

export type createBlogInput = z.infer<typeof createBlogInput>

export const updateBlogInput = z.object({
    title:z.string(),
    content:z.string(),
    id:z.string()
});

export type updateBlogInput = z.infer<typeof updateBlogInput>