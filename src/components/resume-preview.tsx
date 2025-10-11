import Image from 'next/image';
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Wrench,
  Trophy,
  Award,
  Languages as LanguagesIcon,
} from 'lucide-react';

import type { ParseResumeDataOutput } from '@/ai/flows/parse-resume-data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { GithubIcon } from '@/components/icons/github-icon';
import { LinkedinIcon } from '@/components/icons/linkedin-icon';

type ResumePreviewProps = {
  data: ParseResumeDataOutput;
};

const ResumeSection = ({
  title,
  icon: Icon,
  children,
  className,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={className}>
    <h2 className="font-headline text-xl font-bold text-primary mb-4 flex items-center gap-3 print:text-lg">
      <Icon className="h-6 w-6 print:h-5 print:w-5" />
      {title}
    </h2>
    <div className="space-y-4">{children}</div>
  </section>
);

const skillCategories = {
  Languages: ["JavaScript", "Python", "java", "HTML", "CSS", "SQL"],
  "Frameworks/Libraries": ["React.js", "Node.js", "Chart.js", "Tailwind CSS"],
  Tools: ["Git", "GitHub", "Firebase", "VS Code", "APIs"],
  Concepts: ["Responsive Design", "REST APIs", "UI/UX Principles", "Web Security Basics"]
};

export default function ResumePreview({ data }: ResumePreviewProps) {
  const profilePicUrl = '/profile.png';

  const getCategorizedSkills = () => {
    if (!data.skills) return {};
    const categorized: Record<string, string[]> = {};
    const uncategorized: string[] = [];

    data.skills.forEach(skill => {
      let found = false;
      for (const category in skillCategories) {
        if ((skillCategories as any)[category].map((s:string) => s.toLowerCase()).includes(skill.toLowerCase())) {
          if (!categorized[category]) {
            categorized[category] = [];
          }
          categorized[category].push(skill);
          found = true;
          break;
        }
      }
      if (!found) {
        uncategorized.push(skill);
      }
    });

    if (uncategorized.length > 0) {
      categorized['Other'] = uncategorized;
    }
    
    return categorized;
  };
  
  const categorizedSkills = getCategorizedSkills();

  return (
    <Card className="resume-container w-full max-w-4xl mx-auto shadow-2xl print:shadow-none print:border-none">
      <CardContent className="p-6 sm:p-8 md:p-12 print:p-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          {profilePicUrl && (
             <Image
                src={profilePicUrl}
                alt={data.name || 'Profile Picture'}
                width={128}
                height={128}
                className="rounded-full border-4 border-primary/20 shadow-md object-cover"
                data-ai-hint="professional headshot"
              />
          )}
          <div className="text-center sm:text-left">
            <h1 className="font-headline text-4xl font-bold text-primary print:text-3xl">{data.name}</h1>
            <div className="mt-2 flex flex-wrap justify-center sm:justify-start items-center gap-x-4 gap-y-2 text-sm text-muted-foreground print:text-xs">
              {data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-primary"><Mail className="h-4 w-4" />{data.email}</a>}
              {data.phone && <span className="flex items-center gap-2"><Phone className="h-4 w-4" />{data.phone}</span>}
              {data.location && <span className="flex items-center gap-2"><MapPin className="h-4 w-4" />{data.location}</span>}
            </div>
            <div className="mt-3 flex justify-center sm:justify-start gap-4">
              {data.github && <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><GithubIcon className="h-5 w-5" /></a>}
              {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><LinkedinIcon className="h-5 w-5" /></a>}
            </div>
          </div>
        </header>

        {/* Objective */}
        {data.objective && (
          <section className="mb-8">
            <p className="text-center sm:text-left text-foreground/80 italic">{data.objective}</p>
          </section>
        )}

        <Separator className="my-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8">
          <div className="md:col-span-2 space-y-8">
            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
              <ResumeSection title="Experience" icon={Briefcase}>
                {data.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-lg font-headline print:text-base">{exp.title}</h3>
                      <span className="text-xs text-muted-foreground">{exp.dates}</span>
                    </div>
                    <p className="text-primary font-semibold">{exp.company}</p>
                    <p className="mt-1 text-sm text-foreground/80">{exp.description}</p>
                  </div>
                ))}
              </ResumeSection>
            )}

            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
              <ResumeSection title="Projects" icon={Briefcase}>
                {data.projects.map((proj, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-lg font-headline print:text-base">{proj.name}</h3>
                    <p className="mt-1 text-sm text-foreground/80">{proj.description}</p>
                  </div>
                ))}
              </ResumeSection>
            )}

             {/* Achievements */}
            {data.achievements && data.achievements.length > 0 && (
              <ResumeSection title="Achievements" icon={Trophy}>
                <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
                  {data.achievements.map((ach, index) => <li key={index}>{ach}</li>)}
                </ul>
              </ResumeSection>
            )}
          </div>

          <div className="md:col-span-1 space-y-8">
            {/* Education */}
            {data.education && data.education.length > 0 && (
              <ResumeSection title="Education" icon={GraduationCap}>
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-bold font-headline print:text-base">{edu.degree}</h3>
                    <p className="text-primary font-semibold text-sm">{edu.institution}</p>
                    <p className="text-xs text-muted-foreground mt-1">{edu.graduationYear} {edu.cgpa && `• CGPA: ${edu.cgpa}`}</p>
                  </div>
                ))}
              </ResumeSection>
            )}
            
            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
              <ResumeSection title="Skills" icon={Wrench}>
                {Object.entries(categorizedSkills).map(([category, skills]) => (
                  <div key={category}>
                    <h4 className="font-semibold mb-2 text-sm">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, i) => (
                        <Badge key={i} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </ResumeSection>
            )}

            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
              <ResumeSection title="Certifications" icon={Award}>
                <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
                  {data.certifications.map((cert, index) => <li key={index}>{cert}</li>)}
                </ul>
              </ResumeSection>
            )}
            
            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
              <ResumeSection title="Languages" icon={LanguagesIcon}>
                 <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
                  {data.languages.map((lang, index) => <li key={index}>{lang}</li>)}
                </ul>
              </ResumeSection>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
