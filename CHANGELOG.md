# Changelog

All notable changes to UbiCity will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-01-22

### Added

**Core Infrastructure**
- ESM module support (`type: "module"` in package.json)
- Zod schemas for runtime validation with detailed error messages
- Async/await API throughout (replaces blocking sync I/O)
- Dedicated storage abstraction layer (`ExperienceStorage`)
- Comprehensive test suite (14 tests, all passing)
- GitHub Actions CI/CD pipeline (tests on Node 18/20/22)

**New Modules**
- `src/schemas.js` - Zod validation for all data types
- `src/storage.js` - Async file operations
- `src/cli.js` - Proper CLI with argument parsing
- `src/export.js` - Export to CSV, GeoJSON, DOT, Markdown
- `src/privacy.js` - Anonymization and PII removal tools

**Export Formats**
- CSV export for spreadsheet analysis
- GeoJSON export for mapping tools (Mapbox, Leaflet, QGIS)
- Graphviz DOT format for domain network visualization
- Markdown export for readable learner journeys

**Privacy Features**
- Learner anonymization (hash IDs, remove names)
- Location fuzzing (GPS coordinates rounded to ~1km)
- PII removal (emails, phones, personal names in text)
- Configurable privacy levels (private/anonymous/public)
- Shareable dataset generator (excludes private data)

**Development Tools**
- ESLint configuration for code quality
- Prettier for consistent formatting
- `.gitignore` for proper data handling
- `npm run lint` and `npm run format` scripts

**Testing**
- Schema validation tests
- Mapper functionality tests
- Interdisciplinary connection tests
- Learning hotspot detection tests
- Domain network generation tests

**CLI Commands**
- `ubicity stats` - Show storage statistics
- `ubicity report` - Enhanced analysis report
- `ubicity hotspots <min-diversity>` - Find learning hotspots
- `ubicity network` - Domain connection network
- `ubicity learner <id>` - Learner journey timeline

### Changed

- **BREAKING**: Switched from CommonJS (`require`) to ESM (`import`)
- **BREAKING**: All I/O operations are now async (require `await`)
- **BREAKING**: Reorganized code into `src/` directory
- Improved CLI output with better formatting
- Enhanced error messages with validation details
- Better learner journey visualization in CLI

### Fixed

- Blocking I/O that could cause performance issues
- Missing validation for malformed data
- Inconsistent error handling
- No test coverage

### Removed

- None (v0.1 files kept for backwards compatibility)

### Migration

See `MIGRATION.md` for detailed upgrade guide.

**Quick migration**:
```bash
# Install dependencies
npm install

# Verify data compatibility
node src/cli.js stats

# Update imports from require() to import
# Add await to async operations
```

### Technical Debt Addressed

From `STACK_ANALYSIS.md`:
- ✅ CommonJS → ESM
- ✅ No validation → Zod schemas
- ✅ Sync I/O → Async promises
- ✅ No tests → 14 tests
- ✅ No exports → CSV/GeoJSON/DOT/Markdown
- ✅ No CLI parsing → Proper argument handling
- ✅ No privacy tools → Full anonymization suite

### Philosophy Preserved

Despite modernization, v0.2 still respects:
- Minimal Viable Protocol (WHO/WHERE/WHAT)
- Tools not platforms
- File-based storage (no database)
- CLI-first (no web requirements)
- Zero bloat (only Zod dependency for production)
- Constraint mechanisms (4-week experiment, pause points)

## [0.1.0] - 2024-11-21

### Added

Initial working prototype with:
- Basic learning experience capture (CLI)
- JSON schema definition
- Urban knowledge mapper with analysis
- Interdisciplinary connection finder
- Learning hotspot detection
- Domain network generation
- Learner journey tracking
- Static HTML visualization
- Example data (8 realistic scenarios)
- Comprehensive documentation

### Technical Stack

- Node.js v22
- CommonJS modules
- Zero external dependencies (stdlib only)
- Synchronous I/O
- File-based storage

### Documentation

- `README.md` - Project overview
- `GETTING_STARTED.md` - Quick start guide
- `MINIMAL_VIABLE_PROTOCOL.md` - 4-week experiment framework
- `STACK_ANALYSIS.md` - Technical debt documentation
- `DENO_MIGRATION_PREVIEW.md` - Alternative migration path

### Repository

Lived in `Hyperpolymath/zotero-voyant-export` repo, branch `claude/ubicity-learning-setup-01H8249ctY6CW1u58MdFWLbB`

## [Unreleased]

### Planned for v0.3

**Enhanced Visualization**
- Interactive HTML maps with filtering
- Timeline view of learning progression
- Domain network graph with D3.js
- Searchable experience browser

**Performance**
- Pagination for large datasets (>1000 experiences)
- Incremental index updates
- Memory-efficient streaming export
- Performance monitoring and benchmarks

**Data Management**
- Batch import from CSV/JSON
- Data validation repair tool
- Duplicate detection and merging
- Schema migration helpers

**Analysis**
- Temporal pattern detection (time of day, seasons)
- Collaborative learning network (who learns with whom)
- Domain expertise progression tracking
- Recommendation engine (suggested connections)

**Integration**
- Zotero integration (research → practice)
- Calendar export (iCal format)
- Social sharing (anonymized highlights)
- API for programmatic access

**Developer Experience**
- Plugin system for custom analyzers
- Hooks for capture workflow customization
- TypeScript type definitions
- Performance profiling tools

### Under Consideration (Maybe v0.4+)

- Web interface (static site generator, no server)
- Mobile capture app (PWA)
- Collaborative features (shared locations/learners)
- AI-powered insight generation
- Integration with learning platforms

**But remember**: These are ALL optional. The core remains:
1. Capture WHO/WHERE/WHAT
2. Analyze patterns
3. Surface unexpected connections

If you never upgrade past v0.2, that's fine! The goal is to *capture learning*, not to build features.

---

## Versioning

- **Major** (x.0.0): Breaking changes to data format or core API
- **Minor** (0.x.0): New features, backwards compatible
- **Patch** (0.0.x): Bug fixes only

## Links

- **Repository**: https://github.com/Hyperpolymath/ubicity
- **Issues**: https://github.com/Hyperpolymath/ubicity/issues
- **Original Prototype**: `Hyperpolymath/zotero-voyant-export`, branch `claude/ubicity-learning-setup-01H8249ctY6CW1u58MdFWLbB`
