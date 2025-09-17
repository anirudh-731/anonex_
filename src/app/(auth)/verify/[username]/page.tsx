'use client'
import { verifySchema } from '@/app/schemas/verifySchema'
import { ApiResponse } from '@/app/types/ApiResponse'
import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const VerifyAccount = () => {

    const router = useRouter()
    const params = useParams<{username: string}>()
    const {toast} = useToast()

     //zod implementation
      const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        },
    )

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
            try {
              const response = await axios.post(`http://localhost:3000/api/verify-code`, {
                    username: params.username,
                    code: data.code
                })

                toast({
                    title: "Success",
                    description: response.data.message
                })

                router.replace('sign-in')
            } catch (error) {
                 console.error('Error during sign-up:', error);
                      const axiosError = error as AxiosError<ApiResponse>;
                      // Default error message
                
                      toast({
                        title: 'Sign Up Failed',
                        description: axiosError.response?.data.message,
                        variant: 'destructive',
                      });
            }
    }
    
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'> 
            <div className='text-center'>
                <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>
                    Verify your account
                </h1>
                <p className='mb-4'>Enter the verification code sent to your email</p>
            </div>
             <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <Input placeholder='code'{...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Verify</Button>
          </form>
        </Form>
        </div>
    </div>
  )
}

export default VerifyAccount
