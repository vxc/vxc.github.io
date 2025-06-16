import { BookOpen, Copy, ClipboardCheck, Scroll } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as FpPoem from "@/pages/fp-poem.md";
import { useState } from "react";
import { GLOBAL } from "@/lib/variables";
const verses = FpPoem.rawContent()
  .split("\n\n")
  .map((verse) => {
    const quote = verse.trim().replace(/\n/g, "<br />");
    return {
      quote,
      source: "Functional Programming for no Rhyme or Reason",
    };
  });

export function PoemDialog() {
  const [copied, setCopied] = useState(false);

  const poemText = FpPoem.rawContent();

  const handleCopy = () => {
    navigator.clipboard
      .writeText(poemText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <BookOpen className="w-4 h-4 mr-2" />
          Read full poem
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-screen">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scroll className="w-5 h-5" /> {GLOBAL.poemName}
          </DialogTitle>
          <DialogDescription> {GLOBAL.poemDescription} </DialogDescription>
        </DialogHeader>

        <div className="max-h-96 overflow-y-auto pr-4">
          <div className="space-y-4">
            <pre className="whitespace-pre-wrap font-serif text-sm leading-relaxed p-4 rounded-lg border">
              {poemText}
            </pre>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
