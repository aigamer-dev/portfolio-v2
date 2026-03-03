import projectsData from '@/data/projects.json';
import ProjectsClient from './ProjectsClient';

export const metadata = {
    title: 'Featured Projects',
    description: 'Explore the technical projects of Hariharan S (AIGAMER) - featuring AI, Machine Learning, and Backend systems.',
    openGraph: {
        title: 'Featured Projects | Hariharan S',
        description: 'Technical projects and portfolio of Hariharan S, specializing in AI and Backend systems.',
    }
};

export default function ProjectsPage() {
    const projectsLd = projectsData.projects.map(project => ({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": project.title,
        "description": project.description,
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web, Python",
        "author": {
            "@type": "Person",
            "name": "Hariharan S"
        },
        "url": project.live_url || `https://aigamer.dev/projects#${project.slug}`,
        "image": project.cover_image ? `https://aigamer.dev${project.cover_image}` : undefined
    }));

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsLd) }}
            />
            <ProjectsClient projects={projectsData.projects} />
        </>
    );
}
