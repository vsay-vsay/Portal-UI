"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  FileText,
  Clock,
  BookOpen,
  Users,
  Edit,
  Save,
  Upload,
  Lock,
  Bell,
  Shield,
  Download,
  Plus,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function TeacherProfile() {
  const [isEditing, setIsEditing] = useState(false)

  const teacherData = {
    id: "T12345",
    name: "John Doe",
    email: "john.doe@school.edu",
    phone: "+1 (555) 123-4567",
    address: "123 Education St, Academic City, AC 12345",
    dateOfBirth: "1985-06-15",
    gender: "Male",
    joinDate: "2018-08-01",
    department: "Science Department",
    designation: "Senior Mathematics Teacher",
    qualification: "M.Sc. Mathematics, B.Ed.",
    specialization: "Advanced Calculus, Algebra",
    experience: "12 years",
    subjects: ["Mathematics", "Physics"],
    classes: ["Class 10A", "Class 11B", "Class 12C", "Class 9D"],
    bio: "Dedicated mathematics teacher with over 12 years of experience in secondary education. Passionate about making complex mathematical concepts accessible and engaging for students of all abilities.",
    achievements: [
      "Teacher of the Year Award (2023)",
      "Mathematics Olympiad Coach - National Finalists (2022)",
      "Published author of 'Making Mathematics Fun' textbook series",
      "Certified Advanced Mathematics Instructor",
    ],
    certifications: [
      { name: "Advanced Mathematics Teaching Certification", issuer: "National Board of Education", year: "2020" },
      { name: "Digital Learning Specialist", issuer: "EdTech Institute", year: "2021" },
      { name: "STEM Education Excellence", issuer: "Science Teachers Association", year: "2019" },
    ],
    schedule: [
      { day: "Monday", periods: ["Class 10A (08:30-09:30)", "Class 11B (10:00-11:00)", "Class 9D (01:30-02:30)"] },
      { day: "Tuesday", periods: ["Class 12C (09:30-10:30)", "Class 9D (11:00-12:00)"] },
      {
        day: "Wednesday",
        periods: ["Class 10A (08:30-09:30)", "Class 11B (10:00-11:00)", "Department Meeting (02:00-03:00)"],
      },
      { day: "Thursday", periods: ["Class 12C (09:30-10:30)", "Class 9D (11:00-12:00)"] },
      { day: "Friday", periods: ["Class 10A (08:30-09:30)", "Class 11B (10:00-11:00)", "Class 12C (01:30-02:30)"] },
    ],
    documents: [
      { name: "Teaching Certificate", type: "PDF", size: "2.4 MB", date: "Aug 15, 2018" },
      { name: "Academic Transcripts", type: "PDF", size: "3.1 MB", date: "Aug 15, 2018" },
      { name: "ID Proof", type: "JPG", size: "1.2 MB", date: "Aug 15, 2018" },
      { name: "Experience Certificates", type: "PDF", size: "4.5 MB", date: "Aug 15, 2018" },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">View and manage your personal information</p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsEditing(false)}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your personal and contact details</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Teacher" />
                <AvatarFallback className="text-4xl">JD</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full bg-background">
                  <Upload className="h-4 w-4" />
                </Button>
              )}
            </div>
            <h3 className="text-xl font-bold">{teacherData.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{teacherData.designation}</p>
            <Badge variant="outline">{teacherData.department}</Badge>

            <Separator className="my-4" />

            <div className="w-full space-y-3 text-left">
              <div className="flex items-start">
                <User className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Employee ID</p>
                  <p className="text-sm font-medium">{teacherData.id}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Email</p>
                  {isEditing ? (
                    <Input defaultValue={teacherData.email} className="h-8 mt-1" />
                  ) : (
                    <p className="text-sm font-medium">{teacherData.email}</p>
                  )}
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  {isEditing ? (
                    <Input defaultValue={teacherData.phone} className="h-8 mt-1" />
                  ) : (
                    <p className="text-sm font-medium">{teacherData.phone}</p>
                  )}
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Address</p>
                  {isEditing ? (
                    <Textarea defaultValue={teacherData.address} className="min-h-20 mt-1" />
                  ) : (
                    <p className="text-sm font-medium">{teacherData.address}</p>
                  )}
                </div>
              </div>
              <div className="flex items-start">
                <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Date of Birth</p>
                  {isEditing ? (
                    <Input type="date" defaultValue={teacherData.dateOfBirth} className="h-8 mt-1" />
                  ) : (
                    <p className="text-sm font-medium">{new Date(teacherData.dateOfBirth).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
              <div className="flex items-start">
                <User className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Gender</p>
                  {isEditing ? (
                    <Select defaultValue={teacherData.gender.toLowerCase()}>
                      <SelectTrigger className="h-8 mt-1">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm font-medium">{teacherData.gender}</p>
                  )}
                </div>
              </div>
              <div className="flex items-start">
                <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Join Date</p>
                  <p className="text-sm font-medium">{new Date(teacherData.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2 border-t pt-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Account Security</span>
              </div>
              <Button variant="ghost" size="sm">
                Manage
              </Button>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Notification Settings</span>
              </div>
              <Button variant="ghost" size="sm">
                Manage
              </Button>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Privacy Settings</span>
              </div>
              <Button variant="ghost" size="sm">
                Manage
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className="md:col-span-5 space-y-6">
          <Tabs defaultValue="professional" className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="professional" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Information</CardTitle>
                  <CardDescription>Your qualifications and teaching details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Qualification</Label>
                      {isEditing ? (
                        <Input defaultValue={teacherData.qualification} />
                      ) : (
                        <p className="text-sm">{teacherData.qualification}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Specialization</Label>
                      {isEditing ? (
                        <Input defaultValue={teacherData.specialization} />
                      ) : (
                        <p className="text-sm">{teacherData.specialization}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Experience</Label>
                      {isEditing ? (
                        <Input defaultValue={teacherData.experience} />
                      ) : (
                        <p className="text-sm">{teacherData.experience}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Department</Label>
                      {isEditing ? (
                        <Select defaultValue={teacherData.department}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Science Department">Science Department</SelectItem>
                            <SelectItem value="Mathematics Department">Mathematics Department</SelectItem>
                            <SelectItem value="Language Department">Language Department</SelectItem>
                            <SelectItem value="Arts Department">Arts Department</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="text-sm">{teacherData.department}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Bio</Label>
                    {isEditing ? (
                      <Textarea defaultValue={teacherData.bio} className="min-h-32" />
                    ) : (
                      <p className="text-sm">{teacherData.bio}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Subjects</Label>
                      <div className="flex flex-wrap gap-2">
                        {teacherData.subjects.map((subject, index) => (
                          <Badge key={index} variant="secondary">
                            <BookOpen className="mr-1 h-3 w-3" />
                            {subject}
                          </Badge>
                        ))}
                        {isEditing && (
                          <Button variant="outline" size="sm" className="h-6">
                            <Plus className="h-3 w-3 mr-1" />
                            Add
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Classes</Label>
                      <div className="flex flex-wrap gap-2">
                        {teacherData.classes.map((classItem, index) => (
                          <Badge key={index} variant="secondary">
                            <Users className="mr-1 h-3 w-3" />
                            {classItem}
                          </Badge>
                        ))}
                        {isEditing && (
                          <Button variant="outline" size="sm" className="h-6">
                            <Plus className="h-3 w-3 mr-1" />
                            Add
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Achievements & Certifications</CardTitle>
                  <CardDescription>Your professional accomplishments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Achievements</Label>
                    <div className="space-y-2">
                      {teacherData.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start">
                          <Award className="h-5 w-5 mr-2 text-primary shrink-0" />
                          {isEditing ? <Input defaultValue={achievement} /> : <p className="text-sm">{achievement}</p>}
                        </div>
                      ))}
                      {isEditing && (
                        <Button variant="outline" size="sm" className="mt-2">
                          <Plus className="h-4 w-4 mr-1" />
                          Add Achievement
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Certifications</Label>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Certification</TableHead>
                            <TableHead>Issuing Organization</TableHead>
                            <TableHead>Year</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {teacherData.certifications.map((cert, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{cert.name}</TableCell>
                              <TableCell>{cert.issuer}</TableCell>
                              <TableCell>{cert.year}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    {isEditing && (
                      <Button variant="outline" size="sm" className="mt-2">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Certification
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Schedule</CardTitle>
                  <CardDescription>Your teaching timetable for the current term</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Day</TableHead>
                          <TableHead>Periods</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {teacherData.schedule.map((day, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{day.day}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-2">
                                {day.periods.map((period, i) => (
                                  <Badge key={i} variant="outline" className="flex items-center">
                                    <Clock className="mr-1 h-3 w-3" />
                                    {period}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Full Calendar
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>Your uploaded documents and certificates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Document Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Upload Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {teacherData.documents.map((doc, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                                {doc.name}
                              </div>
                            </TableCell>
                            <TableCell>{doc.type}</TableCell>
                            <TableCell>{doc.size}</TableCell>
                            <TableCell>{doc.date}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New Document
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications for important updates
                        </p>
                      </div>
                      <Switch checked={true} />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive SMS alerts for urgent matters</p>
                      </div>
                      <Switch checked={false} />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch checked={true} />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Profile Visibility</Label>
                        <p className="text-sm text-muted-foreground">Control who can view your profile information</p>
                      </div>
                      <Select defaultValue="staff">
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="staff">Staff Only</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button>Save Settings</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Password & Security</CardTitle>
                  <CardDescription>Manage your account security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Change Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
