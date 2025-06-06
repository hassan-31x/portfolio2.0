export type ProjectTypes = {
  title: string;
  src: string;
  href: string;
  description: string;
  stack: string[];
}[]

export const projects: ProjectTypes = [
  {
    title: 'E-commerce Platform',
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=800',
    href: 'https://example.com/ecommerce',
    description: 'A platform for buying and selling products online',
    stack: ['React', 'Node.js', 'MongoDB'],
  },
  {
    title: 'Task Management App',
    src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&h=800',
    href: 'https://example.com/taskmanager',
    description: 'A platform for managing tasks and projects',
    stack: ['React', 'Node.js', 'MongoDB'],
  },
  {
    title: 'Social Media Dashboard',
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=800',
    href: 'https://example.com/dashboard',
    description: 'A platform for managing social media accounts',
    stack: ['React', 'Node.js', 'MongoDB'],
  },
  {
    title: 'Weather Forecast App',
    src: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=1200&h=800',
    href: 'https://example.com/weather',
    description: 'A platform for getting the weather forecast',
    stack: ['React', 'Node.js', 'MongoDB'],
  }
]