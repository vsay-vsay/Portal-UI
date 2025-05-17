import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ResourceCard } from "@/components/resource-card"

export default function LearningMaterialsPage() {
  return (
    <div className="container space-y-6 p-4 md:p-8">
      <PageHeader 
        title="Learning Materials" 
        description="Access all your course materials and resources"
      />
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search materials..."
            className="w-full pl-8"
          />
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
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="links">Links & Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <ResourceCard
              id="resource1"
              title="Calculus Textbook PDF"
              subject="Advanced Mathematics"
              type="document"
              description="Complete textbook for Advanced Calculus with practice problems and solutions."
              size="15.2 MB"
              downloadable={true}
              url="#"
              isNew={true}
            />
            <ResourceCard
              id="resource2"
              title="Electromagnetic Fields Lecture"
              subject="Physics II: Electromagnetism"
              type="video"
              description="Video lecture covering Maxwell's equations and their applications."
              size="250 MB"
              downloadable={false}
              url="#"
            />
            <ResourceCard
              id="resource3"
              title="Data Structures Tutorial"
              subject="Introduction to Computer Science"
              type="link"
              description="External resource with interactive tutorials on common data structures."
              url="#"
            />
            <ResourceCard
              id="resource4"
              title="Literary Analysis Guide"
              subject="English Literature"
              type="document"
              description="Guide to analyzing literary works with examples and techniques."
              size="3.5 MB"
              downloadable={true}
              url="#"
            />
            <ResourceCard
              id="resource5"
              title="Cell Biology Videos"
              subject="Introduction to Biology"
              type="video"
              description="Series of videos explaining cellular structures and functions."
              size="450 MB"
              downloadable={false}
              url="#"
              isNew={true}
            />
            <ResourceCard
              id="resource6"
              title="Organic Chemistry Reactions"
              subject="Organic Chemistry"
              type="document"
              description="Comprehensive guide to organic chemistry reactions and mechanisms."
              size="8.7 MB"
              downloadable={true}
              url="#"
            />
            <ResourceCard
              id="resource7"
              title="Programming Practice Website"
              subject="Introduction to Computer Science"
              type="link"
              description="Interactive coding exercises and challenges to practice programming skills."
              url="#"
            />
            <ResourceCard
              id="resource8"
              title="Physics Formula Sheet"
              subject="Physics II: Electromagnetism"
              type="document"
              description="Comprehensive formula sheet for all topics covered in the course."
              size="1.2 MB"
              downloadable={true}
              url="#"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <ResourceCard
              id="resource1"
              title="Calculus Textbook PDF"
              subject="Advanced Mathematics"
              type="document"
              description="Complete textbook for Advanced Calculus with practice problems and solutions."
              size="15.2 MB"
              downloadable={true}
              url="#"
              isNew={true}
            />
            <ResourceCard
              id="resource4"
              title="Literary Analysis Guide"
              subject="English Literature"
              type="document"
              description="Guide to analyzing literary works with examples and techniques."
              size="3.5 MB"
              downloadable={true}
              url="#"
            />
            <ResourceCard
              id="resource6"
              title="Organic Chemistry Reactions"
              subject="Organic Chemistry"
              type="document"
              description="Comprehensive guide to organic chemistry reactions and mechanisms."
              size="8.7 MB"
              downloadable={true}
              url="#"
            />
            <ResourceCard
              id="resource8"
              title="Physics Formula Sheet"
              subject="Physics II: Electromagnetism"
              type="document"
              description="Comprehensive formula sheet for all topics covered in the course."
              size="1.2 MB"
              downloadable={true}
              url="#"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="videos" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <ResourceCard
              id="resource2"
              title="Electromagnetic Fields Lecture"
              subject="Physics II: Electromagnetism"
              type="video"
              description="Video lecture covering Maxwell's equations and their applications."
              size="250 MB"
              downloadable={false}
              url="#"
            />
            <ResourceCard
              id="resource5"
              title="Cell Biology Videos"
              subject="Introduction to Biology"
              type="video"
              description="Series of videos explaining cellular structures and functions."
              size="450 MB"
              downloadable={false}
              url="#"
              isNew={true}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="links" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <ResourceCard
              id="resource3"
              title="Data Structures Tutorial"
              subject="Introduction to Computer Science"
              type="link"
              description="External resource with interactive tutorials on common data structures."
              url="#"
            />
            <ResourceCard
              id="resource7"
              title="Programming Practice Website"
              subject="Introduction to Computer Science"
              type="link"
              description="Interactive coding exercises and challenges to practice programming skills."
              url="#"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
