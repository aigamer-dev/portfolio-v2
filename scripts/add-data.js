#!/usr/bin/env node
/**
 * add-data.js — Interactive CLI for adding entries to portfolio JSON data files.
 *
 * Usage: node scripts/add-data.js <type>
 *   Types: project | experience | update | award | skill
 *
 * Cross-reference links: type "page:slug" as URL to link internally.
 *   e.g.  projects:repomind  →  /projects#repomind
 *         awards:google-startups-2026  →  /awards#google-startups-2026
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ── helpers ──────────────────────────────────────────────────────────────────

const DATA_DIR = path.join(__dirname, '..', 'data');

function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

function readJSON(file) {
    const full = path.join(DATA_DIR, file);
    return JSON.parse(fs.readFileSync(full, 'utf8'));
}

function writeJSON(file, data) {
    const full = path.join(DATA_DIR, file);
    fs.writeFileSync(full, JSON.stringify(data, null, 4), 'utf8');
    console.log(`\n✅  Saved to ${file}`);
}

function nextOrder(arr) {
    return arr.length === 0 ? 1 : Math.max(...arr.map(i => i.order ?? 0)) + 1;
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function ask(question, defaultVal) {
    return new Promise(resolve => {
        const hint = defaultVal !== undefined ? ` [${defaultVal}]` : '';
        rl.question(`${question}${hint}: `, answer => {
            resolve(answer.trim() || (defaultVal !== undefined ? String(defaultVal) : ''));
        });
    });
}

async function askLinks() {
    const links = [];
    console.log('\n  Links (leave text empty to stop):');
    console.log('  Internal cross-ref format: "page:slug" e.g. projects:repomind');
    while (true) {
        const text = await ask('  Link text');
        if (!text) break;
        const url = await ask('  Link URL (or page:slug)');
        links.push({ text, url });
    }
    return links;
}

async function askTags() {
    const raw = await ask('Tags (comma-separated, leave empty to skip)');
    if (!raw) return [];
    return raw.split(',').map(t => t.trim()).filter(Boolean);
}

// ── entry builders ────────────────────────────────────────────────────────────

async function addProject() {
    const data = readJSON('projects.json');
    console.log('\n── New Project ──────────────────────────────────\n');
    const title = await ask('Title');
    const slug = await ask('Slug', slugify(title));
    const description = await ask('Description');
    const live_url = await ask('Live URL (leave empty if none)');
    const github_url = await ask('GitHub URL (leave empty if none)');
    const order = parseInt(await ask('Order', nextOrder(data.projects)));

    data.projects.push({ title, slug, description, live_url, github_url, cover_image: null, tech_stack_names: [], is_featured: true, bento_size: 'medium', order });
    writeJSON('projects.json', data);
    console.log(`\n  Next step: add "${slug}" as a tech_stack_names via your editor if needed.`);
}

async function addExperience() {
    const data = readJSON('experience.json');
    console.log('\n── New Experience ───────────────────────────────\n');
    const company_name = await ask('Company name');
    const slug = await ask('Slug', slugify(company_name) + '-' + slugify(await ask('Role short (for slug)')));
    const role = await ask('Role / Title');
    const company_website = await ask('Company website URL');
    const start_date = await ask('Start date (YYYY-MM-DD)');
    const end_date = await ask('End date (YYYY-MM-DD or leave empty for present)');
    const location = await ask('Location');
    const description = await ask('Description');
    const is_current = (await ask('Is current position? (y/n)', 'n')).toLowerCase() === 'y';
    const order = parseInt(await ask('Order', nextOrder(data.experience)));

    data.experience.push({ slug, company_name, company_website, role, start_date, end_date: end_date || null, location, description, tech_stack_names: [], is_current, order });
    writeJSON('experience.json', data);
}

async function addUpdate() {
    const data = readJSON('updates.json');
    console.log('\n── New Update ───────────────────────────────────\n');
    const title = await ask('Title');
    const slug = await ask('Slug', slugify(title));
    const date = await ask('Date (e.g. March 2026)');
    const type = await ask('Type (linkedin / medium / blog / news)', 'linkedin');
    const description = await ask('Description');
    const links = await askLinks();
    const tags = await askTags();
    const order = parseInt(await ask('Order', nextOrder(data.updates)));

    data.updates.push({ slug, title, date, type, description, links, tags, order });
    writeJSON('updates.json', data);
}

async function addAward() {
    const data = readJSON('awards.json');
    console.log('\n── New Award ────────────────────────────────────\n');
    const title = await ask('Title');
    const slug = await ask('Slug', slugify(title));
    const date = await ask('Date (e.g. Dec 2025)');
    const type = await ask('Type (Award / Participant)', 'Award');
    const description = await ask('Description');
    const links = await askLinks();
    const order = parseInt(await ask('Order', nextOrder(data.awards)));

    data.awards.push({ slug, title, date, type, order, description, links });
    writeJSON('awards.json', data);
}

async function addSkill() {
    const data = readJSON('skills.json');
    console.log('\n── New Skill ────────────────────────────────────\n');
    console.log('  Categories: BE (Backend) | FE (Frontend) | DO (DevOps) | AI (AI/ML)\n');
    const name = await ask('Skill name');
    const slug = await ask('Slug', slugify(name));
    const category = await ask('Category (BE / FE / DO / AI)', 'BE');
    const icon_url = await ask('Icon URL (devicons SVG recommended)');
    const proficiency = parseInt(await ask('Proficiency % (0-100)', 50));
    const invert = (await ask('Invert icon on dark backgrounds? (y/n)', 'n')).toLowerCase() === 'y';
    const order = parseInt(await ask('Order', nextOrder(data.skills)));

    const newSkill = { slug, name, category, icon_url, proficiency, order };
    if (invert) newSkill.invert = true;

    data.skills.push(newSkill);
    writeJSON('skills.json', data);
}

// ── main ──────────────────────────────────────────────────────────────────────

const TYPES = { project: addProject, experience: addExperience, update: addUpdate, award: addAward, skill: addSkill };

async function main() {
    const type = process.argv[2]?.toLowerCase();

    if (!type || !TYPES[type]) {
        console.log('\nUsage: node scripts/add-data.js <type>');
        console.log('Types : project | experience | update | award | skill\n');
        rl.close();
        return;
    }

    try {
        await TYPES[type]();
    } catch (err) {
        console.error('\n❌  Error:', err.message);
    } finally {
        rl.close();
    }
}

main();
