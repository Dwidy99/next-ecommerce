"use client";

import * as React from "react";
import { PanelLeftIcon } from "lucide-react";
import { Slot } from "radix-ui";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SidebarContextValue = {
  open: boolean;
  openMobile: boolean;
  toggleSidebar: () => void;
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used inside SidebarProvider.");
  }

  return context;
}

function SidebarProvider({
  defaultOpen = true,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [openMobile, setOpenMobile] = React.useState(false);

  const toggleSidebar = React.useCallback(() => {
    if (window.innerWidth < 768) {
      setOpenMobile((value) => !value);
      return;
    }

    setOpen((value) => !value);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "b") {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  return (
    <SidebarContext.Provider
      value={{ open, openMobile, toggleSidebar, setOpenMobile }}
    >
      <div
        data-sidebar-state={open ? "expanded" : "collapsed"}
        className={cn("group/sidebar flex min-h-screen w-full bg-background", className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

function Sidebar({
  className,
  children,
  ...props
}: React.ComponentProps<"aside">) {
  const { open, openMobile, setOpenMobile } = useSidebar();

  return (
    <>
      <aside
        data-slot="sidebar"
        data-state={open ? "expanded" : "collapsed"}
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r bg-sidebar text-sidebar-foreground transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 md:transition-[width] md:duration-200",
          open ? "md:w-72" : "md:w-20",
          openMobile ? "translate-x-0" : "-translate-x-full",
          className,
        )}
        {...props}
      >
        {children}
      </aside>

      {openMobile && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setOpenMobile(false)}
        />
      )}
    </>
  );
}

function SidebarInset({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-inset"
      className={cn("flex min-w-0 flex-1 flex-col", className)}
      {...props}
    />
  );
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("rounded-xl", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon className="h-5 w-5 rtl:rotate-180" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn("flex h-16 shrink-0 items-center border-b px-4", className)}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn("flex flex-1 flex-col gap-3 overflow-y-auto px-3 py-4", className)}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn("shrink-0 border-t p-3", className)}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  );
}

function SidebarGroupLabel({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="sidebar-group-label"
      className={cn(
        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground transition hover:bg-muted hover:text-foreground group-data-[sidebar-state=collapsed]/sidebar:hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      className={cn("list-none", className)}
      {...props}
    />
  );
}

function SidebarMenuButton({
  className,
  isActive,
  asChild,
  ...props
}: React.ComponentProps<"a"> & {
  isActive?: boolean;
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot.Root : "a";

  return (
    <Comp
      data-slot="sidebar-menu-button"
      data-active={isActive}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition group-data-[sidebar-state=collapsed]/sidebar:justify-center group-data-[sidebar-state=collapsed]/sidebar:px-2",
        isActive
          ? "bg-[#110843] text-white shadow-sm"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      type="button"
      aria-label="Toggle sidebar rail"
      data-slot="sidebar-rail"
      className={cn(
        "absolute inset-y-0 -right-4 hidden w-4 after:absolute after:inset-y-0 after:left-1/2 after:w-px hover:after:bg-border md:flex",
        className,
      )}
      onClick={toggleSidebar}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
};
