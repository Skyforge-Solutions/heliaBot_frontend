'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Check, CreditCard } from 'lucide-react'

export default function SubscriptionPage() {
  const { resolvedTheme } = useTheme()
  const [currentPlan, setCurrentPlan] = useState('free')
  
  const handleUpgrade = (plan: string) => {
    // In a real app, this would redirect to a payment processor
    toast.success(`Upgrading to ${plan} plan. This would redirect to payment in a real app.`)
    setCurrentPlan(plan)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
              <CreditCard className="h-full w-full p-4 text-gray-400" />
            </div>
            <div>
              <CardTitle className="text-2xl">Subscription Management</CardTitle>
              <CardDescription>
                Manage your subscription plan and billing information
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 p-6">
          {/* Current Plan */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Current Plan</h3>
            <Card className="border-2 border-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-semibold capitalize">
                      {currentPlan} Plan
                      {currentPlan !== 'free' && (
                        <Badge className="ml-2" style={{ backgroundColor: '#10b981', color: 'white' }}>Active</Badge>
                      )}
                    </h4>
                    <p className="text-muted-foreground mt-1">
                      {currentPlan === 'free' ? 'Basic features with limited usage' : 
                       currentPlan === 'pro' ? 'Advanced features with higher limits' : 
                       'All features with unlimited usage'}
                    </p>
                  </div>
                  {currentPlan !== 'free' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        toast.success('Subscription canceled. Changes will take effect at the end of the billing period.')
                        setCurrentPlan('free')
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Available Plans */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Available Plans</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {/* Pro Plan */}
              <Card className={currentPlan === 'pro' ? 'border-2 border-primary' : ''}>
                <CardHeader>
                  <CardTitle>Pro Plan</CardTitle>
                  <CardDescription>For power users who need more features</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">$9.99<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>Advanced AI models</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>Faster response times</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    disabled={currentPlan === 'pro'}
                    onClick={() => handleUpgrade('pro')}
                  >
                    {currentPlan === 'pro' ? 'Current Plan' : 'Upgrade to Pro'}
                  </Button>
                </CardFooter>
              </Card>

              {/* Premium Plan */}
              <Card className={currentPlan === 'premium' ? 'border-2 border-primary' : ''}>
                <CardHeader>
                  <CardTitle>Premium Plan</CardTitle>
                  <CardDescription>For professionals who need the best</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">$19.99<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>All Pro features</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>Unlimited usage</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>Dedicated support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>Custom integrations</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    disabled={currentPlan === 'premium'}
                    onClick={() => handleUpgrade('premium')}
                  >
                    {currentPlan === 'premium' ? 'Current Plan' : 'Upgrade to Premium'}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <Separator />

          {/* Billing Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Billing Information</h3>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  {currentPlan === 'free' 
                    ? 'No billing information available for the free plan.' 
                    : 'Your next billing date is April 5, 2025.'}
                </p>
                {currentPlan !== 'free' && (
                  <Button variant="outline" className="mt-4">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Update Payment Method
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
