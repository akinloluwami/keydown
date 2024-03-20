import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
export default () => (
  <NodeViewWrapper className="relative">
    <pre>
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
);
