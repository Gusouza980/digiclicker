import { validateCatalogs } from "@/game/catalog/validate";

const issues = validateCatalogs();

if (issues.length > 0) {
  console.error(`Catalog validation failed: ${issues.length} issue(s)`);
  for (const issue of issues) {
    console.error(`- [${issue.kind}] ${issue.id}: ${issue.message}`);
  }
  process.exit(1);
}

console.log("Catalog validation passed.");
