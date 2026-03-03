import profileData from '@/data/profile_info.json';
import ContactClient from './ContactClient';

export const metadata = {
    title: 'Contact',
    description: 'Get in touch with Hariharan S (AIGAMER) for collaborations on AI, Python, or Backend engineering projects.',
    openGraph: {
        title: 'Connect with Hariharan S',
        description: 'Open for discussions about AI agent workflows and robust backend architectures.',
        images: [{ url: '/favicon.ico' }],
    }
};

export default function ContactPage() {
    return <ContactClient socialLinks={profileData.social_links} />;
}
