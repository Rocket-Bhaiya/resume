'use client';

import { useEffect } from 'react';
import ResumePreview from '@/components/resume-preview';
import { initialResumeData } from '@/lib/resume-data';

export default function PdfPage() {
  useEffect(() => {
    // When the component mounts, trigger the print dialog
    window.print();
  }, []);

  return (
    <main>
      <ResumePreview data={initialResumeData} />
    </main>
  );
}
