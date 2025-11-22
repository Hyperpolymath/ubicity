# Getting Started with UbiCity

## 5-Minute Quick Start

### 1. See Example Data (1 minute)

```bash
cd ubicity
node examples/populate-examples.js
```

This creates 8 fictional learning experiences showing different types of urban learning.

### 2. View Your First Visualization (1 minute)

```bash
node visualize.js
```

Open `ubicity-data/ubicity-map.html` in your browser. You'll see:
- Learning hotspots (locations with high disciplinary diversity)
- Domain networks (which fields connect)
- Interdisciplinary experiences
- Location analysis

### 3. Explore the Data (2 minutes)

```bash
# Generate a full report
node mapper.js report

# Find learning hotspots
node mapper.js hotspots

# See a learner's journey
node mapper.js learner alex-maker

# View domain connections
node mapper.js network
```

### 4. Capture Your First Real Experience (1 minute)

```bash
node capture.js quick
```

Answer three questions:
- Who (your learner ID)
- Where (location)
- What (description)

Then run `node visualize.js` again to see your experience added to the map!

---

## 10-Minute Deep Dive

### Understanding the Data Model

Every learning experience is just three required fields:

```json
{
  "learner": { "id": "who" },
  "context": { "location": { "name": "where" } },
  "experience": {
    "type": "what-kind",
    "description": "what-happened"
  }
}
```

Everything else (GPS coordinates, artifacts, connections, outcomes) is optional.

### Capture Modes

**Quick mode** - Minimal friction (30 seconds):
```bash
node capture.js quick
```

**Full mode** - Rich metadata (2 minutes):
```bash
node capture.js full
```

**Template mode** - Edit JSON manually:
```bash
node capture.js template > my-experience.json
# Edit the file, then copy to ubicity-data/experiences/
```

### Analysis Options

**For researchers:**
```bash
# Full JSON report
node mapper.js report > analysis.json

# Export to Voyant for text analysis
# (Run mapper.exportToVoyant() in code)
```

**For explorers:**
```bash
# Pretty-printed hotspots
node mapper.js hotspots

# Visual HTML map
node visualize.js
```

**For individuals:**
```bash
# Track your learning journey
node mapper.js learner <your-id>
```

---

## 30-Minute Experiment

### Capture 3 Experiences Right Now

Think about the last week. Capture three moments where you learned something outside a formal classroom:

1. **A failure** - Something you tried that didn't work
2. **An observation** - Something you noticed in the city
3. **A connection** - An unexpected link between ideas

For each:
```bash
node capture.js quick
```

### Analyze Your Patterns

```bash
node mapper.js report
node visualize.js
```

Open the HTML file. Ask yourself:

- Did you visit different types of locations?
- Did multiple domains appear?
- Did questions emerge?
- Could you connect these three experiences?

### Decide: Continue or Stop?

**Stop if:**
- This feels forced
- You don't see interesting patterns
- The tools get in the way

**Continue if:**
- You found unexpected connections
- New questions emerged
- You want to track more
- You're curious what a week looks like

---

## 4-Week Commitment

Ready to run the full Minimal Viable Protocol? See `MINIMAL_VIABLE_PROTOCOL.md`.

The commitment:

- **Week 1**: Capture 5 experiences
- **Week 2**: Analyze patterns
- **Week 3**: Add one collaborator OR go deeper solo
- **Week 4**: Reflect and decide next steps

Time investment: ~1 hour total over 4 weeks.

Success criteria:
1. ✅ Captured 5+ experiences
2. ✅ Found 1 unexpected connection
3. ✅ Generated 1 new question

---

## Common Questions

### "I don't leave my house much"

Learning happens everywhere. Your home, your street, your local cafe. UbiCity is about **noticing** learning, not requiring adventure.

### "I only work in one domain"

Most people think this, then realize their "one domain" connects to others. A programmer learning about coffee brewing is learning about:
- Chemistry (extraction)
- Design (equipment)
- Culture (cafe spaces)
- Economics (supply chains)

Capture it and see what emerges.

### "This feels like homework"

If it does, stop. UbiCity should feel like **noticing what you're already doing**, not adding tasks.

### "I'm not a good writer"

One sentence is enough for description. "Tried to fix bike chain, couldn't figure out derailer." That's a valid capture.

### "I learn from books/online, not cities"

Where do you read? That's a location. Do you discuss what you read? That's context. Do you try things after reading? That's an experiment.

The city isn't just streets - it's the entire environment outside formal institutions.

### "What if I can't remember details?"

Capture what you remember. Incomplete data is better than no data. Even "Met someone at cafe, discussed [topic], learned [thing]" is valuable.

### "Should I capture everything?"

No! Capture moments that feel significant to you. If nothing this week felt like learning, don't force it.

---

## Next Steps

### If you ran the 5-minute quick start:

Read `MINIMAL_VIABLE_PROTOCOL.md` to understand the full framework.

### If you captured 3 experiences:

Decide: Run the 4-week experiment? Or was this enough?

### If you completed 4 weeks:

Read the full `README.md` for scaling options and connections to other work.

### If this resonates deeply:

- Fork this repo
- Adapt the tools for your context
- Share what you discover
- Connect with others doing urban learning

---

## Technical Details

### Data Storage

All data lives in `ubicity-data/`:
- `experiences/*.json` - Individual learning experiences
- `maps/*.json` - Generated location maps
- `analyses/*.json` - Generated reports

### File Format

Standard JSON matching `schema/learning-experience.json`. You can:
- Edit files directly
- Write your own tools
- Import/export to other systems

### Privacy

- Learner IDs can be pseudonymous
- Privacy levels: public, community, private
- All data stays local (no cloud sync)
- You control what to share

### Integration

The mapper can be used programmatically:

```javascript
const { UrbanKnowledgeMapper } = require('./mapper');

const mapper = new UrbanKnowledgeMapper();
mapper.loadAll();

const hotspots = mapper.findLearningHotspots();
const journey = mapper.getLearnerJourney('your-id');
const network = mapper.generateDomainNetwork();
```

Build your own analysis on top of the core tools.

---

## Support

This is a personal toolkit, not a product. There's no support team. But:

- Read the docs carefully
- Experiment with examples
- Modify the tools for your needs
- Share what you discover

The GPL3 license means you can fork, modify, and redistribute freely.

---

**Ready?**

```bash
node capture.js quick
```

Welcome to UbiCity. 🏙️
