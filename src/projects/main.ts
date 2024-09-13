#!/usr/bin/env node
import { authenticate } from "../auth";
import { fetchProjects, promptProjectType, promptProjectSelection } from "./index";
import { handleCancellation } from "../helpers/cancel";
import { getErrorMessage } from "../helpers/getError";

async function main() {
  try {
    const userData = await authenticate();
    if (!userData) {
      console.log("Authentication failed.");
      return;
    }

    const projectType = await promptProjectType();
    const projects = await fetchProjects(projectType, userData.userId, userData.organizations[0]?.id);

    if (projects.length === 0) {
      console.log("No projects found.");
      return;
    }

    const selectedProject = await promptProjectSelection(projects);
    console.log(`You selected: ${selectedProject}`);
  } catch (error) {
    console.error("An error occurred:", getErrorMessage(error));
    handleCancellation();
  }
}

main().catch((error) => {
  console.error("An unexpected error occurred:", getErrorMessage(error));
  process.exit(1);
});