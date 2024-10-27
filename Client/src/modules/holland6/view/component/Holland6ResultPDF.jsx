import { Description } from '@/platform/pdf/view/component/Description';
import { Divider } from '@/platform/pdf/view/component/Divider';
import { Heading } from '@/platform/pdf/view/component/Heading';
import { List } from '@/platform/pdf/view/component/ListItem';
import { Section } from '@/platform/pdf/view/component/Section';
import { Title } from '@/platform/pdf/view/component/Title';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    page: { padding: 30, backgroundColor: '#010613' },
});

export const Holland6ResultPDF = ({ holland6Result }) => {
    return (
        <Document>
            <Page style={styles.page}>
                <Section>
                    <Title content="Holland6 Result" />
                </Section>
                <Section>
                    <Heading
                        bulletNumber="01"
                        content={`You are a ${holland6Result.title}!`}
                    />
                    <Divider />
                    <Description content={holland6Result.description} />
                </Section>
                <Section>
                    <Heading
                        bulletNumber="02"
                        content="Characteristics"
                    />
                    <Divider />
                    <Description content={holland6Result.characteristics} />
                </Section>
                <Section>
                    <Heading
                        bulletNumber="03"
                        content="Careers"
                    />
                    <Divider />
                    <List items={holland6Result.careers} />
                </Section>
            </Page>
        </Document>
    );
};

Holland6ResultPDF.propTypes = {
    holland6Result: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        characteristics: PropTypes.string.isRequired,
        careers: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};
