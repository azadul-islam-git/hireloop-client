function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 py-14 sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-105 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(99,102,241,0.14),transparent)]"
      />
      {children}
    </div>
  )
}

export default AuthLayout
