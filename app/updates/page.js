import updatesData from '@/data/updates.json';
import UpdatesClient from './UpdatesClient';

export const metadata = {
    title: 'Latest Updates',
    description: 'Recent news, projects, and articles from Hariharan S (AIGAMER). Stay updated with my latest technical milestones.',
    openGraph: {
        title: 'Latest Updates | Hariharan S',
        description: 'Chronological timeline of my professional updates and technical publications.',
        images: [{ url: '/favicon.ico' }],
    }
};

export default function UpdatesPage() {
    return <UpdatesClient updates={updatesData.updates || []} />;
}
