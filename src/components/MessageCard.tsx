'use client'
import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const MessageCard = () => {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
        </CardContent>
        <CardFooter>
            <p>Card Footer</p>
        </CardFooter>
    </Card>
  )
}

export default MessageCard
