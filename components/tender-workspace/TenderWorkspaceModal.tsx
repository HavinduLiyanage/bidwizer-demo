"use client";

import { useState, useEffect } from "react";
import { X, Search, Loader2, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FileTree } from "./FileTree";
import { DocumentViewer } from "./DocumentViewer";
import { AiAssistantPanel } from "./AiAssistantPanel";
import { getTenderTree, type FileNode } from "@/lib/mocks/files";
import { cn } from "@/lib/utils";

interface TenderWorkspaceModalProps {
  tenderId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function TenderWorkspaceModal({
  tenderId,
  isOpen,
  onClose,
}: TenderWorkspaceModalProps) {
  const [tree, setTree] = useState<FileNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFileTreeCollapsed, setIsFileTreeCollapsed] = useState(false);
  const [isAiPanelCollapsed, setIsAiPanelCollapsed] = useState(false);
  const [isMobileFilesOpen, setIsMobileFilesOpen] = useState(true);
  const [isMobileAssistantOpen, setIsMobileAssistantOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const loadTree = async () => {
        setIsLoading(true);
        try {
          const data = await getTenderTree(tenderId);
          setTree(data);
        } catch (error) {
          console.error("Failed to load tree:", error);
        } finally {
          setIsLoading(false);
        }
      };

      loadTree();
    }
  }, [isOpen, tenderId]);

  useEffect(() => {
    if (isOpen && tree) {
      const lastFileId = localStorage.getItem(`tender_${tenderId}_lastFile`);
      if (lastFileId) {
        const findNode = (node: FileNode): FileNode | null => {
          if (node.id === lastFileId) return node;
          if (node.children) {
            for (const child of node.children) {
              const found = findNode(child);
              if (found) return found;
            }
          }
          return null;
        };
        const node = findNode(tree);
        if (node) {
          setSelectedNode(node);
        }
      }
    }
  }, [isOpen, tenderId, tree]);

  const handleSelectNode = (node: FileNode) => {
    setSelectedNode(node);
    // Save to localStorage
    if (node.type === "file") {
      localStorage.setItem(`tender_${tenderId}_lastFile`, node.id);
    }
  };

  const handleClose = () => {
    onClose();
  };

  // Prevent default context menu
  useEffect(() => {
    const preventContextMenu = (e: MouseEvent) => {
      if (isOpen) {
        const target = e.target as HTMLElement;
        if (target.closest(".document-viewer")) {
          e.preventDefault();
        }
      }
    };

    document.addEventListener("contextmenu", preventContextMenu);
    return () => document.removeEventListener("contextmenu", preventContextMenu);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-full w-screen h-screen p-0 gap-0 bg-white border-0 rounded-none flex flex-col"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <div className="flex h-full flex-col overflow-hidden">
          {/* Top Bar */}
          <div className="flex flex-col gap-4 border-b border-gray-200 bg-white px-4 py-3.5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-gray-900">Tender Workspace</span>
                {selectedNode && (
                  <>
                    <span className="text-gray-400">/</span>
                    <span className="max-w-[200px] truncate text-xs text-gray-600 sm:max-w-md">
                      {selectedNode.name}
                    </span>
                  </>
                )}
              </div>

              {/* Quick Search */}
              <div className="relative w-full sm:ml-auto sm:max-w-sm">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <Input
                  placeholder="Search documents..."
                  className="h-9 w-full bg-gray-50 pl-9 text-xs shadow-inner focus:bg-white"
                />
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="hover:bg-gray-100"
                aria-label="Close workspace"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <Loader2 className="mx-auto mb-3 h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-gray-600">Loading documents...</p>
              </div>
            </div>
          )}

          {/* Main Content - responsive panes */}
          {!isLoading && tree && (
            <>
              <div className="hidden flex-1 overflow-hidden bg-gray-50 lg:flex">
                {/* Left: File Tree */}
                <div
                  className={cn(
                    "relative flex-shrink-0 border-r border-gray-200 bg-white transition-all duration-300",
                    isFileTreeCollapsed ? "w-12" : "w-72"
                  )}
                >
                  {isFileTreeCollapsed ? (
                    <div className="flex flex-col items-center gap-3 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsFileTreeCollapsed(false)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <FileTree
                        tree={tree}
                        selectedId={selectedNode?.id}
                        onSelect={handleSelectNode}
                      />
                      <button
                        onClick={() => setIsFileTreeCollapsed(true)}
                        className="absolute top-3 right-2 rounded-md p-1.5 opacity-0 transition-colors hover:bg-gray-100 group-hover:opacity-100"
                        aria-label="Collapse file tree"
                      >
                        <ChevronLeft className="h-3.5 w-3.5 text-gray-500" />
                      </button>
                    </>
                  )}
                </div>

                {/* Center: Document Viewer */}
                <div className="document-viewer min-w-0 flex-1 overflow-hidden">
                  <DocumentViewer selectedNode={selectedNode} />
                </div>

                {/* Right: AI Assistant */}
                <div
                  className={cn(
                    "relative flex-shrink-0 border-l border-gray-200 bg-white transition-all duration-300",
                    isAiPanelCollapsed ? "w-12" : "w-[420px]"
                  )}
                >
                  {isAiPanelCollapsed ? (
                    <div className="flex flex-col items-center py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsAiPanelCollapsed(false)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <AiAssistantPanel
                        tenderId={tenderId}
                        selectedFileId={selectedNode?.type === "file" ? selectedNode.id : undefined}
                        selectedFolderPath={
                          selectedNode?.type === "folder" ? selectedNode.path : undefined
                        }
                        className="h-full"
                      />
                      <button
                        onClick={() => setIsAiPanelCollapsed(true)}
                        className="absolute left-2 top-3 rounded-md p-1.5 opacity-0 transition-colors hover:bg-gray-100 group-hover:opacity-100"
                        aria-label="Collapse AI panel"
                      >
                        <ChevronRight className="h-3.5 w-3.5 text-gray-500" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Mobile layout */}
              <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-6 lg:hidden">
                <div className="space-y-5">
                  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <DocumentViewer selectedNode={selectedNode} className="h-auto min-h-[50vh]" />
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <button
                      className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-gray-900"
                      onClick={() => setIsMobileFilesOpen((prev) => !prev)}
                    >
                      File explorer
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-gray-500 transition-transform",
                          isMobileFilesOpen && "rotate-180"
                        )}
                      />
                    </button>
                    {isMobileFilesOpen && (
                      <div className="border-t border-gray-100">
                        <FileTree
                          tree={tree}
                          selectedId={selectedNode?.id}
                          onSelect={handleSelectNode}
                          className="h-auto max-h-72"
                        />
                      </div>
                    )}
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <button
                      className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-gray-900"
                      onClick={() => setIsMobileAssistantOpen((prev) => !prev)}
                    >
                      AI assistant
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-gray-500 transition-transform",
                          isMobileAssistantOpen && "rotate-180"
                        )}
                      />
                    </button>
                    {isMobileAssistantOpen && (
                      <div className="border-t border-gray-100">
                        <AiAssistantPanel
                          tenderId={tenderId}
                          selectedFileId={
                            selectedNode?.type === "file" ? selectedNode.id : undefined
                          }
                          selectedFolderPath={
                            selectedNode?.type === "folder" ? selectedNode.path : undefined
                          }
                          className="h-auto"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
