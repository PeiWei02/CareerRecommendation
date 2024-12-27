import { Description } from '@/platform/pdf/view/component/Description';
import { Divider } from '@/platform/pdf/view/component/Divider';
import { Heading } from '@/platform/pdf/view/component/Heading';
import { List } from '@/platform/pdf/view/component/ListItem';
import { Section } from '@/platform/pdf/view/component/Section';
import { Title } from '@/platform/pdf/view/component/Title';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    page: { padding: 30, backgroundColor: '#010613' },
    container: {
        paddingHorizontal: 30,
        paddingVertical: 120,
        backgroundColor: '#010613',
        height: '100%',
        justifyContent: 'space-between',
    },
    title: { fontSize: 36, marginBottom: 15, color: '#ffffff', textAlign: 'center' },
    subtitle: { fontSize: 22, marginBottom: 25, color: '#cccccc', textAlign: 'center' },
    detail: { fontSize: 14, marginBottom: 10, color: '#ffffff', textAlign: 'center' },
    section: { marginBottom: 20 },
    paragraph: { fontSize: 14, marginBottom: 15, color: '#ffffff', textAlign: 'justify', marginHorizontal: 20 },
    bottomSection: { marginTop: 'auto', paddingTop: 50 },
});

export function SurveyAllCompletedPDF({ userName, holland6SuggestedJobs, mbtiSuggestedJobs, TheVarkResult }) {
    const renderCoverPage = () => {
        function getCurrentFormattedTime() {
            const now = new Date();

            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            };

            const formatter = new Intl.DateTimeFormat('en-US', options);
            const formattedParts = formatter.formatToParts(now);

            const date = formattedParts
                .filter((part) => ['month', 'day', 'year'].includes(part.type))
                .map((part) => part.value)
                .join('/');

            const time = formattedParts
                .filter((part) => ['hour', 'minute', 'dayPeriod'].includes(part.type))
                .map((part) => part.value)
                .join(' ');

            return `${date.replace(/\//g, '-')} ${time}`;
        }
        return (
            <View style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.title}>Survey Completion Report</Text>
                    <Text style={styles.subtitle}>Personalized Insights and Recommendations</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.detail}>User: {userName}</Text>
                    <Text style={styles.detail}>Report Generated At: {getCurrentFormattedTime()}</Text>
                </View>

                <View style={styles.bottomSection}>
                    <Text style={styles.paragraph}>
                        This report provides personalized insights and recommendations based on your responses to
                        various assessments, including the Holland 6, MBTI, and The VARK learning styles. These insights
                        aim to enhance your self-awareness and guide you toward making informed decisions about your
                        career, learning strategies, and personal growth.
                    </Text>
                    <Text style={styles.paragraph}>
                        Each section of this report delves into your strengths, preferences, and suggested actions
                        tailored to your unique profile. Explore your results and take the first step toward unlocking
                        your potential.
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <Document>
            <Page style={styles.page}>{renderCoverPage()}</Page>

            {holland6SuggestedJobs.map((result, index) => (
                <Page
                    key={index}
                    style={styles.page}
                >
                    <Section>
                        <Title content={`Holland 6 Suggested Job ${index + 1}`} />
                    </Section>
                    <Section>
                        <Heading
                            bulletNumber="01"
                            content="Job Name"
                        />
                        <Divider />
                        <Description content={result.JobName} />
                    </Section>

                    <Section>
                        <Heading
                            bulletNumber="02"
                            content="Knowledge"
                        />
                        <Divider />
                        <List items={result.Knowledge} />
                    </Section>

                    <Section>
                        <Heading
                            bulletNumber="03"
                            content="Skills"
                        />
                        <Divider />
                        <List items={result.Skills} />
                    </Section>

                    <Section>
                        <Heading
                            bulletNumber="04"
                            content="Tasks"
                        />
                        <Divider />
                        <List items={result.Tasks} />
                    </Section>

                    <Section>
                        <Heading
                            bulletNumber="05"
                            content="Technology Skills"
                        />
                        <Divider />
                        <List items={result.TechnologySkills} />
                    </Section>

                    <Section>
                        <Heading
                            bulletNumber="06"
                            content="Work Activities"
                        />
                        <Divider />
                        <List items={result.WorkActivities} />
                    </Section>
                </Page>
            ))}

            {mbtiSuggestedJobs.map((result, index) => (
                <Page
                    key={index}
                    style={styles.page}
                >
                    <Section>
                        <Title content={`MBTI Suggested Job ${index + 1}`} />
                    </Section>
                    <Section>
                        <Heading
                            bulletNumber="01"
                            content="Job Name"
                        />
                        <Divider />
                        <Description content={result.JobName} />
                    </Section>

                    <Section>
                        <Heading
                            bulletNumber="02"
                            content="Knowledge"
                        />
                        <Divider />
                        <List items={result.Knowledge} />
                    </Section>

                    <Section>
                        <Heading
                            bulletNumber="03"
                            content="Skills"
                        />
                        <Divider />
                        <List items={result.Skills} />
                    </Section>

                    <Section>
                        <Heading
                            bulletNumber="04"
                            content="Tasks"
                        />
                        <Divider />
                        <List items={result.Tasks} />
                    </Section>

                    <Section>
                        <Heading
                            bulletNumber="05"
                            content="Technology Skills"
                        />
                        <Divider />
                        <List items={result.TechnologySkills} />
                    </Section>

                    <Section>
                        <Heading
                            bulletNumber="06"
                            content="Work Activities"
                        />
                        <Divider />
                        <List items={result.WorkActivities} />
                    </Section>
                </Page>
            ))}

            <Page style={styles.page}>
                <Section>
                    <Title content="The Vark Suggested Learning " />
                </Section>
                <Section>
                    <Heading
                        bulletNumber="01"
                        content="Name"
                    />
                    <Divider />
                    <Description content={TheVarkResult.name} />
                </Section>

                <Section>
                    <Heading
                        bulletNumber="02"
                        content="Learning Description"
                    />
                    <Divider />
                    <Description content={TheVarkResult.description} />
                </Section>

                <Section>
                    <Heading
                        bulletNumber="03"
                        content="Feedback"
                    />
                    <Divider />
                    <List items={TheVarkResult.feedback} />
                </Section>

                <Section>
                    <Heading
                        bulletNumber="04"
                        content="Techniques"
                    />
                    <Divider />
                    <List items={TheVarkResult.techniques} />
                </Section>

                <Section>
                    <Heading
                        bulletNumber="05"
                        content="Traits"
                    />
                    <Divider />
                    <List items={TheVarkResult.traits} />
                </Section>
            </Page>
        </Document>
    );
}

