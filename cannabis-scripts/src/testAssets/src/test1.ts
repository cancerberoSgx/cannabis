interface I{
  m():void
}

interface J extends I {
  prop: Date[]
}

interface G extends J {
  children(): I[]
}