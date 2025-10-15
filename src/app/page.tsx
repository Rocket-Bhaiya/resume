'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ParseResumeDataOutput } from '@/ai/flows/parse-resume-data';
import { initialResumeData } from '@/lib/resume-data';
import ResumePreview from '@/components/resume-preview';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function Home() {
  const [resumeData, setResumeData] = useState<ParseResumeDataOutput>(initialResumeData);

  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-end mb-4 no-print">
            <Button asChild>
                <Link href="/pdf" target="_blank">
                    <Download className="mr-2" />
                    Download PDF
                </Link>
            </Button>
        </div>
        <ResumePreview data={resumeData} />
      </div>
    </main>
  );
}
