"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Paperclip,
  Send,
  Smile,
  X,
  Image,
  FileText,
  Video,
  Music,
} from "lucide-react";
import { useState, useRef } from "react";

 function MessageComposer() {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);

  const fileInputRef = useRef(null);

  const emojis = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "🤣",
    "😂",
    "🙂",
    "🙃",
    "😉",
    "😊",
    "😇",
    "🥰",
    "😍",
    "🤩",
    "😘",
    "😗",
    "😚",
    "😙",
    "😋",
    "😛",
    "😜",
    "🤪",
    "😝",
    "🤑",
    "🤗",
    "🤭",
    "🤫",
    "🤔",
    "🤐",
    "🤨",
    "😐",
    "😑",
    "😶",
    "😏",
    "😒",
    "🙄",
    "😬",
    "🤥",
    "😔",
    "😕",
    "🙁",
    "☹️",
    "😣",
    "😖",
    "😫",
    "😩",
    "🥺",
    "😢",
    "😭",
    "😤",
    "😠",
    "😡",
    "🤬",
    "🤯",
    "😳",
    "🥵",
    "🥶",
    "😱",
    "😨",
    "😰",
    "😥",
    "😓",
    "🤗",
    "🤔",
    "🤭",
    "🤫",
    "🤥",
    "😶",
    "😐",
    "😑",
    "😬",
    "🙄",
    "😯",
    "😦",
    "😧",
    "😮",
    "😲",
    "🥱",
    "😴",
    "🤤",
    "😪",
    "😵",
    "🤐",
    "🥴",
    "🤢",
    "🤮",
    "🤧",
    "😷",
    "🤒",
    "🤕",
    "🤑",
    "🤠",
    "😈",
    "👿",
    "👹",
    "👺",
    "🤡",
    "💩",
    "👻",
    "💀",
    "☠️",
    "👽",
    "👾",
    "🤖",
    "🎃",
    "😺",
    "😸",
    "😹",
    "😻",
    "😼",
    "😽",
    "🙀",
    "😿",
    "😾",
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🤎",
    "🖤",
    "🤍",
    "💔",
    "❣️",
    "💕",
    "💞",
    "💓",
    "💗",
    "💖",
    "💘",
    "💝",
    "💟",
    "👍",
    "👎",
    "👌",
    "🤏",
    "✌️",
    "🤞",
    "🤟",
    "🤘",
    "🤙",
    "👈",
    "👉",
    "👆",
    "🖕",
    "👇",
    "☝️",
    "👋",
    "🤚",
    "🖐️",
    "✋",
    "🖖",
    "👏",
    "🙌",
    "🤝",
    "🙏",
    "✊",
    "👊",
    "🤛",
    "🤜",
    "💪",
    "🦾",
    "🦿",
    "🦵",
    "🦶",
    "👂",
    "🦻",
    "👃",
    "🧠",
    "🫀",
    "🫁",
    "🦷",
    "🦴",
    "👀",
    "👁️",
    "👅",
    "👄",
    "🔥",
    "💯",
    "💢",
    "💥",
    "💫",
    "💦",
    "💨",
    "🕳️",
    "💣",
    "💤",
  ];

  const handleSendMessage = async () => {
    if (!message.trim() && attachedFiles.length === 0) return;

    try {
      setSending(true);

      // Create message data
      const messageData = {
        text: message,
        files: attachedFiles,
        timestamp: new Date(),
      };

      // Log the message (in real app, this would be sent to API)
      console.log("Sending message:", messageData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success notification
      alert("Message sent successfully!");

      // Reset form
      setMessage("");
      setAttachedFiles([]);
      setShowEmojiPicker(false);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    }));

    setAttachedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (fileId:any) => {
    setAttachedFiles((prev) => {
      const updated = prev.filter((f) => f.id !== fileId);
      // Clean up URL
      const fileToRemove = prev.find((f) => f.id === fileId);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove?.url);
      }
      return updated;
    });
  };

  const addEmoji = (emoji:any) => {
    setMessage((prev) => prev + emoji);
  };

  const formatFileSize = (bytes:number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type:any) => {
    if (type.startsWith("image/")) return <Image className="h-4 w-4" />;
    if (type.startsWith("video/")) return <Video className="h-4 w-4" />;
    if (type.startsWith("audio/")) return <Music className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      {/* Attached Files Display */}
      {attachedFiles.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Attached Files:</h3>
          <div className="flex flex-wrap gap-2">
            {attachedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-2 bg-gray-100 rounded-lg p-2 text-sm"
              >
                {getFileIcon(file.type)}
                <span className="truncate max-w-32">{file.name}</span>
                <span className="text-xs text-gray-500">
                  ({formatFileSize(file.size)})
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeFile(file.id)}
                  className="h-5 w-5 p-0 hover:bg-red-100"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">Choose an emoji:</h3>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowEmojiPicker(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-10 gap-1 max-h-48 overflow-y-auto">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => addEmoji(emoji)}
                className="p-2 hover:bg-gray-200 rounded text-lg transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message Input Area */}
      <div className="space-y-2">
        <Textarea
        rows={3}
          placeholder="Type your message here..."
          className=" resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={handleFileAttach}
              className="shrink-0"
            >
              <Paperclip className="h-4 w-4" />
              <span className="sr-only">Attach file</span>
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.zip,.rar"
            />

            <Button
              size="icon"
              variant="outline"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="shrink-0"
            >
              <Smile className="h-4 w-4" />
              <span className="sr-only">Add emoji</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {message.length} characters
            </span>
            <Button
              onClick={handleSendMessage}
              disabled={
                (!message.trim() && attachedFiles.length === 0) || sending
              }
              className="px-6"
            >
              {sending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Send
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Message Preview
      {(message.trim() || attachedFiles.length > 0) && (
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Message Preview:
          </h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            {attachedFiles.length > 0 && (
              <div className="mb-2">
                <div className="flex flex-wrap gap-1">
                  {attachedFiles?.map((file) => (
                    <span
                      key={file?.id}
                      className="text-xs bg-blue-100 px-2 py-1 rounded"
                    >
                      📎 {file?.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {message.trim() && (
              <p className="text-sm text-gray-800 whitespace-pre-wrap">
                {message}
              </p>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
}
export default MessageComposer;