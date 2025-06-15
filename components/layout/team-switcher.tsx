import * as React from 'react'
import { ChevronsUpDown, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
} from 'lucide-react'
import { useAuth } from '@/context/auth-context'

interface Team {
  name: string
  logo: React.ElementType
  plan: string
  productKey: string
}

// Product configuration mapping
const PRODUCT_CONFIG: Record<string, Team> = {
  erp: {
    name: "VSAY ERP",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
    productKey: "erp",
  },
  lms: {
    name: "VSAY LMS",
    logo: AudioWaveform,
    plan: "Startup",
    productKey: "lms",
  },
  inventory: {
    name: "VSAY Inventory",
    logo: Command,
    plan: "Free",
    productKey: "inventory",
  },
}

export function TeamSwitcher() {
  const { user, currentProduct, setCurrentProduct } = useAuth()
  const { isMobile } = useSidebar()
  const router = useRouter()

  console.log("use", user?.product)

  // Get available teams based on user's products
  const availableTeams = React.useMemo(() => {
    if (!user?.product) return []
    
    return user.product
      .map(productKey => PRODUCT_CONFIG[productKey])
      .filter(Boolean) // Remove any undefined products
  }, [user?.product])

  // Get current active team based on currentProduct
  const activeTeam = React.useMemo(() => {
    return PRODUCT_CONFIG[currentProduct] || availableTeams[0]
  }, [currentProduct, availableTeams])

  // Handle team/product switching
  const handleTeamSwitch = React.useCallback((team: Team) => {
    if (!user) return

    // Update current product in context and localStorage
    setCurrentProduct(team.productKey)
    
    // Redirect user based on role and new product
    const redirectUser = (role: string, product: string) => {
      if (role === "SuperAdmin") {
        router.replace("/domain")
        return
      }
      const basePath = `/${product}/${role.toLowerCase()}-dashboard`
      router.replace(basePath)
    }

    redirectUser(user.role, team.productKey)
  }, [user, setCurrentProduct, router])

  // Don't render if no user or no available teams
  if (!user || availableTeams.length === 0) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                <activeTeam.logo className='size-4' />
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {activeTeam.name}
                </span>
                <span className='truncate text-xs'>{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-muted-foreground text-xs'>
              Products
            </DropdownMenuLabel>
            {availableTeams.map((team, index) => (
              <DropdownMenuItem
                key={team.productKey}
                onClick={() => handleTeamSwitch(team)}
                className={`gap-2 p-2 ${
                  currentProduct === team.productKey ? 'bg-accent' : ''
                }`}
              >
                <div className='flex size-6 items-center justify-center rounded-sm border'>
                  <team.logo className='size-4 shrink-0' />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className='gap-2 p-2 opacity-50 cursor-not-allowed'
              disabled
            >
              <div className='bg-background flex size-6 items-center justify-center rounded-md border'>
                <Plus className='size-4' />
              </div>
              <div className='text-muted-foreground font-medium'>
                Request Access
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}