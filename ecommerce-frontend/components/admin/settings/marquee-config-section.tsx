"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface MarqueeConfigSectionProps {
  marqueeTexts: string[];
  setMarqueeTexts: (texts: string[]) => void;
}

export default function MarqueeConfigSection({
  marqueeTexts,
  setMarqueeTexts,
}: MarqueeConfigSectionProps) {
  return (
    <Card className="border shadow-lg bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Marquee Text
        </CardTitle>
        <CardDescription>
          Configure scrolling text for the marquee effect
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {marqueeTexts.map((text, index) => (
          <div key={index} className="flex gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label
                htmlFor={`marqueeText-${index}`}
                className="text-sm font-medium"
              >
                Marquee Text {index + 1}
                {index === 0 && <span className="text-red-500">*</span>}
              </Label>
              <Input
                id={`marqueeText-${index}`}
                value={text}
                onChange={(e) => {
                  const newTexts = [...marqueeTexts];
                  newTexts[index] = e.target.value;
                  setMarqueeTexts(newTexts);
                }}
                placeholder="Enter marquee text"
                className="border focus:border-primary shadow-none border-gray-300"
              />
            </div>
            {marqueeTexts.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => {
                  const newTexts = marqueeTexts.filter(
                    (_, i) => i !== index
                  );
                  setMarqueeTexts(newTexts);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => setMarqueeTexts([...marqueeTexts, ""])}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Marquee Text
        </Button>
      </CardContent>
    </Card>
  );
}