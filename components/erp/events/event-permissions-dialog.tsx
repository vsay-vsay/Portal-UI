"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const userRoles = [
  "Admin",
  "Teachers",
  "Students",
  "Parents",
  "Event Coordinator",
  "Academic Coordinator",
  "Sports Coordinator",
  "HR Manager",
]

const permissionDescriptions = {
  view: "Can see the event details and information",
  register: "Can register for the event",
  edit: "Can modify event details and settings",
  delete: "Can delete the event",
  manage: "Can manage all aspects of the event including attendees",
}

interface EventPermissionsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  event?: any
  onPermissionsUpdated: (permissions: any) => void
}

export function EventPermissionsDialog({
  open,
  onOpenChange,
  event,
  onPermissionsUpdated,
}: EventPermissionsDialogProps) {
  const [permissions, setPermissions] = useState({
    view: [] as string[],
    register: [] as string[],
    edit: [] as string[],
    delete: [] as string[],
    manage: [] as string[],
  })

  const [visibility, setVisibility] = useState<string[]>([])

  useEffect(() => {
    if (event) {
      setPermissions(
        event.permissions || {
          view: [],
          register: [],
          edit: [],
          delete: [],
          manage: [],
        },
      )
      setVisibility(event.visibility || [])
    }
  }, [event])

  const handlePermissionChange = (permission: string, role: string, checked: boolean) => {
    setPermissions((prev) => ({
      ...prev,
      [permission]: checked
        ? [...prev[permission as keyof typeof prev], role]
        : prev[permission as keyof typeof prev].filter((r) => r !== role),
    }))
  }

  const handleVisibilityChange = (role: string, checked: boolean) => {
    setVisibility((prev) => (checked ? [...prev, role] : prev.filter((r) => r !== role)))
  }

  const handleSave = () => {
    onPermissionsUpdated({ permissions, visibility })
    onOpenChange(false)
  }

  const getPermissionCount = (permission: string) => {
    return permissions[permission as keyof typeof permissions].length
  }

  const hasPermission = (permission: string, role: string) => {
    return permissions[permission as keyof typeof permissions].includes(role)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Event Permissions</DialogTitle>
          <DialogDescription>Configure who can see and interact with "{event?.title}"</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="visibility" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="visibility">Visibility Settings</TabsTrigger>
            <TabsTrigger value="permissions">Action Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="visibility" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Event Visibility</CardTitle>
                <CardDescription>
                  Control which user roles can see this event in their calendars and event lists
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {userRoles.map((role) => (
                    <div key={role} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={`visibility-${role}`}
                          checked={visibility.includes(role)}
                          onCheckedChange={(checked) => handleVisibilityChange(role, checked as boolean)}
                        />
                        <Label htmlFor={`visibility-${role}`} className="font-medium">
                          {role}
                        </Label>
                      </div>
                      {visibility.includes(role) && <Badge variant="secondary">Visible</Badge>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4">
            <div className="grid gap-4">
              {Object.entries(permissions).map(([permission, roles]) => (
                <Card key={permission}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="capitalize flex items-center gap-2">
                          {permission} Permission
                          <Badge variant="outline">{getPermissionCount(permission)} roles</Badge>
                        </CardTitle>
                        <CardDescription>
                          {permissionDescriptions[permission as keyof typeof permissionDescriptions]}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {userRoles.map((role) => (
                        <div key={role} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id={`${permission}-${role}`}
                              checked={hasPermission(permission, role)}
                              onCheckedChange={(checked) =>
                                handlePermissionChange(permission, role, checked as boolean)
                              }
                            />
                            <Label htmlFor={`${permission}-${role}`} className="font-medium">
                              {role}
                            </Label>
                          </div>
                          {hasPermission(permission, role) && <Badge variant="secondary">Allowed</Badge>}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Permissions</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
