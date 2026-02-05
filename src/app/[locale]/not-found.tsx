import { Link } from '@/i18n/routing'

export default function NotFound() {
  return (
    <div className="container flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">Page not found</p>
      <Link href="/" className="text-sm text-primary hover:underline">
        Back to board
      </Link>
    </div>
  )
}
