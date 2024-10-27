import { Description } from '@/platform/pdf/view/component/Description';
import { Divider } from '@/platform/pdf/view/component/Divider';
import { Heading } from '@/platform/pdf/view/component/Heading';
import { Section } from '@/platform/pdf/view/component/Section';
import { Title } from '@/platform/pdf/view/component/Title';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    page: { padding: 30, backgroundColor: '#010613' },
});

export const MBTIResultPDF = ({ MBTIresults }) => {
    return (
        <Document>
            {MBTIresults.map((result, index) => (
                <Page
                    key={index}
                    style={styles.page}
                >
                    <Section>
                        <Title content="MBTI Result" />
                    </Section>
                    <Section>
                        <Heading
                            bulletNumber="01"
                            content={`You are a ${result.name}`}
                        />
                        <Divider />
                        <Description content={result.description} />
                    </Section>
                    <Section>
                        <Heading
                            bulletNumber="02"
                            content="Cognitive Function"
                        />
                        <Divider />
                        <Description content={result.cognitiveFunction} />
                    </Section>
                    <Section>
                        <Heading
                            bulletNumber="03"
                            content="Strengths"
                        />
                        <Divider />
                        <Description content={result.strengths} />
                    </Section>
                    <Section>
                        <Heading
                            bulletNumber="04"
                            content="Weakness"
                        />
                        <Divider />
                        <Description content={result.weaknesses} />
                    </Section>
                    <Section>
                        <Heading
                            bulletNumber="05"
                            content="Interaction"
                        />
                        <Divider />
                        <Description content={result.interaction} />
                    </Section>
                </Page>
            ))}
        </Document>
    );
};

MBTIResultPDF.propTypes = {
    MBTIresults: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            cognitiveFunction: PropTypes.string.isRequired,
            strengths: PropTypes.string.isRequired,
            weaknesses: PropTypes.string.isRequired,
            interaction: PropTypes.string.isRequired,
        }),
    ).isRequired,
};
