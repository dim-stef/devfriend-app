import { useEffect, useRef } from "react";
import Prism from "prismjs";
import { SnippetProps } from "./types";
import styles from "../../../styles/Snippet.module.css";

function getPrismClass(language: string){
  if(language == 'javascript'){
    return 'language-javascript'
  }
}

function Snippet({ snippet }: SnippetProps) {
  const codeRef: any = useRef(null);

  useEffect(() => {
    if (codeRef.current && snippet.type == 'code') {
      Prism.highlightElement(codeRef.current)
    }
  }, [snippet])

  return (
    <div className={styles.snippetContainer}>
      {snippet.type == "code" && (
        <pre>
          <code ref={codeRef} className={getPrismClass(snippet.language)}>{snippet.body}</code>
        </pre>
      )}
      {snippet.type != "code" && <p>{snippet.body}</p>}
    </div>
  );
}

export default Snippet;
