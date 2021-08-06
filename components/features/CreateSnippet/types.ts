import React, { Dispatch, SetStateAction } from 'react';
import { UseQueryResult } from "react-query";

export interface LanguageListInterface { 
  selectedItem: string;
  setSelectedItem: Dispatch<SetStateAction<any>>
}

export interface CreateSnippetQueryInterface {
  type: string;
  language: string;
  body: string;
}