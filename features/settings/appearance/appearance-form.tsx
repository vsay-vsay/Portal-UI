"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { fonts } from "@/config/fonts"
import { cn } from "@/lib/utils"
import { showSubmittedData } from "@/utils/show-submitted-data"
import { useFont } from "@/context/font-context"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useTheme } from "next-themes"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

// Enhanced theme options
const themeOptions = [
  {
    value: "light",
    label: "Light",
    accentColor: "#0ea5e9", // sky blue
    bgColor: "#ffffff",
    secondaryBgColor: "#f1f5f9",
    textColor: "#0f172a",
  },
  {
    value: "dark",
    label: "Dark",
    accentColor: "#6366f1", // indigo
    bgColor: "#0f172a",
    secondaryBgColor: "#1e293b",
    textColor: "#f8fafc",
  },
  // {
  //   value: "system",
  //   label: "System",
  //   accentColor: "#8b5cf6", // violet
  //   bgColor: "#f8fafc",
  //   secondaryBgColor: "#e2e8f0",
  //   textColor: "#0f172a",
  // },
  // {
  //   value: "nord",
  //   label: "Nord",
  //   accentColor: "#88c0d0",
  //   bgColor: "#2e3440",
  //   secondaryBgColor: "#3b4252",
  //   textColor: "#eceff4",
  // },
  // {
  //   value: "dracula",
  //   label: "Dracula",
  //   accentColor: "#bd93f9",
  //   bgColor: "#282a36",
  //   secondaryBgColor: "#44475a",
  //   textColor: "#f8f8f2",
  // },
  // {
  //   value: "solarized",
  //   label: "Solarized",
  //   accentColor: "#268bd2",
  //   bgColor: "#fdf6e3",
  //   secondaryBgColor: "#eee8d5",
  //   textColor: "#657b83",
  // },
  // {
  //   value: "rose-pine",
  //   label: "Rose Pine",
  //   accentColor: "#ea9a97",
  //   bgColor: "#191724",
  //   secondaryBgColor: "#1f1d2e",
  //   textColor: "#e0def4",
  // },
  // {
  //   value: "catppuccin",
  //   label: "Catppuccin",
  //   accentColor: "#f5c2e7",
  //   bgColor: "#1e1e2e",
  //   secondaryBgColor: "#313244",
  //   textColor: "#cdd6f4",
  // },
]

const appearanceFormSchema = z.object({
  theme: z.string({
    required_error: "Please select a theme.",
  }),
  font: z.enum(fonts, {
    invalid_type_error: "Select a font",
    required_error: "Please select a font.",
  }),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

export function AppearanceForm() {
  const { font, setFont } = useFont()
  const { theme, setTheme, themes } = useTheme()

  // This can come from your database or API.
  const defaultValues: Partial<AppearanceFormValues> = {
    theme: theme || "light",
    font,
  }

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  })

  function onSubmit(data: AppearanceFormValues) {
    if (data.font !== font) setFont(data.font)
    if (data.theme !== theme) setTheme(data.theme)

    showSubmittedData(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
       

        <FormField
              control={form.control}
              name="font"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium">Font</FormLabel>
                  <FormDescription>Set the font you want to use in the dashboard.</FormDescription>
                  <div className="relative  max-w-xs">
                    <FormControl>
                      <select
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          " appearance-none font-normal capitalize pr-8",
                        )}
                        {...field}
                      >
                        {fonts.map((font) => (
                          <option key={font} value={font}>
                            {font}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    {/* <ChevronDownIcon className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 opacity-50" /> */}
                  </div>
                  <div className="mt-4 p-4 rounded-lg border border-muted">
                    <p className={`text-xl mb-2 font-${field.value}`}>The quick brown fox jumps over the lazy dog.</p>
                    <p className={`text-sm text-muted-foreground font-${field.value}`}>
                      This is how your selected font will appear throughout the dashboard.
                    </p>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
       
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-lg font-medium">Choose your theme</FormLabel>
                  <FormDescription>Select a theme that matches your style and improves readability.</FormDescription>
                  <FormMessage />

                  <ScrollArea className="h-[420px] pr-4 pb-4">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2"
                    >
                      {themeOptions.map((themeOption) => (
                        <FormItem key={themeOption.value}>
                          <FormLabel className="cursor-pointer [&:has([data-state=checked])>div]:ring-2 [&:has([data-state=checked])>div]:ring-primary">
                            <FormControl>
                              <RadioGroupItem value={themeOption.value} className="sr-only" />
                            </FormControl>
                            <div className="overflow-hidden rounded-lg border-2 border-muted hover:border-accent transition-all duration-200">
                              {/* Theme preview */}
                              <div
                                className="p-2 h-36"
                                style={{ backgroundColor: themeOption.bgColor, color: themeOption.textColor }}
                              >
                                <div className="flex justify-between items-center mb-3">
                                  <div className="flex space-x-1">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                  </div>
                                  {field.value === themeOption.value && (
                                    <CheckIcon className="h-5 w-5" style={{ color: themeOption.accentColor }} />
                                  )}
                                </div>

                                <div
                                  className="rounded-md p-2 mb-2"
                                  style={{ backgroundColor: themeOption.secondaryBgColor }}
                                >
                                  <div
                                    className="h-2 w-16 rounded-md mb-1"
                                    style={{ backgroundColor: themeOption.textColor, opacity: 0.6 }}
                                  ></div>
                                  <div
                                    className="h-2 w-24 rounded-md"
                                    style={{ backgroundColor: themeOption.textColor, opacity: 0.6 }}
                                  ></div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-6 h-6 rounded-md flex items-center justify-center"
                                    style={{ backgroundColor: themeOption.accentColor }}
                                  >
                                    <div
                                      className="w-3 h-3 rounded-sm"
                                      style={{ backgroundColor: themeOption.bgColor }}
                                    ></div>
                                  </div>
                                  <div
                                    className="h-2 w-20 rounded-md"
                                    style={{ backgroundColor: themeOption.textColor, opacity: 0.6 }}
                                  ></div>
                                </div>
                              </div>

                              {/* Theme name */}
                              <div
                                className="p-2 text-center font-medium border-t border-muted"
                                style={{ backgroundColor: themeOption.bgColor, color: themeOption.textColor }}
                              >
                                {themeOption.label}
                              </div>
                            </div>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </ScrollArea>
                </FormItem>
              )}
            />
          

          
        <Button type="submit" className=" sm:w-auto">
          Update preferences
        </Button>
      </form>
    </Form>
  )
}
