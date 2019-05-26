### By Example

At its simplest form, a query looks like a POSIX filesystem path:

    Foo/Bar/Quux

This means: query and return all nodes of type `Quux`, which in turn
are childs of nodes of type `Bar`, which in turn are childs of nodes of
type `Foo`, which in turn has to be the start node.

A little bit more sophisticated query, showing more features,
like axis, filter and optional whitespaces for padding:

    // Foo [ /Bar [ @bar == 'baz1' || @bar == 'baz2' ] && /Quux ]

This means: query and return all nodes anywhere under the start node
which are of type `Foo` and which have both childs of type `Bar` -- and
with an attribute `bar` of values `baz1` or `baz2` -- and childs of type
`Quux`.

### By Grammar

In general, a query consists of one or more individual query paths,
separated by comma. A path consists of a mandatory initial query step
and optionally zero or more subsequent query steps.

The difference between initial and subsequent query steps is that an
initial query step does not need an axis while all subsequent query
steps require it. A query step consists of an (optional) AST node search
axis, a (mandatory) AST node type match, an (optional) result marker "!"
and an (optional) AST node filter expression:

    query            ::= path (, path)*
    path             ::= step-initial step-subsequent*
    step-initial     ::= axis? match result? filter?
    step-subsequent  ::= axis  match result? filter?

The search axis can be either...

- `/`    for direct child nodes, or
- `//`   for any descendant nodes, or
- `./`   for current node plus direct child nodes, or
- `.//`  for current node plus any descendant nodes, or
- `-/`   for direct left sibling node, or
- `-//`  for any left sibling nodes, or
- `+/`   for direct right sibling node, or
- `+//`  for any right sibling nodes, or
- `~/`   for direct left and right sibling nodes, or
- `~//`  for all left and right sibling nodes, or
- `../`  for direct parent node, or
- `..//` for any parent nodes, or
- `<//`  for any preceding nodes, or
- `>//`  for any following nodes.

As an illustrating example: given an AST of the following particular nodes, ...

          A
          |
      +-+-+-+-+
     / /  |  \ \
    B  C  D  E  F
          |
       +--+--+
      /   |   \
     G    H    I
          |
        +-+-+
       /     \
      J       K

...the following queries and their result exist:

Start Node | Query    | Result Node(s)
-----------|----------|---------------------------------
`D`        | `/    *` | `G, H, I`
`D`        | `//   *` | `G, H, J, K, I`
`D`        | `./   *` | `D, G, H, I`
`D`        | `.//  *` | `D, G, H, J, K, I`
`D`        | `-/   *` | `C`
`D`        | `-//  *` | `C, B`
`D`        | `+/   *` | `E`
`D`        | `+//  *` | `E, F`
`D`        | `~/   *` | `C, E`
`D`        | `~//  *` | `B, C, E, F`
`H`        | `../  *` | `D`
`H`        | `..// *` | `D, A`
`H`        | `<//  *` | `G, D, C B A`
`H`        | `>//  *` | `J, K, I, E, F`

A search axis usually walks along the references between nodes (at least
in case of ASTy based AST). But in case the underlying AST and its
adapter uses typed references, you can optionally constrain the search
axis to take only references matching the type `id` into account.

    axis               ::= axis-direction axis-type?
    axis-direction     ::= axis-child
                         | axis-sibling-left
                         | axis-sibling-right
                         | axis-sibling
                         | axis-parent
                         | axis-preceding
                         | axis-following
    axis-child         ::= ("/" | "//" | "./" | ".//")
    axis-sibling-left  ::= ("-/" | "-//")
    axis-sibling-right ::= ("+/" | "+//")
    axis-sibling       ::= ("~/" | "~//")
    axis-parent        ::= ("../" | "..//")
    axis-preceding     ::= "<//"
    axis-following     ::= ">//"
    axis-type          ::= ":" (id | string)
    result             ::= "!"
    match              ::= id | string | "*"
    filter             ::= "[" expr "]"

The real power comes through the optional filter expression: it can be
applied to each query step and it recursively(!) can contain sub-queries
with the help of embedded query paths!
An illustrating combined example is:

    // Foo / Bar [ / Baz [ @bar == 'baz' ] && / Quux ], // Foo2
    +---------------------------------------------------------+  query
    +------------------------------------------------+  +-----+  path
                   +---------------------+    +-----+            path
    +----+ +-----------------------------------------+  +-----+  step
    ++     +       +                          +         ++       axis
       +-+   +-+     +-+                        +--+       +--+  match
                 +-----------------------------------+           filter
                   +-------------------------------+             expr
                         +---------------+                       filter
                           +----------+                          expr

