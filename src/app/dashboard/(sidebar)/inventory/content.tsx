"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const Content = () => {
  return (
    <main>
      <div className="w-full h-[85vh] border">
        <div>
          <Card>
            <CardContent>Content</CardContent>
            <CardHeader>
              <div className="flex justify-between px-4">
                <p>Product Title</p>
                <p>Price</p>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </main>
  );
};
