"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Heart,
  MessageCircle,
  Share,
  Pin,
  Calendar,
  Users,
  Paperclip,
  ChevronDown,
  ChevronUp,
  Download,
  Loader2,
  MoreVertical,
  Edit,
  Trash2,
  PinOff,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import useRequestHook from "@/hooks/requestHook";
import api from "@/utils/api";
import { toast } from "sonner";

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  timestamp: Date;
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  targetAudience: string[];
  attachments?: {
    id: string;
    name: string;
    type: string;
  }[];
  reactions: {
    likes: number;
    comments: number;
  };
  isPinned?: boolean;
  expiryDate?: Date;
}

interface AnnouncementCardProps {
  announcement: Announcement;
  isAdmin?: boolean;
  onRefresh: () => void;
}

export function AnnouncementCard({
  announcement,
  isAdmin = false,
  onRefresh,
}: AnnouncementCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isPinning, setIsPinning] = useState(false);

  const [currentLikes, setCurrentLikes] = useState(
    announcement.reactions.likes
  );
  const [LikesFn, res, isLiking, error, reset, status] = useRequestHook(
    api.ANNOUNCEMENTS.REACTION(announcement.id),
    "POST",
    null
  );
  const [DeleteFn, resD, isDeleting, errorDel, resetDel, statusDel] =
    useRequestHook(api.ANNOUNCEMENTS.ALL, "DELETE", null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "destructive";
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getPriorityBorderColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "border-l-red-500";
      case "high":
        return "border-l-orange-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  const handleLike = async () => {
    if (isLiking) return;

    const wasLiked = isLiked;
    const increment = wasLiked ? -1 : 1;

    await LikesFn({
      type: "likes",
      increment,
    });

    if (status === 200 && res) {
      setIsLiked(!wasLiked);
      setCurrentLikes((prev) => prev + increment);

      setCurrentLikes(res.data.likes);
    }
    // Optimistic update
  };

  const handleEdit = () => {};

  const handleDeleteConfirm = async () => {
    if (isDeleting) return;
    await DeleteFn(null, announcement.id);
    if (statusDel && resD) {
      toast(resD.data, {});
    }
  };

  const handlePinToggle = async () => {};

  const shouldTruncate = announcement?.content?.length > 200;
  const displayContent =
    shouldTruncate && !isExpanded
      ? `${announcement?.content.substring(0, 200)}...`
      : announcement?.content;



      useEffect(()=>{
        if(res || resD){
          onRefresh()
        }

      },[res, resD])
  return (
    <>
      <Card
        className={`relative ${getPriorityBorderColor(
          announcement?.priority
        )} border-l-4 ${
          announcement?.isPinned ? "ring-2 ring-primary/20" : ""
        }`}
      >
        {announcement?.isPinned && (
          <div className="absolute top-2 right-2">
            <Pin className="h-4 w-4 text-primary" />
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={announcement?.author?.avatar || "/placeholder.svg"}
                  alt={announcement?.author?.name}
                />
                <AvatarFallback>
                  {announcement?.author?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-lg">
                    {announcement?.title}
                  </h3>
                  <Badge
                    variant={getPriorityColor(announcement?.priority)}
                    className="text-xs"
                  >
                    {announcement?.priority?.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {announcement?.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-medium">
                    {announcement?.author?.name}
                  </span>
                  <span>•</span>
                  <span>{announcement?.author?.role}</span>
                  <span>•</span>
                  <span>
                    {announcement?.timestamp &&
                      formatDistanceToNow(announcement?.timestamp, {
                        addSuffix: true,
                      })}
                  </span>
                </div>
              </div>
            </div>

            {isAdmin && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleEdit}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handlePinToggle}
                    disabled={isPinning}
                  >
                    {isPinning ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : announcement.isPinned ? (
                      <PinOff className="mr-2 h-4 w-4" />
                    ) : (
                      <Pin className="mr-2 h-4 w-4" />
                    )}
                    {announcement.isPinned ? "Unpin" : "Pin"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {displayContent}
            </p>
            {shouldTruncate && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 p-0 h-auto font-normal text-primary hover:text-primary/80"
              >
                {isExpanded ? (
                  <>
                    Show less <ChevronUp className="ml-1 h-3 w-3" />
                  </>
                ) : (
                  <>
                    Show more <ChevronDown className="ml-1 h-3 w-3" />
                  </>
                )}
              </Button>
            )}
          </div>

          {announcement?.attachments &&
            announcement?.attachments?.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-1">
                  <Paperclip className="h-3 w-3" />
                  Attachments
                </h4>
                <div className="grid gap-2">
                  {announcement?.attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center justify-between p-2 bg-muted rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-primary/10 rounded flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">
                            {attachment?.type}
                          </span>
                        </div>
                        <span className="text-sm font-medium">
                          {attachment?.name}
                        </span>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{announcement?.targetAudience?.join(", ")}</span>
            </div>
            {announcement.expiryDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>
                  Expires{" "}
                  {formatDistanceToNow(announcement?.expiryDate, {
                    addSuffix: true,
                  })}
                </span>
              </div>
            )}
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                disabled={isLiking}
                className={`gap-1 ${
                  isLiked ? "text-red-500 hover:text-red-600" : ""
                }`}
              >
                {isLiking ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Heart
                    className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`}
                  />
                )}
                {currentLikes}
              </Button>
              <Button variant="ghost" size="sm" className="gap-1">
                <MessageCircle className="h-4 w-4" />
                {announcement?.reactions?.comments}
              </Button>
            </div>
            {/* <Button variant="ghost" size="sm">
              <Share className="h-4 w-4" />
            </Button> */}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Announcement</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{announcement?.title}"? This
              action cannot be undone and will permanently remove the
              announcement and all its reactions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
