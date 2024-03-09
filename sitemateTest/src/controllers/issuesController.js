// src/controllers/issuesController.js
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const issuesFilePath = path.join(__dirname, '../../issues.json');

let issuesData;

const readIssuesData = async () => {
    try {
        const issuesJson = await fs.readFile(issuesFilePath, 'utf-8');
        issuesData = JSON.parse(issuesJson);
    } catch (error) {
        console.error('Error reading issues data:', error.message);
        issuesData = [];
    }
};

const writeIssuesData = async () => {
    try {
        const issuesJson = JSON.stringify(issuesData, null, 2);
        await fs.writeFile(issuesFilePath, issuesJson, 'utf-8');
    } catch (error) {
        console.error('Error writing issues data:', error.message);
    }
};

// Initialize issues data
readIssuesData();

// Controller methods
export const getAll = async (req, res) => {
    res.json(issuesData);
};

export const getById = async (req, res) => {
    const id = parseInt(req.params.id);
    const issue = issuesData.find((i) => i.id === id);

    if (issue) {
        res.json(issue);
    } else {
        res.status(404).json({ message: 'Issue not found' });
    }
};

export const createIssue = async (req, res) => {
    const { title, description } = req.body;
    const newIssue = {
        id: issuesData.length + 1,
        title,
        description,
    };

    issuesData.push(newIssue);

    // Save the updated data to the file
    await writeIssuesData();

    res.status(201).json(newIssue);
};

export const updateIssue = async (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description } = req.body;

    const index = issuesData.findIndex((i) => i.id === id);

    if (index !== -1) {
        // Update the issue
        issuesData[index] = { id, title, description };

        // Save the updated data to the file
        await writeIssuesData();

        // Return the updated issue
        res.json(issuesData[index]);
    } else {
        res.status(404).json({ message: 'Issue not found' });
    }
};

export const deleteIssue = async (req, res) => {
    const id = parseInt(req.params.id);

    const index = issuesData.findIndex((i) => i.id === id);

    if (index !== -1) {
        // Remove the issue
        const deletedIssue = issuesData.splice(index, 1)[0];

        // Save the updated data to the file
        await writeIssuesData();

        res.json(deletedIssue);
    } else {
        res.status(404).json({ message: 'Issue not found' });
    }
};
