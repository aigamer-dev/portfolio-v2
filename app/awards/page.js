import awardsData from '@/data/awards.json';
import AwardsClient from './AwardsClient';

export const metadata = {
    title: 'Awards & Certifications',
    description: 'Professional awards, certifications, and technical achievements of Hariharan S (AIGAMER).',
    openGraph: {
        title: 'Awards & Certifications | Hariharan S',
        description: 'Recognition and professional milestones of Hariharan S.',
    }
};

export default function AwardsPage() {
    return <AwardsClient awards={awardsData.awards} />;
}
