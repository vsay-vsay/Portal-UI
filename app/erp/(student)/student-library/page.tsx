import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Search } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LibraryBookCard } from "@/components/student/resource/library-book-card"

export default function StudentLibraryPage() {
  return (
    <div className="container space-y-6 p-4 md:p-8">
      <PageHeader title="Library" description="Browse and manage your library resources" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search books, authors, or ISBN..." className="w-full pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="science">Science</SelectItem>
            <SelectItem value="math">Mathematics</SelectItem>
            <SelectItem value="literature">Literature</SelectItem>
            <SelectItem value="history">History</SelectItem>
            <SelectItem value="computer">Computer Science</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Formats</SelectItem>
            <SelectItem value="physical">Physical Books</SelectItem>
            <SelectItem value="ebook">E-Books</SelectItem>
            <SelectItem value="audiobook">Audiobooks</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="catalog">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="catalog">Catalog</TabsTrigger>
          <TabsTrigger value="borrowed">Borrowed</TabsTrigger>
          <TabsTrigger value="digital">Digital Library</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <LibraryBookCard
              id="book1"
              title="Introduction to Calculus"
              author="Dr. Alex Johnson"
              isbn="978-1234567890"
              category="Mathematics"
              status="available"
              format="physical"
              description="A comprehensive introduction to differential and integral calculus, covering limits, derivatives, and integrals with practical applications."
            />
            <LibraryBookCard
              id="book2"
              title="Physics: Principles and Applications"
              author="Prof. Sarah Williams"
              isbn="978-0987654321"
              category="Science"
              status="available"
              format="physical"
              description="An in-depth exploration of classical and modern physics principles, with detailed examples and problem-solving techniques."
            />
            <LibraryBookCard
              id="book3"
              title="Data Structures and Algorithms"
              author="Dr. Michael Chen"
              isbn="978-5678901234"
              category="Computer Science"
              status="available"
              format="ebook"
              description="A comprehensive guide to fundamental data structures and algorithms, with implementation examples in multiple programming languages."
              readUrl="#"
              downloadUrl="#"
            />
            <LibraryBookCard
              id="book4"
              title="To Kill a Mockingbird"
              author="Harper Lee"
              isbn="978-0061120084"
              category="Literature"
              status="available"
              format="physical"
              description="A classic novel exploring themes of racial injustice and moral growth in the American South during the 1930s."
            />
            <LibraryBookCard
              id="book5"
              title="A Brief History of Time"
              author="Stephen Hawking"
              isbn="978-0553380163"
              category="Science"
              status="available"
              format="audiobook"
              description="An exploration of cosmology, including the Big Bang, black holes, and the nature of time, written for non-specialists."
              readUrl="#"
              downloadUrl="#"
            />
            <LibraryBookCard
              id="book6"
              title="The Art of Computer Programming"
              author="Donald E. Knuth"
              isbn="978-0201896831"
              category="Computer Science"
              status="available"
              format="physical"
              description="A comprehensive monograph on computer programming and algorithms, considered one of the most influential works in the field."
            />
          </div>
        </TabsContent>

        <TabsContent value="borrowed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <LibraryBookCard
              id="book7"
              title="Organic Chemistry"
              author="Prof. Robert Wilson"
              isbn="978-1122334455"
              category="Science"
              status="borrowed"
              dueDate="Jun 25, 2023"
              format="physical"
              description="A comprehensive textbook covering the principles and applications of organic chemistry, with detailed reaction mechanisms and synthesis strategies."
            />
            <LibraryBookCard
              id="book8"
              title="World History: Modern Era"
              author="Dr. Emily Parker"
              isbn="978-6677889900"
              category="History"
              status="borrowed"
              dueDate="Jun 30, 2023"
              format="physical"
              description="An exploration of world history from the Renaissance to the present day, examining key events, movements, and cultural developments."
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Borrowing Summary</CardTitle>
              <CardDescription>Overview of your current borrowings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center">
                    <BookOpen className="mr-3 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Total Books Borrowed</p>
                      <p className="text-sm text-muted-foreground">Current active borrowings</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-lg">2</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center">
                    <Clock className="mr-3 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Upcoming Due Date</p>
                      <p className="text-sm text-muted-foreground">Return by this date to avoid late fees</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-sm">Jun 25, 2023</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Renew All Books</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="digital" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <LibraryBookCard
              id="ebook1"
              title="Introduction to Machine Learning"
              author="Dr. Alan Turing"
              isbn="978-1122334455"
              category="Computer Science"
              status="digital"
              format="ebook"
              description="A comprehensive introduction to machine learning concepts, algorithms, and applications, with practical examples and case studies."
              readUrl="#"
              downloadUrl="#"
            />
            <LibraryBookCard
              id="ebook2"
              title="Modern Poetry Anthology"
              author="Various Authors"
              isbn="978-6677889900"
              category="Literature"
              status="digital"
              format="ebook"
              description="A collection of contemporary poetry from diverse voices, exploring themes of identity, nature, and modern life."
              readUrl="#"
              downloadUrl="#"
            />
            <LibraryBookCard
              id="audiobook1"
              title="The Great Gatsby"
              author="F. Scott Fitzgerald"
              isbn="978-3344556677"
              category="Literature"
              status="digital"
              format="audiobook"
              description="A classic novel exploring themes of wealth, class, love, and the American Dream in the Roaring Twenties."
              readUrl="#"
              downloadUrl="#"
            />
            <LibraryBookCard
              id="audiobook2"
              title="A Brief History of Mathematics"
              author="Dr. Marcus du Sautoy"
              isbn="978-8899001122"
              category="Mathematics"
              status="digital"
              format="audiobook"
              description="An engaging exploration of the history and development of mathematical concepts and the people behind them."
              readUrl="#"
              downloadUrl="#"
            />
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Borrowing History</CardTitle>
              <CardDescription>Record of your past borrowings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50 transition-colors">
                      <th className="h-10 px-4 text-left font-medium">Book Title</th>
                      <th className="h-10 px-4 text-left font-medium">Borrowed Date</th>
                      <th className="h-10 px-4 text-left font-medium">Return Date</th>
                      <th className="h-10 px-4 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 font-medium">Introduction to Psychology</td>
                      <td className="p-4">Apr 10, 2023</td>
                      <td className="p-4">May 10, 2023</td>
                      <td className="p-4">
                        <Badge variant="default">Returned</Badge>
                      </td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 font-medium">Principles of Economics</td>
                      <td className="p-4">Mar 15, 2023</td>
                      <td className="p-4">Apr 15, 2023</td>
                      <td className="p-4">
                        <Badge variant="default">Returned</Badge>
                      </td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 font-medium">The Elements of Style</td>
                      <td className="p-4">Feb 20, 2023</td>
                      <td className="p-4">Mar 20, 2023</td>
                      <td className="p-4">
                        <Badge variant="default">Returned</Badge>
                      </td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 font-medium">Fundamentals of Biology</td>
                      <td className="p-4">Jan 5, 2023</td>
                      <td className="p-4">Feb 5, 2023</td>
                      <td className="p-4">
                        <Badge variant="default">Returned</Badge>
                      </td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 font-medium">Introduction to Algorithms</td>
                      <td className="p-4">Dec 10, 2022</td>
                      <td className="p-4">Jan 10, 2023</td>
                      <td className="p-4">
                        <Badge variant="destructive">Overdue</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
