'use client';

import { useState } from 'react';
import type { ParseResumeDataOutput } from '@/ai/flows/parse-resume-data';
import { initialResumeData } from '@/lib/resume-data';
import ResumePreview from '@/components/resume-preview';

export default function Home() {
  const [resumeData, setResumeData] = useState<ParseResumeDataOutput>(initialResumeData);

  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <ResumePreview data={resumeData} />
      </div>
    </main>
  );
}
