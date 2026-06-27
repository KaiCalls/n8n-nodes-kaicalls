import { copyFileSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = process.cwd();

function copyFile(from, to) {
	mkdirSync(dirname(to), { recursive: true });
	copyFileSync(from, to);
}

copyFile(join(root, 'package.json'), join(root, 'dist', 'package.json'));

for (const iconName of ['kaicalls.svg', 'kaicalls.dark.svg']) {
	copyFile(join(root, 'icons', iconName), join(root, 'dist', 'icons', iconName));
}

const nodesDir = join(root, 'nodes');
for (const nodeDir of readdirSync(nodesDir, { withFileTypes: true })) {
	if (!nodeDir.isDirectory()) {
		continue;
	}

	const sourceDir = join(nodesDir, nodeDir.name);
	const targetDir = join(root, 'dist', 'nodes', nodeDir.name);

	for (const fileName of readdirSync(sourceDir)) {
		if (fileName.endsWith('.svg') || fileName.endsWith('.json')) {
			copyFile(join(sourceDir, fileName), join(targetDir, fileName));
		}
	}
}
