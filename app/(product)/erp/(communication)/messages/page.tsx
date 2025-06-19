
import { MessageComposer } from "@/components/erp/communication/messages/message-composer"
import { MessageDetail } from "@/components/erp/communication/messages/message-detail"
import { MessageList } from "@/components/erp/communication/messages/message-list"
import { Card } from "@/components/ui/card"

import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";




export const metadata: Metadata = generatePageMetadata({
  title: 'Messages',
  description: 'Manage your messages, announcements, and communications within the ERP system.',
  keywords: ['ERP', 'Messages', 'Communication', 'Announcements', 'Messaging'],
  baseTitle: 'ERP System',
})


export default function MessagesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
        <Card className="md:col-span-3 h-full overflow-hidden flex flex-col">
          <MessageList />
        </Card>
        <Card className="md:col-span-9 h-full overflow-hidden flex flex-col">
          <MessageDetail />
          <MessageComposer />
        </Card>
      </div>
    </div>
  )
}
