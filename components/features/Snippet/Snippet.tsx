import React, { useEffect, useRef } from "react";
import ReactEmbedGist from 'react-embed-gist';
import { Text } from "@chakra-ui/layout";
import Prism from "prismjs";
import { SnippetProps } from "./types";
import styles from "../../../styles/Snippet.module.css";

function getPrismClass(language: string){
  if(language == 'javascript' || language == 'js'){
    return 'language-javascript'
  }
}

function Snippet({ snippet }: SnippetProps) {
  const codeRef: any = useRef(null);

  function getGistData(gist: string){
    let gist_id = gist.replace('https://gist.github.com/', '')
    let file = '';
    // remove trailing slash
    if(gist_id.endsWith('/')){
      gist_id = gist_id.substring(0, gist_id.length - 1);
    }

    if(gist_id.includes('#')){
      // extract file from gist if it exists
      file = gist_id.substring(gist_id.indexOf('#') + 1);

      // then remove the file from the id
      gist_id = gist_id.replace(file, '')

      // also remove the traling hash
      gist_id = gist_id.substring(0, gist_id.length - 1);
    }
    return {
      id: gist_id,
      file: file,
    };
  }

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
      {snippet.type == "gist" && <ReactEmbedGist gist={getGistData(snippet.body).id}/>}
      {snippet.type != "code" && snippet.type != 'gist' && snippet.type != 'link' && <Text>{snippet.body}</Text>}
    </div>
  );
}

export default Snippet;
