import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity, Book, Brain, Briefcase, Laptop, ListChecks } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export function SurveyCareerListItem({ jobInfo }) {
    const [activeSection, setActiveSection] = useState(null);

    const sections = [
        { title: 'Tasks', icon: <ListChecks className="h-4 w-4" />, data: jobInfo.Tasks },
        { title: 'Technology Skills', icon: <Laptop className="h-4 w-4" />, data: jobInfo.TechnologySkills },
        { title: 'Work Activities', icon: <Activity className="h-4 w-4" />, data: jobInfo.WorkActivities },
        { title: 'Skills', icon: <Brain className="h-4 w-4" />, data: jobInfo.Skills },
        { title: 'Knowledge', icon: <Book className="h-4 w-4" />, data: jobInfo.Knowledge },
    ];

    return (
        <Card className="w-full mx-auto px-10 py-4">
            <CardHeader>
                <div className="flex space-x-2">
                    <Briefcase className="h-6 w-6" />
                    <CardTitle>{jobInfo.JobName}</CardTitle>
                </div>
                <CardDescription>
                    Job Code: {jobInfo.JobCode} | Occupation: {jobInfo.OccupationName}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                >
                    {sections.map((section, index) => (
                        <AccordionItem
                            value={section.title}
                            key={index}
                        >
                            <AccordionTrigger
                                onClick={() => setActiveSection(activeSection === section.title ? null : section.title)}
                            >
                                <div className="flex items-center space-x-2">
                                    {section.icon}
                                    <span>{section.title}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                                    {section.data.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="mb-2"
                                        >
                                            <Badge
                                                variant="outline"
                                                className="mr-2"
                                            >
                                                {idx + 1}
                                            </Badge>
                                            {item}
                                        </div>
                                    ))}
                                </ScrollArea>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    );
}

SurveyCareerListItem.propTypes = {
    jobInfo: PropTypes.shape({
        JobName: PropTypes.string.isRequired,
        JobCode: PropTypes.string.isRequired,
        OccupationName: PropTypes.string.isRequired,
        Tasks: PropTypes.arrayOf(PropTypes.string).isRequired,
        TechnologySkills: PropTypes.arrayOf(PropTypes.string).isRequired,
        WorkActivities: PropTypes.arrayOf(PropTypes.string).isRequired,
        Skills: PropTypes.arrayOf(PropTypes.string).isRequired,
        Knowledge: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};
