import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DigitalResourceCard } from "@/components/student/resource/digital-resource-card"

export default function DigitalResourcesPage() {
  return (
    <div className="container space-y-6 p-4 md:p-8">
      <PageHeader title="Digital Resources" description="Access educational videos, documents, and interactive content" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search resources..." className="w-full pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            <SelectItem value="math">Mathematics</SelectItem>
            <SelectItem value="physics">Physics</SelectItem>
            <SelectItem value="cs">Computer Science</SelectItem>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="biology">Biology</SelectItem>
            <SelectItem value="chemistry">Chemistry</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
            <SelectItem value="interactive">Interactive</SelectItem>
            <SelectItem value="audio">Audio</SelectItem>
            <SelectItem value="course">Courses</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-5 md:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="interactive">Interactive</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <DigitalResourceCard
              id="resource1"
              title="Calculus: Derivatives and Integrals"
              type="video"
              subject="Mathematics"
              author="Dr. Alex Johnson"
              description="A comprehensive video lecture on differential and integral calculus with examples and applications."
              duration="1h 45m"
              fileSize="350 MB"
              downloadable={true}
              url="#"
              isNew={true}
            />
            <DigitalResourceCard
              id="resource2"
              title="Physics Lab: Electromagnetic Fields"
              type="video"
              subject="Physics"
              author="Prof. Sarah Williams"
              description="Video demonstration of electromagnetic field experiments with detailed explanations."
              duration="55m"
              fileSize="250 MB"
              downloadable={true}
              url="#"
            />
            <DigitalResourceCard
              id="resource3"
              title="Data Structures Tutorial"
              type="interactive"
              subject="Computer Science"
              author="Dr. Michael Chen"
              description="Interactive tutorial on common data structures with visualizations and coding exercises."
              duration="Self-paced"
              downloadable={false}
              url="#"
            />
            <DigitalResourceCard
              id="resource4"
              title="Literary Analysis Guide"
              type="document"
              subject="English Literature"
              author="Prof. Lisa Brown"
              description="Comprehensive guide to analyzing literary works with examples and techniques."
              fileSize="3.5 MB"
              downloadable={true}
              url="#"
            />
            <DigitalResourceCard
              id="resource5"
              title="Cell Biology Fundamentals"
              type="course"
              subject="Biology"
              author="Dr. Emily Parker"
              description="Complete course on cell biology covering structure, function, and cellular processes."
              duration="10 weeks"
              downloadable={false}
              url="#"
              isPremium={true}
            />
            <DigitalResourceCard
              id="resource6"
              title="Organic Chemistry Reactions"
              type="document"
              subject="Chemistry"
              author="Prof. Robert Wilson"
              description="Comprehensive guide to organic chemistry reactions and mechanisms."
              fileSize="8.7 MB"
              downloadable={true}
              url="#"
            />
            <DigitalResourceCard
              id="resource7"
              title="Programming in Python"
              type="course"
              subject="Computer Science"
              author="Dr. Michael Chen"
              description="Learn Python programming from basics to advanced concepts with hands-on projects."
              duration="8 weeks"
              downloadable={false}
              url="#"
              isNew={true}
            />
            <DigitalResourceCard
              id="resource8"
              title="Physics Formula Review"
              type="audio"
              subject="Physics"
              author="Prof. Sarah Williams"
              description="Audio review of key physics formulas and their applications for exam preparation."
              duration="45m"
              fileSize="30 MB"
              downloadable={true}
              url="#"
            />
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <DigitalResourceCard
              id="resource1"
              title="Calculus: Derivatives and Integrals"
              type="video"
              subject="Mathematics"
              author="Dr. Alex Johnson"
              description="A comprehensive video lecture on differential and integral calculus with examples and applications."
              duration="1h 45m"
              fileSize="350 MB"
              downloadable={true}
              url="#"
              isNew={true}
            />
            <DigitalResourceCard
              id="resource2"
              title="Physics Lab: Electromagnetic Fields"
              type="video"
              subject="Physics"
              author="Prof. Sarah Williams"
              description="Video demonstration of electromagnetic field experiments with detailed explanations."
              duration="55m"
              fileSize="250 MB"
              downloadable={true}
              url="#"
            />
            <DigitalResourceCard
              id="video3"
              title="Introduction to Algorithms"
              type="video"
              subject="Computer Science"
              author="Dr. Michael Chen"
              description="Video lecture covering fundamental algorithms and their complexity analysis."
              duration="1h 20m"
              fileSize="280 MB"
              downloadable={true}
              url="#"
            />
            <DigitalResourceCard
              id="video4"
              title="Shakespeare's Macbeth Analysis"
              type="video"
              subject="English Literature"
              author="Prof. Lisa Brown"
              description="In-depth analysis of themes, characters, and symbolism in Shakespeare's Macbeth."
              duration="1h 10m"
              fileSize="240 MB"
              downloadable={true}
              url="#"
            />
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <DigitalResourceCard
              id="resource4"
              title="Literary Analysis Guide"
              type="document"
              subject="English Literature"
              author="Prof. Lisa Brown"
              description="Comprehensive guide to analyzing literary works with examples and techniques."
              fileSize="3.5 MB"
              downloadable={true}
              url="#"
            />
            <DigitalResourceCard
              id="resource6"
              title="Organic Chemistry Reactions"
              type="document"
              subject="Chemistry"
              author="Prof. Robert Wilson"
              description="Comprehensive guide to organic chemistry reactions and mechanisms."
              fileSize="8.7 MB"
              downloadable={true}
              url="#"
            />
            <DigitalResourceCard
              id="doc3"
              title="Calculus Problem Set Solutions"
              type="document"
              subject="Mathematics"
              author="Dr. Alex Johnson"
              description="Complete solutions to the calculus problem sets with step-by-step explanations."
              fileSize="5.2 MB"
              downloadable={true}
              url="#"
            />
            <DigitalResourceCard
              id="doc4"
              title="Computer Science Research Paper"
              type="document"
              subject="Computer Science"
              author="Dr. Michael Chen"
              description="Research paper on recent advances in artificial intelligence and machine learning."
              fileSize="2.8 MB"
              downloadable={true}
              url="#"
              isNew={true}
            />
          </div>
        </TabsContent>

        <TabsContent value="interactive" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <DigitalResourceCard
              id="resource3"
              title="Data Structures Tutorial"
              type="interactive"
              subject="Computer Science"
              author="Dr. Michael Chen"
              description="Interactive tutorial on common data structures with visualizations and coding exercises."
              duration="Self-paced"
              downloadable={false}
              url="#"
            />
            <DigitalResourceCard
              id="int2"
              title="Physics Simulation Lab"
              type="interactive"
              subject="Physics"
              author="Prof. Sarah Williams"
              description="Interactive physics simulations allowing students to experiment with various physical phenomena."
              duration="Self-paced"
              downloadable={false}
              url="#"
            />
            <DigitalResourceCard
              id="int3"
              title="Virtual Chemistry Lab"
              type="interactive"
              subject="Chemistry"
              author="Prof. Robert Wilson"
              description="Virtual laboratory for conducting chemistry experiments safely and interactively."
              duration="Self-paced"
              downloadable={false}
              url="#"
              isNew={true}
            />
            <DigitalResourceCard
              id="int4"
              title="Interactive Calculus Visualizer"
              type="interactive"
              subject="Mathematics"
              author="Dr. Alex Johnson"
              description="Interactive tool for visualizing calculus concepts like limits, derivatives, and integrals."
              duration="Self-paced"
              downloadable={false}
              url="#"
            />
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <DigitalResourceCard
              id="resource5"
              title="Cell Biology Fundamentals"
              type="course"
              subject="Biology"
              author="Dr. Emily Parker"
              description="Complete course on cell biology covering structure, function, and cellular processes."
              duration="10 weeks"
              downloadable={false}
              url="#"
              isPremium={true}
            />
            <DigitalResourceCard
              id="resource7"
              title="Programming in Python"
              type="course"
              subject="Computer Science"
              author="Dr. Michael Chen"
              description="Learn Python programming from basics to advanced concepts with hands-on projects."
              duration="8 weeks"
              downloadable={false}
              url="#"
              isNew={true}
            />
            <DigitalResourceCard
              id="course3"
              title="Advanced Literary Theory"
              type="course"
              subject="English Literature"
              author="Prof. Lisa Brown"
              description="In-depth course on literary theory and critical approaches to analyzing literature."
              duration="12 weeks"
              downloadable={false}
              url="#"
              isPremium={true}
            />
            <DigitalResourceCard
              id="course4"
              title="Quantum Physics"
              type="course"
              subject="Physics"
              author="Prof. Sarah Williams"
              description="Comprehensive course on quantum mechanics and its applications in modern physics."
              duration="14 weeks"
              downloadable={false}
              url="#"
              isPremium={true}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
