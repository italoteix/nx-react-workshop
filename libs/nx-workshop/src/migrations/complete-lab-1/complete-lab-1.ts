/* eslint-disable @typescript-eslint/no-unused-vars */
import { formatFiles, Tree, updateJson, getProjects } from '@nrwl/devkit';
import { removeGenerator } from '@nrwl/workspace';

export default async function update(tree: Tree) {
  // npx create-nx-workspace bg-hoard --preset=empty --no-nx-cloud
  const projects = getProjects(tree);
  const projectsToRemove = [
    'store-e2e',
    'store',
    'api',
    'api-util-interface',
    'util-interface',
    'store-feature-game-detail',
    'store-ui-shared',
    'store-ui-shared-e2e',
    'store-util-formatters',
    'api-util-notifications',
    'admin-ui',
  ].filter((removeProject) => projects.has(removeProject));
  projectsToRemove.forEach(
    async (projectName) =>
      await removeGenerator(tree, {
        projectName,
        skipFormat: true,
        forceRemove: true,
      })
  );
  // Lab 13
  tree.delete('tools/generators/util-lib');
  // Lab 14
  tree.delete('tools/generators/update-scope-schema');
  // Lab 15
  tree.delete('.github/workflows/ci.yml');
  // Lab 19-alt
  tree.delete('tools/generators/add-deploy-target');
  // Set npmScope to bg-hoard
  updateJson(tree, 'nx.json', (json) => {
    json.npmScope = 'bg-hoard';
    return json;
  });
  await formatFiles(tree);
}
