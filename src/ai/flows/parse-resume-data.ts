'use server';

/**
 * @fileOverview This file defines a Genkit flow to parse resume data from a document.
 *
 * It extracts information like name, contact details, education, skills, and experience
 * from a resume document (PDF or DOCX) using an LLM.  The flow takes the document
 * as a data URI and returns a structured JSON object containing the parsed data.
 *
 * @interface ParseResumeDataInput - Defines the input schema for the flow (resume document as data URI).
 * @interface ParseResumeDataOutput - Defines the output schema for the flow (parsed resume data as JSON).
 * @function parseResumeData - The main exported function to trigger the resume parsing flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ParseResumeDataInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "Resume document (PDF or DOCX) as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ParseResumeDataInput = z.infer<typeof ParseResumeDataInputSchema>;

const ParseResumeDataOutputSchema = z.object({
  name: z.string().optional().describe('The name of the person.'),
  email: z.string().email().optional().describe('The email address of the person.'),
  phone: z.string().optional().describe('The phone number of the person.'),
  location: z.string().optional().describe('The location of the person.'),
  github: z.string().url().optional().describe('The GitHub profile URL.'),
  linkedin: z.string().url().optional().describe('The LinkedIn profile URL.'),
  objective: z.string().optional().describe('The objective or summary of the resume.'),
  education: z
    .array(
      z.object({
        degree: z.string().optional().describe('The degree obtained.'),
        institution: z.string().optional().describe('The institution name.'),
        graduationYear: z.string().optional().describe('The graduation year.'),
        cgpa: z.string().optional().describe('The CGPA or GPA.'),
      })
    )
    .optional()
    .describe('The education history of the person.'),
  skills: z.array(z.string()).optional().describe('The skills of the person.'),
  projects:
    z
      .array(
        z.object({
          name: z.string().optional().describe('The name of the project.'),
          description: z.string().optional().describe('The description of the project.'),
        })
      )
      .optional()
      .describe('The projects of the person.'),
  experience:
    z
      .array(
        z.object({
          title: z.string().optional().describe('The job title.'),
          company: z.string().optional().describe('The company name.'),
          dates: z.string().optional().describe('The employment dates.'),
          description: z.string().optional().describe('The job description.'),
        })
      )
      .optional()
      .describe('The work experience of the person.'),
  certifications: z.array(z.string()).optional().describe('The certifications of the person.'),
  languages: z.array(z.string()).optional().describe('The languages spoken by the person.'),
  achievements: z.array(z.string()).optional().describe('The achievements of the person.'),
});
export type ParseResumeDataOutput = z.infer<typeof ParseResumeDataOutputSchema>;

export async function parseResumeData(input: ParseResumeDataInput): Promise<ParseResumeDataOutput> {
  return parseResumeDataFlow(input);
}

const resumePrompt = ai.definePrompt({
  name: 'resumeParserPrompt',
  input: {schema: ParseResumeDataInputSchema},
  output: {schema: ParseResumeDataOutputSchema},
  prompt: `You are an expert resume parser. Your job is to extract data from a resume document and return it in a structured JSON format.

  Analyze the following resume document:
  {{media url=resumeDataUri}}

  Return a JSON object conforming to the following schema:
  \`\`\`
  ${JSON.stringify(ParseResumeDataOutputSchema.shape, null, 2)}
  \`\`\`

  Ensure that all fields are populated based on the information provided in the resume. If a field is not found, leave it blank.  Do not include any introductory or explanatory text outside of the JSON object.
  `,
});

const parseResumeDataFlow = ai.defineFlow(
  {
    name: 'parseResumeDataFlow',
    inputSchema: ParseResumeDataInputSchema,
    outputSchema: ParseResumeDataOutputSchema,
  },
  async input => {
    const {output} = await resumePrompt(input);
    return output!;
  }
);
