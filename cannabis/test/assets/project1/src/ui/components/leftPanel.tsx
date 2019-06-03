
interface ASTNode {}
interface StepTraceEvent<T> {
  event: string
}
class Tracer {
  private events: StepTraceEvent<ASTNode>[] = []
  private onFinish?: (events: StepTraceEvent<ASTNode>[]) => void
  constructor(options: { onFinish: (events: StepTraceEvent<ASTNode>[]) => void }) {
    this.onFinish = options.onFinish && options.onFinish.bind(this)
    this.trace = this.trace.bind(this)
  }
  trace(e: StepTraceEvent<ASTNode>) {
    this.events.push(e)
    if (e.event === 'finishSearch') {
      this.onFinish && this.onFinish(this.events)
    }
  }
}
const tracer = new Tracer({
  onFinish: events => {
    const finishSearch = events.find(e => e.event === 'finishSearch')!
    // t.truthy(finishSearch!.totalSearchTime! > 0)
    const finishCompile = events.find(e => e.event === 'finishCompile')!
    // t.truthy(typeof finishCompile!.totalCompileTime === 'number')
    // t.notThrows(() => JSON.parse((finishCompile!.queryAst! as any)))
    events.filter(e => e.event === 'endStep').forEach(e => {
      // t.truthy(isASTNode(e.node))
      // t.truthy(e.timestamp >= 0)
    })
    // t.end()
  }
})