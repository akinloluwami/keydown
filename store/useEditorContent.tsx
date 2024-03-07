import { create } from "zustand";

interface EditorContent {
  content: string;
  setContent: (content: string) => void;
}

export const useEditorContent = create<EditorContent>((set) => ({
  content: "",
  setContent: (content: string) => set({ content }),
}));
