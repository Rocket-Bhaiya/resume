'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { parseResumeData, type ParseResumeDataOutput } from '@/ai/flows/parse-resume-data';

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const formSchema = z.object({
  resume: z
    .any()
    .refine((files) => files?.length == 1, 'File is required.')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      '.pdf and .docx files are accepted.'
    ),
});

type ResumeUploaderProps = {
  onResumeParsed: (data: ParseResumeDataOutput) => void;
};

export default function ResumeUploader({ onResumeParsed }: ResumeUploaderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resume: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const file = values.resume[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const resumeDataUri = e.target?.result as string;
        if (!resumeDataUri) {
          throw new Error('Could not read file.');
        }

        const parsedData = await parseResumeData({ resumeDataUri });
        onResumeParsed(parsedData);
        toast({
          title: 'Success!',
          description: 'Your resume has been parsed and updated.',
        });

        // Reset the form value
        if(fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        form.reset();

      } catch (error) {
        console.error('Error parsing resume:', error);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem parsing your resume. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      setIsLoading(false);
      toast({
        variant: 'destructive',
        title: 'File Reading Error',
        description: 'Could not read the selected file.',
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Resume</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Upload your resume"
                  accept=".pdf,.docx"
                  onChange={(e) => field.onChange(e.target.files)}
                  ref={fileInputRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Upload className="mr-2 h-4 w-4" />
          )}
          {isLoading ? 'Parsing...' : 'Parse with AI'}
        </Button>
      </form>
    </Form>
  );
}
