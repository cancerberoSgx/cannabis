interface I {
  /**
   * @param m Non Lorem tempor culpa dolor ipsum cupidatat magna elit quis ea ut officia Lorem Lorem. 
   */
  m(a: Date): void
}

interface J extends I {
  /**
   * Velit ipsum dolor sit deserunt laborum tempor eu amet ipsum ullamco laborum.
   */
  prop: Date[]
}

interface G extends J {
  /**
   * @returns children foo bar lorem.
   */
  children(): I[]
}