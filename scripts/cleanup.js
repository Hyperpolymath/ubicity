#!/usr/bin/env node

/**
 * Cleanup utility for UbiCity data
 * Removes duplicates, invalid entries, and optimizes storage
 */

import { promises as fs } from 'fs';
import path from 'path';
import { safeValidateExperience } from '../src/schemas.js';

const STORAGE_DIR = './ubicity-data/experiences';

async function cleanupData(options = {}) {
  const {
    removeDuplicates = true,
    removeInvalid = false,
    dryRun = false,
  } = options;

  console.log('\n🧹 UbiCity Data Cleanup\n');
  console.log('='.repeat(60));

  if (dryRun) {
    console.log('\n⚠️  DRY RUN MODE - No files will be modified\n');
  }

  // Load all files
  const files = await fs.readdir(STORAGE_DIR);
  const jsonFiles = files.filter(f => f.endsWith('.json'));

  console.log(`\n📂 Found ${jsonFiles.length} experience files\n`);

  const stats = {
    total: jsonFiles.length,
    valid: 0,
    invalid: 0,
    duplicates: 0,
    removed: 0,
  };

  const seenDescriptions = new Map();
  const toRemove = [];

  // Process each file
  for (const file of jsonFiles) {
    const filepath = path.join(STORAGE_DIR, file);
    const content = await fs.readFile(filepath, 'utf8');
    const data = JSON.parse(content);

    // Validate
    const validation = safeValidateExperience(data);

    if (!validation.success) {
      stats.invalid++;
      console.log(`❌ Invalid: ${file}`);
      validation.errors.forEach(err => console.log(`   - ${err}`));

      if (removeInvalid) {
        toRemove.push(filepath);
      }
      continue;
    }

    stats.valid++;

    // Check for duplicates (same description + same timestamp within 1 minute)
    if (removeDuplicates) {
      const key = `${data.learner.id}:${data.experience.description}`;
      const timestamp = new Date(data.timestamp).getTime();

      if (seenDescriptions.has(key)) {
        const existing = seenDescriptions.get(key);
        const timeDiff = Math.abs(timestamp - existing.timestamp);

        if (timeDiff < 60000) {
          // Within 1 minute
          stats.duplicates++;
          console.log(`🔄 Duplicate: ${file} (similar to ${existing.file})`);
          toRemove.push(filepath);
          continue;
        }
      }

      seenDescriptions.set(key, { timestamp, file });
    }
  }

  // Remove marked files
  if (toRemove.length > 0 && !dryRun) {
    console.log(`\n🗑️  Removing ${toRemove.length} files...\n`);

    for (const filepath of toRemove) {
      await fs.unlink(filepath);
      stats.removed++;
      console.log(`   Removed: ${path.basename(filepath)}`);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 Cleanup Summary\n');
  console.log(`  Total files:       ${stats.total}`);
  console.log(`  ✅ Valid:          ${stats.valid}`);
  console.log(`  ❌ Invalid:        ${stats.invalid}`);
  console.log(`  🔄 Duplicates:     ${stats.duplicates}`);

  if (dryRun) {
    console.log(`  🗑️  Would remove:   ${toRemove.length}`);
  } else {
    console.log(`  🗑️  Removed:        ${stats.removed}`);
  }

  console.log('\n' + '='.repeat(60) + '\n');

  if (dryRun && toRemove.length > 0) {
    console.log('Run without --dry-run to actually remove files:');
    console.log('  node scripts/cleanup.js --remove-duplicates\n');
  }

  return stats;
}

// CLI
const args = process.argv.slice(2);
const options = {
  removeDuplicates: args.includes('--remove-duplicates'),
  removeInvalid: args.includes('--remove-invalid'),
  dryRun: args.includes('--dry-run') || (!args.includes('--remove-duplicates') && !args.includes('--remove-invalid')),
};

cleanupData(options).catch(error => {
  console.error('\n❌ Cleanup failed:', error.message);
  process.exit(1);
});
