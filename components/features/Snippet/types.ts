export interface SnippetInterface { 
  id: string;
  type: string;
  language: string;
  body: string;
  created: Date;
}

export interface SnippetNodeInterface { 
  node: SnippetInterface
}

export interface SnippetProps{
  snippet: SnippetInterface;
}

