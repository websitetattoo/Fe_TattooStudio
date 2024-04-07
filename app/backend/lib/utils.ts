import { ContentState, convertFromHTML } from "draft-js";

export function convertHTMLToEditor(htmlContent: string): ContentState {
  const blocksFromHTML = convertFromHTML(htmlContent);
  const contentState = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  );
  return contentState;
}
