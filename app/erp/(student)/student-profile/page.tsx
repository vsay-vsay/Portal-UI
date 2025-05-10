import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Edit2, GraduationCap, Mail, MapPin, Phone, User2, FileText } from "lucide-react"

export default function StudentProfilePage() {
  return (
    <div className="container space-y-6 p-4 md:p-8">
      <PageHeader title="My Profile" description="View and manage your personal information" />

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            <Avatar className="h-32 w-32">
              <AvatarImage src="/placeholder.svg?height=128&width=128" alt="@student" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2 text-center md:text-left">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">John Doe</h2>
                <p className="text-muted-foreground">Student ID: STU-2023-1234</p>
                <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                  <Badge variant="secondary">Grade 11</Badge>
                  <Badge variant="outline">Section A</Badge>
                  <Badge variant="outline">Science Stream</Badge>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 pt-2 md:flex-row md:items-start">
                <Button variant="outline" size="sm">
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="personal">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="academic">Academic Info</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                  <p className="font-semibold">John Robert Doe</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                  <p className="font-semibold">August 15, 2005</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Gender</p>
                  <p className="font-semibold">Male</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Blood Group</p>
                  <p className="font-semibold">O+</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 text-lg font-medium">Contact Information</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                      <p className="font-semibold">johndoe@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                      <p className="font-semibold">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Address</p>
                      <p className="font-semibold">123 Education St, Learning City, ST 12345</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 text-lg font-medium">Emergency Contact</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Contact Name</p>
                    <p className="font-semibold">Robert Doe (Father)</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Contact Number</p>
                    <p className="font-semibold">+1 (555) 987-6543</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Information
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>Your enrollment and academic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Student ID</p>
                  <p className="font-semibold">STU-2023-1234</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Enrollment Date</p>
                  <p className="font-semibold">September 1, 2021</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Grade/Class</p>
                  <p className="font-semibold">Grade 11 - Section A</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Stream</p>
                  <p className="font-semibold">Science</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 text-lg font-medium">Current Academic Details</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Current GPA</p>
                      <p className="font-semibold">3.7/4.0</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Academic Year</p>
                      <p className="font-semibold">2022-2023</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User2 className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Class Teacher</p>
                      <p className="font-semibold">Ms. Sarah Williams</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 text-lg font-medium">Extracurricular Activities</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">
                        2022-Present
                      </Badge>
                      <p className="font-medium">Science Club</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Member</p>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">
                        2021-Present
                      </Badge>
                      <p className="font-medium">School Basketball Team</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Team Captain</p>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">
                        2022-Present
                      </Badge>
                      <p className="font-medium">Debate Club</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Member</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Your official documents and certificates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between rounded-lg border p-4">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Birth Certificate</p>
                      <p className="text-sm text-muted-foreground">Uploaded on Sep 1, 2021</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
                <div className="flex justify-between rounded-lg border p-4">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Previous School Leaving Certificate</p>
                      <p className="text-sm text-muted-foreground">Uploaded on Sep 1, 2021</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
                <div className="flex justify-between rounded-lg border p-4">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Grade 10 Marksheet</p>
                      <p className="text-sm text-muted-foreground">Uploaded on Jun 15, 2022</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
                <div className="flex justify-between rounded-lg border p-4">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Medical Certificate</p>
                      <p className="text-sm text-muted-foreground">Uploaded on Sep 5, 2021</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Upload New Document</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Change Password</h3>
                <p className="text-sm text-muted-foreground">
                  For security reasons, you should change your password regularly.
                </p>
                <Button variant="outline">Change Password</Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Notification Preferences</h3>
                <p className="text-sm text-muted-foreground">Manage how you receive notifications from the system.</p>
                <Button variant="outline">Manage Notifications</Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Privacy Settings</h3>
                <p className="text-sm text-muted-foreground">Control what information is visible to others.</p>
                <Button variant="outline">Manage Privacy</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
