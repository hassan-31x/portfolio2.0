import { Dock, DockIcon } from "@/components/custom/dock";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utilities/ui";
import { HomeIcon, NotebookIcon } from "lucide-react";
import Link from "next/link";
import { IconBrandGithub, IconBrandLinkedin, IconBrandX, IconMail } from "@tabler/icons-react";

const contact = {
  email: "hello@example.com",
  tel: "+123456789",
  social: {
    GitHub: {
      name: "GitHub",
      url: "https://github.com/hassan-31x",
      icon: <IconBrandGithub className="size-5" />,
      navbar: true,
    },
    LinkedIn: {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/mhassan31x",
      icon: <IconBrandLinkedin className="size-5" />,

      navbar: true,
    },
    X: {
      name: "X",
      url: "https://x.com/hassan_dev31",
      icon: <IconBrandX className="size-5" />,

      navbar: true,
    },
    email: {
      name: "Send Email",
      url: "mailto:mohammadhassanrizwan@gmail.com",
      icon: <IconMail className="size-5" />,

      navbar: true,
    },
  },
}

export default function Footer() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14 bg-transparent">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      <TooltipProvider>
        <Dock className="bg-white dark:bg-neutral-900 z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
          {[
            { href: "/", icon: HomeIcon, label: "Home" },
            { href: "/blog", icon: NotebookIcon, label: "Blog" },
          ].map((item) => (
            <DockIcon key={item.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12"
                    )}
                  >
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-white dark:bg-black">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full text-neutral-500" />
          {Object.entries(contact.social)
            .filter(([_, social]) => social.navbar)
            .map(([name, social]) => (
              <DockIcon key={name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={social.url}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12"
                      )}
                    >
                      {social.icon}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
          {/* <Separator orientation="vertical" className="h-full py-2 bg-neutral-500" />
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent>
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon> */}
        </Dock>
      </TooltipProvider>
    </div>
  );
}