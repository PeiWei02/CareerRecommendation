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

export const VarkResultPDF = ({ varkResult }) => {
    return (
        <Document>
            <Page style={styles.page}>
                <Section>
                    <Title content="VARK Results" />
                </Section>
                <Section>
                    <Heading
                        bulletNumber="01"
                        content={`You are a ${varkResult.name}!`}
                    />
                    <Divider />
                    <Description content={varkResult.description} />
                </Section>
                <Section>
                    <Heading
                        bulletNumber="02"
                        content="Traits"
                    />
                    <Divider />
                    <Description content={varkResult.traits} />
                </Section>
                <Section>
                    <Heading
                        bulletNumber="03"
                        content="Techniques"
                    />
                    <Divider />
                    <Description content={varkResult.techniques} />
                </Section>
                <Section>
                    <Heading
                        bulletNumber="04"
                        content="Feedback"
                    />
                    <Divider />
                    <Description content={varkResult.feedback} />
                </Section>
            </Page>
        </Document>
    );
};

VarkResultPDF.propTypes = {
    varkResult: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        traits: PropTypes.string.isRequired,
        techniques: PropTypes.string.isRequired,
        feedback: PropTypes.string.isRequired,
    }).isRequired,
};
