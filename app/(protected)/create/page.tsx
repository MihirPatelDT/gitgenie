"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import React from "react"
import { useForm } from "react-hook-form"

type FormInput = {
  repoUrl: string
  projectName: string
  githubToken?: string
}

const CreatePage = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>()

  // function onSubmitForm(data: FormInput) {
  //   console.log(data)
  //   return true
  // }

  async function onSubmitForm(data: FormInput) {
    const { projectName, repoUrl, githubToken } = data
    const result = await fetch("/api/submit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectName: projectName,
        repoUrl: repoUrl,
        githubToken: githubToken,
      }),
    })
    // console.log(data)
    // return true
    console.log(result)
  }
  return (
    <div className="flex items-center gap-12 h-full justify-center">
      <Image
        src="/create-logo.jpg"
        alt="create-logo"
        width={250}
        height={250}
        className="rounded-full"
      />
      <div>
        <div>
          <h1 className="font-semibold text-2xl ">
            Link your Github Repository
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the URL of your repository to link it to GitGenie
          </p>
        </div>
        <div className="h-4"></div>
        <div>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <Input
              placeholder="ProjectName"
              {...register("projectName", { required: true })}
            />
            <div className="h-2"></div>
            <Input
              placeholder="Github URL"
              type="url"
              {...register("repoUrl", { required: true })}
            />
            <div className="h-2"></div>
            <Input
              placeholder="Github Token(Optional)"
              {...register("githubToken")}
            />
            <div className="h-4"></div>
            <Button type="submit">
              Check Credits <ArrowRight />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