The result of a query is always all nodes which match against the last
query step of any path (in case of no result marker on any step in the
path) or all nodes of matched steps with a result marker. The queries in
filter expressions just lead to a boolean decision for the filter, but
never cause any resulting nodes theirself.

An expression can be either a ternary/binary conditional expression,
logical expression, bitwise expression, relational expression,
arithmethical expression, functional call, attribute reference, query
parameter, literal value, parenthesis expression or path of a sub-query.

    expr             ::= conditional
                       | logical
                       | bitwise
                       | relational
                       | arithmentical
                       | function-call
                       | attribute-ref
                       | query-parameter
                       | literal
                       | parenthesis
                       | sub-query
    conditional      ::= expr "?" expr ":" expr
                       | expr "?:" expr
    logical          ::= expr ("&&" | "||") expr
                       | "!" expr
    bitwise          ::= expr ("&" | "|" | "<<" | ">>") expr
                       | "~" expr
    relational       ::= expr ("==" | "!=" | "<=" | ">=" | "<" | ">" | "=~" | "!~") expr
    arithmethical    ::= expr ("+" | "-" | "*" | "/" | "%" | "**") expr
    function-call    ::= id "(" (expr ("," expr)*)? ")"
    attribute-ref    ::= "@" (id | string)
    query-parameter  ::= "{" id "}"
    id               ::= /[a-zA-Z_][a-zA-Z0-9_-]*/
    literal          ::= string | regexp | number | value
    string           ::= /"(\\"|.)*"/ | /'(\\'|.)*'/
    regexp           ::= /`(\\`|.)*`/
    number           ::= /\d+(\.\d+)?$/
    value            ::= "true" | "false" | "null" | "NaN" | "undefined"
    parenthesis      ::= "(" expr ")"
    sub-query        ::= path           // <-- ESSENTIAL RECURSION !!

Notice that the function call parameters can be full expressions theirself,
including (through the recursion over `sub-query` above) full query paths.
The available pre-defined standard functions are:

- `type(): String`:<br/>
  Return type of current node.
  Example: `type() == "foo"`

- `attrs(sep: String): String`:<br/>
  Return the `sep`-separated concatenation of all attribute names of
  current node. The `sep` string is alway also prepended and appended
  for easier comparison of the result string.
  Example: `attr(",") == ",foo,bar,"`

- `depth(): Number`:<br/>
  Return depth in AST of current node (counting from 1 for the root node).
  Example: `depth() <= 3`

- `pos(): Number`:<br/>
  Return position of current node among sibling (counting from 1 for the first sibling).
  Example: `pos() == 2`

- `nth(pos: Number): Boolean`:<br/>
  Check whether position of current node among sibling is `pos` (counting from 1 for
  the first sibling). Negative values for `pos` count from the last sibling backward,
  i.e., `-1` is the last sibling.
  Example: `nth(3)`

- `first(): Boolean`:<br/>
  Shorthand for `nth(1)`.

- `last(): Boolean`:<br/>
  Shorthand for `nth(-1)`.

- `count(array: Object[]): Number`:<br/>
  Return the number of elements in `array`.
  The `array` usually is either an externally passed-in parameter or a sub-query.
  Example: `count({nodes}) <= count(// *)`

- `below(node: Node): Boolean`:<br/>
  Checks whether current node is somewhere below `node`, i.e.,
  whether current node is a child or descendant of `node`. Usually,
  this makes sense only if `node` is an externally passed-in parameter.
  Example: `below({node})`.

- `follows(node: Node): Boolean`:<br/>
  Checks whether current node is following `node`, i.e.,
  whether current node comes after `node` in a standard
  depth-first tree visit (where parents are visited before childs).
  Usually, this makes sense only if `node` is an externally passed-in parameter.
  Example: `follows({node})`.

- `in(nodes: Node[]): Number`:<br/>
  Checks whether current node is in `nodes`.
  Usually, `nodes` is either an externally passed-in parameter or a sub-query.
  Example: `in({nodes})`.

- `substr(str: String, pos: Number, len: Number): String`:<br/>
  Returns the sub-string of `str`, starting at `pos` with length `len`.
  Negative values for `pos` count from the end of the string,
  i.e., `-1` is the last character.
  Example: `substr(@foo, 0, 1) == "A"`

- `index(str: String, sub: String, pos: Number): Number`:<br/>
  Returns the index position of sub-string `sub` in string `str`, starting at `pos`.
  Example: `indexof(@foo, "bar", 0) >= 0`

- `trim(str: String): String`:<br/>
  Returns the string `str` with whitespaces removed from begin and end.
  Example: `trim(@foo) == "bar"`

- `lc(str: String): String`:<br/>
  Returns the lower-case variant of `str`.
  Example: `lc(@foo) == "bar"`

- `uc(str: String): String`:<br/>
  Returns the upper-case variant of `str`.
  Example: `uc(@foo) == "BAR"`

Application Programming Interface (API)
---------------------------------------

The ASTq API, here assumed to be exposed through the variable `ASTQ`,
provides the following methods (in a notation somewhat resembling
TypeScript type definitions):

### ASTQ API

- `new ASTQ(): ASTQ`:<br/>
  Create a new ASTQ instance.

- `ASTQ#adapter(adapter: (ASTQAdapter | ASTQAdapter[]), force: Boolean): ASTQ`:<br/>
  Register one or more custom tree access adapter(s) to support arbitrary AST-style
  data structures. The `ASTQAdapter` has to conform to a particular
  duck-typed interface. See below for more information.
  By default ASTq has built-in adapters for ASTy, XML DOM, Parse5, Cheerio, JSON and Mozilla AST.
  All those "taste" the node passed to `ASTQ#query` and hence are auto-selected.
  Calling `adapter()` causes these to be replaced with a single custom adapter.
  Its "tasting" can be disabled with option `force` set to `true`.
  The `ASTQ#adapter` teturns the API itself.

        /*  the built-in implementation for supporting ASTy  */
        astq.adapter({
            taste:            function (node)       { return (typeof node === "object" && node.ASTy) },
            getParentNode:    function (node, type) { return node.parent()  },
            getChildNodes:    function (node, type) { return node.childs()  },
            getNodeType:      function (node)       { return node.type()    },
            getNodeAttrNames: function (node)       { return node.attrs()   },
            getNodeAttrValue: function (node, attr) { return node.get(attr) }
        })

- `ASTQ#version(): { major: Number, minor: Number, micro: Number, date: Number }`:<br/>
  Return the current ASTq library version details.

- `ASTQ#func(name: String, func: (adapter: Adapter, node: Object, [...]) => Any): ASTQ`:<br/>
  Register function named `name` by providing the callback `func` which has
  to return an arbitrary value and optionally can access the current `node` with
  the help of the selected `adapter`. Returns the API itself.

        /*  the built-in implementation for "depth"  */
        astq.func("depth", function (adapter, node) => {
            var depth = 1
            while ((node = adapter.getParentNode(node)) !== null)
                depth++
            return depth
        })

- `ASTQ#cache(num: Number): ASTQ`:<br/>
  Set the upper limit for the internal query cache to `num`, i.e.,
  up to `num` ASTs of parsed queries will be cached. Set `num` to
  `0` to disable the cache at all. Returns the API itself.

- `ASTQ#compile(selector: String, trace?: Boolean): ASTQQuery {
  Compile `selector` DSL into an internal query object for subsequent
  processing by `ASTQ#execute`.
  If `trace` is `true` the compiling is dumped to the console.
  Returns the query object.

- `ASTQ#execute(node: Object, query: ASTQQuery, params?: Object, trace?: Boolean): Object[]`:<br/>
  Execute the previously compiled `query` (see `compile` above) at `node`.
  The optional `params` object can provide parameters for the `{name}` query constructs.
  If `trace` is `true` the execution is dumped to the console.
  Returns an array of zero or more matching AST nodes.

- `ASTQ#query(node: Object, selector: String, params?: Object, trace?: Boolean): Object[]`: <br/>
  Just the convenient combination of `compile` and `execute`:
  `execute(node, compile(selector, trace), params, trace)`.
  Use this as the standard query method except you need more control.
  The optional `params` object can provide parameters for the `{name}` query constructs.
  If `trace` is `true` the compiling and execution is dumped to the console.
  Returns an array of zero or more matching AST nodes.