SurveyAllCompletedPDF.propTypes = {
    userName: PropTypes.string.isRequired,
    reportGeneratedAt: PropTypes.string.isRequired,
    holland6SuggestedJobs: PropTypes.arrayOf(
        PropTypes.shape({
            JobName: PropTypes.string.isRequired,
            Knowledge: PropTypes.arrayOf(PropTypes.string).isRequired,
            Skills: PropTypes.arrayOf(PropTypes.string).isRequired,
            Tasks: PropTypes.arrayOf(PropTypes.string).isRequired,
            TechnologySkills: PropTypes.arrayOf(PropTypes.string).isRequired,
            WorkActivities: PropTypes.arrayOf(PropTypes.string).isRequired,
        }),
    ).isRequired,
    mbtiSuggestedJobs: PropTypes.arrayOf(
        PropTypes.shape({
            JobName: PropTypes.string.isRequired,
            Knowledge: PropTypes.arrayOf(PropTypes.string).isRequired,
            Skills: PropTypes.arrayOf(PropTypes.string).isRequired,
            Tasks: PropTypes.arrayOf(PropTypes.string).isRequired,
            TechnologySkills: PropTypes.arrayOf(PropTypes.string).isRequired,
            WorkActivities: PropTypes.arrayOf(PropTypes.string).isRequired,
        }),
    ).isRequired,
    TheVarkResult: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        feedback: PropTypes.arrayOf(PropTypes.string).isRequired,
        techniques: PropTypes.arrayOf(PropTypes.string).isRequired,
        traits: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};
