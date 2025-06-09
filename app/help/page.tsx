"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Search, MessageCircle, Book, Video, Mail, Phone, ExternalLink, ChevronRight } from "lucide-react"
import { MainNav }  from "@/components/common/main-nav"
import { Footer } from "@/components/common/footer"
import { useRouter } from "next/navigation"

export default function HelpPage() {
    const router = useRouter();
  const faqData = [
    {
      question: "How do I enroll in a course?",
      answer:
        "To enroll in a course, simply browse our course catalog, click on the course you're interested in, and click the 'Enroll Now' button. You'll need to create an account and complete the payment process.",
    },
    {
      question: "Can I get a refund for a course?",
      answer:
        "Yes, we offer a 30-day money-back guarantee for all courses. If you're not satisfied with your purchase, you can request a full refund within 30 days of enrollment.",
    },
    {
      question: "How long do I have access to a course?",
      answer:
        "Once you enroll in a course, you have lifetime access to all course materials, including any future updates or additions to the content.",
    },
    {
      question: "Do I get a certificate after completing a course?",
      answer:
        "Yes, you'll receive a certificate of completion for each course you finish. Certificates can be downloaded and shared on professional networks like LinkedIn.",
    },
    {
      question: "Can I download course videos for offline viewing?",
      answer:
        "Yes, our mobile app allows you to download course videos for offline viewing. This feature is available for iOS and Android devices.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "Click on the 'Forgot Password' link on the login page, enter your email address, and we'll send you instructions to reset your password.",
    },
  ]

  const supportCategories = [
    {
      title: "Getting Started",
      description: "Learn the basics of using our platform",
      icon: Book,
      articles: 12,
    },
    {
      title: "Course Access",
      description: "Issues with accessing your courses",
      icon: Video,
      articles: 8,
    },
    {
      title: "Billing & Payments",
      description: "Questions about payments and refunds",
      icon: MessageCircle,
      articles: 15,
    },
    {
      title: "Technical Issues",
      description: "Troubleshooting technical problems",
      icon: Search,
      articles: 10,
    },
  ]

  return (
    <div> 
        <MainNav/>
         <div className="container mx-auto p-6 space-y-8">
            <button 
            className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 border border-purple-800"
            onClick={()=> router.back()}>Go Back</button>
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">How can we help you?</h1>
        <p className="text-muted-foreground text-lg">
          Find answers to common questions or get in touch with our support team
        </p>

        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search for help..." className="pl-10" />
        </div>
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="status">Status</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {supportCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center space-y-4">
                    <Icon className="h-8 w-8 mx-auto text-primary" />
                    <div>
                      <h3 className="font-semibold">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                    <Badge variant="secondary">{category.articles} articles</Badge>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Learn how to make the most of your learning experience</p>
                <div className="space-y-2">
                  <Link href="#" className="flex items-center justify-between p-2 hover:bg-muted rounded">
                    <span>Creating your account</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link href="#" className="flex items-center justify-between p-2 hover:bg-muted rounded">
                    <span>Enrolling in your first course</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link href="#" className="flex items-center justify-between p-2 hover:bg-muted rounded">
                    <span>Navigating the course player</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link href="#" className="flex items-center justify-between p-2 hover:bg-muted rounded">
                    <span>Downloading the mobile app</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Instructor Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Everything you need to know about teaching on our platform</p>
                <div className="space-y-2">
                  <Link href="#" className="flex items-center justify-between p-2 hover:bg-muted rounded">
                    <span>Creating your first course</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link href="#" className="flex items-center justify-between p-2 hover:bg-muted rounded">
                    <span>Recording quality videos</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link href="#" className="flex items-center justify-between p-2 hover:bg-muted rounded">
                    <span>Engaging with students</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link href="#" className="flex items-center justify-between p-2 hover:bg-muted rounded">
                    <span>Understanding analytics</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What can we help you with?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Describe your issue or question..." rows={5} />
                </div>
                <Button className="w-full">Send Message</Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">Email Support</h3>
                      <p className="text-sm text-muted-foreground">support@learningplatform.com</p>
                      <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">Live Chat</h3>
                      <p className="text-sm text-muted-foreground">Available 9 AM - 6 PM EST</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Start Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">Phone Support</h3>
                      <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                      <p className="text-xs text-muted-foreground">Monday - Friday, 9 AM - 6 PM EST</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="status" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                All Systems Operational
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Video Streaming</span>
                  </div>
                  <Badge variant="secondary">Operational</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Course Enrollment</span>
                  </div>
                  <Badge variant="secondary">Operational</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Payment Processing</span>
                  </div>
                  <Badge variant="secondary">Operational</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Mobile App</span>
                  </div>
                  <Badge variant="secondary">Operational</Badge>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="outline" asChild>
                  <Link href="#">
                    View Status Page
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>

        <Footer/>
    </div>
     )
}
