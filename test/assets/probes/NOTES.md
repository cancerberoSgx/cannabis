<!-- Backup sg: 

TODO: remove this

An AST is just a Tree-like structure that can be represented with a JSON, 
XML, DOM, document and any tree can be queried not just ASTs. The following equivalences can be assumed: 

 * *"type"* is analog to one JSON property name, HTML tagName, nodeType, or even 'class' attribute. In general
 * *"attributes"* is analog to XML attributes its a Map-like structure to store named values with any name. Supported value types depend on the implementation. The key in general is a string. 
 * *children, as *type*, is one named-convened property that let's insert, remove, order, other *children* nodes. The type is Array-like.  
 * *parent* or *parentNode*  is one named-convened property that  references the parent node (the one that has the node among its children.). In general the relationchip children parent is N-1 . Often, implementations doesn't support this reference by default so it must be simulated / implemented by the DOM adapter (see below). For example a JSON object, by default doesn't have a reference to its parent objects (otherwhise it would create a cycle and stop being JSON objet.  In contrary, HTML DOM Nodes have a parentNode propery pointing to the node's parent.
Query Language -->