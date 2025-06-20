import React from 'react'
import SectionHeading from './section-heading'
import { type WorkExperience, workExperience } from '@/constants/experience'
import { ResumeCard } from './resume-card'

type Props = {}

const WorkExperience = (props: Props) => {
  return (
    <div className="my-4 border-y border-neutral-100 px-4 py-6 shadow-[0px_1px_4px_0px_var(--color-neutral-100)_inset,0px_-1px_4px_0px_var(--color-neutral-100)_inset]">
      <SectionHeading delay={0.2}>Worked at Reputed Firms</SectionHeading>
      <div className="py-4 space-y-4">
        {workExperience.map((work: WorkExperience) => (
          <ResumeCard 
            key={work.company}
            logoUrl={work.logoUrl}
            altText={work.company}
            title={work.company}
            subtitle={work.title}
            href={work.href}
            badges={work.badges}
            period={`${work.start} - ${work.end ?? "Present"}`}
            description={work.description}
            skills={work.skills}
          />
        ))}
      </div>
    </div>
  )
}

export default WorkExperience