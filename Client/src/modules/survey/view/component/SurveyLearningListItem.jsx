import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Book, PenTool, Star, ThumbsUp } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export function SurveyLearningListItem({ learningInfo }) {
    const [activeSection, setActiveSection] = useState(null);

    const sections = [
        { title: 'Traits', icon: <Star className="h-4 w-4" />, data: learningInfo.traits },
        { title: 'Techniques', icon: <PenTool className="h-4 w-4" />, data: learningInfo.techniques },
        { title: 'Feedback', icon: <ThumbsUp className="h-4 w-4" />, data: learningInfo.feedback },
    ];

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <div className="flex items-center space-x-2">
                    <Book className="h-6 w-6" />
                    <CardTitle>{learningInfo.name}</CardTitle>
                </div>
                <CardDescription>{learningInfo.description}</CardDescription>
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
                                <ScrollArea className="h-[150px] w-full rounded-md border p-4">
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

SurveyLearningListItem.propTypes = {
    learningInfo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        traits: PropTypes.arrayOf(PropTypes.string).isRequired,
        techniques: PropTypes.arrayOf(PropTypes.string).isRequired,
        feedback: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};
