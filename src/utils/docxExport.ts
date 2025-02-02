import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';
import { ResumeData } from '../types/resume';

export const generateDOCX = async (resumeData: ResumeData) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Header with personal info
        new Paragraph({
          text: resumeData.personalInfo.fullName,
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun(resumeData.personalInfo.email),
            new TextRun(' | '),
            new TextRun(resumeData.personalInfo.phone),
            new TextRun(' | '),
            new TextRun(resumeData.personalInfo.location),
          ],
        }),

        // Summary
        ...(resumeData.summary ? [
          new Paragraph({
            text: 'Professional Summary',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400 },
          }),
          new Paragraph(resumeData.summary),
        ] : []),

        // Experience
        ...(resumeData.experience.length > 0 ? [
          new Paragraph({
            text: 'Experience',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400 },
          }),
          ...resumeData.experience.flatMap(exp => [
            new Paragraph({
              text: exp.position,
              heading: HeadingLevel.HEADING_3,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: exp.company,
                  bold: true,
                }),
                new TextRun(` (${exp.startDate} - ${exp.endDate})`),
              ],
            }),
            new Paragraph(exp.description),
            ...exp.achievements.map(achievement =>
              new Paragraph({
                text: `• ${achievement}`,
                indent: { left: 720 },
              })
            ),
          ]),
        ] : []),

        // Education
        ...(resumeData.education.length > 0 ? [
          new Paragraph({
            text: 'Education',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400 },
          }),
          ...resumeData.education.map(edu => [
            new Paragraph({
              text: `${edu.degree} in ${edu.field}`,
              heading: HeadingLevel.HEADING_3,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: edu.institution,
                  bold: true,
                }),
                new TextRun(` (${edu.graduationDate})`),
                ...(edu.gpa ? [new TextRun(` • GPA: ${edu.gpa}`)] : []),
              ],
            }),
          ]).flat(),
        ] : []),

        // Skills
        ...(resumeData.skills.length > 0 ? [
          new Paragraph({
            text: 'Skills',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400 },
          }),
          new Paragraph({
            text: resumeData.skills.join(' • '),
          }),
        ] : []),
      ],
    }],
  });

  return await Packer.toBlob(doc);
};