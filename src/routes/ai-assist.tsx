import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ai-assist')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/ai-assist"!</div>
}
