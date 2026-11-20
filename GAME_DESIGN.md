# Love You to Death — game design v0.1

## Pitch
A cozy gothic excavation game: dig up six cartoon dead bodies in Willowbrook Cemetery and recover the love letters buried with them. Every resident has an unfinished love story. The reward for helping all six is a message for the person this game was made for.

## Audience and assumptions
A personal browser gift for your girlfriend. The initial interpretation is playful, romantic and mildly spooky, with no gore or jump scares. Her preferred name, favorite colors, desired horror intensity and your final personal message are still unknown. Current text is original placeholder writing and can be personalized before sharing.

## Player fantasy
You are the cemetery's newest midnight keeper. The dead cannot deliver their letters, so you do it for them. Excavation is the main interaction, with a story reward rather than punishment. First session target: 3–5 minutes; replay is optional.

## Core loop and rules
1. Choose any of six headstones, each with a name and epitaph.
2. Tap/click the excavation area five times. Each action clears one layer: grass, roots, coffin corner, lid, resident.
3. Reveal a cartoon skeleton holding a letter.
4. Explicitly collect the letter. The grave gains a heart marker and its letter becomes available in the journal.
5. Repeat in any order. Collecting all six unlocks the final romantic letter.
Closing an incomplete excavation resets only that grave's digging depth. Collected letters persist on this browser. Collected graves reopen their letters. Reset asks for confirmation. No timer, energy system, failure state, purchases or account requirements.

## Characters and writing
- Edgar: a dancer who still owes someone a final dance.
- Florence: flowers, devotion and a lingering grudge.
- Arthur: wishes he had met his love sooner; terrible cook.
- Mabel: affection expressed through ordinary daily rituals.
- Oscar: gallows humor, stairs and hopeless romance.
- Rose: quiet companionship that outlasts death.
Letters should stay short enough to read comfortably on a phone. The final message currently says the creator would dig through a cemetery to find the recipient; replace it with a real shared memory if desired.

## Visual direction
Deep evergreen backgrounds, sage accents, warm bone-colored type and a pale moon. Large editorial serif title, compact sans-serif labels, weathered rounded headstones. Cemetery occupies the central interactive area; instructions and collection sit beneath it. Three graves per row on mobile, six on larger screens. Current CSS scenery is original; skull/bone emoji are temporary character assets.

## Interaction and accessibility
Native buttons support keyboard activation. Native dialogs provide modal interaction and Escape dismissal. Focus outlines are visible. Dig results use a polite live region. Respect reduced motion. Avoid mandatory audio, flashing and timed controls. Verify dialog focus restoration, mobile tap sizes and screen-reader clarity during QA.

## Technical scope
Static HTML/CSS/JS in dist; zero runtime packages. Save an array of collected grave IDs to versioned localStorage. Validate loaded IDs and tolerate unavailable storage. Python preview adds development-only live refresh; that code is not included in deployed files. Netlify can host the static directory. No API keys, database or server are needed for the first release.

## Later design options
Replace repeated tapping with a small soil grid and visible coffin layers. Add original skeleton sprites and unique grave props. Add opt-in shovel sounds and night ambience. Consider more cemetery chapters only after testing whether the first loop is fun. These are future ideas, not completed features.

## Definition of first release
All six graves are playable by touch and keyboard; collection and final message work; reload retains letters; reset clears them; narrow screens have no horizontal overflow; hosting URL works on a second device; personal text has been reviewed by the creator.

# Revision 0.2 — Midnight Grounds sandbox
The requested direction now includes attacking wandering fictional people, dragging their bodies and burying them. The first 3D prototype implements this in PlayCanvas with non-graphic falls and simple stylized figures. The original letter game remains available as a separate prototype.

The keeper moves freely around a bounded cemetery. Six NPCs wander randomly. An attack affects the nearest living NPC within two units and has a half-second cooldown. Dragging requires a dead NPC within 2.5 units, slows movement from 4.2 to 2.3 units/second, and makes the body follow behind the keeper. One body may be dragged at a time. Graves require three dig interactions within 2.6 units. Burial requires an open grave and a dragged body. Filled graves can be reopened; their occupant returns to the world and can be dragged again. Two original graves reveal old residents and letters. Counters track kills, burial actions and the two letters.

No realistic injury simulation or disposal instruction is part of the design; interactions are abstract game rules. No timer or fail state is implemented. Future direction could add ghost reactions, cosmetic shovel upgrades and additional story graves after playtesting. Current implementation limits and verification evidence are in playcanvas/README.md.

# Revision 0.3 — Market After Dark (current)
The user chose a Lagos-inspired market and requested improved characters, more convincing dragging/digging and blood on attacks. Replace the cemetery presentation with a fictional urban trading lane and a separate rear excavation yard. Reference research and provenance are in REFERENCES.md.

The player explores at a closer follow-camera scale; M reveals the whole layout. Eight articulated adult characters wander through the market. The combat loop is wind-up → impact → recovery, with a first-hit stagger and second-hit fall. Blood droplets, pools and drag trails provide feedback and can be toggled. Nearby characters flee. This is fictional game violence, with no real people represented.

Dragging slows the player, turns and pulls a settled body gradually, and animates loose limbs. Digging changes from instant taps to four seconds of held input, with repeated shovel strokes, soil particles, a growing spoil pile and a progressively deepening pit. Burial takes three seconds; cancelling restores the body outside the pit. Six rear-yard plots support burial/exhumation; the two old residents retain letters. Stalls and open pits block walking.

Art direction is warm earth, teal shutters, red/gold/blue canopy cloth, produce baskets, original textile trim and contemporary varied clothing. This implementation uses original articulated low-poly geometry. Full physics ragdolls, hand-to-body IK, imported rigged character art and more nuanced reactions remain future polish.

# Revision 0.4 — The Last Delivery (current)
The user's seven playtest notes drive this version. Replace the stand-alone market sandbox with connected districts and a playable romantic mystery chapter; full story is in STORY.md.

The 106×112-unit map separates market, office quarter, traffic road, roadside shops and cemetery. The cemetery is reached via a garden corridor and has its own entrance, caretaker and wall. The map shows player heading, traffic and current objective. One loaded scene provides continuous travel between areas.

Combat now checks a moving blade against body targets, with directional and obstacle rejection. The player can sprint and keep moving during a swing to pursue fleeing characters. Rendered hands follow the handle; dragging moves the shovel to the back and aligns hands with ankle grip targets. Procedural arm segments still have no full IK joint constraints.

Grave state flow is closed/buried → excavating → open → optionally occupied → refilled. F digs or lowers, R refills, C enters/exits. Refilling an empty grave is supported. The character digs from a safe edge and cannot refill a grave from inside it. Cancelled lowering restores the body; exhumation returns it to the edge.

NPCs have roles, destinations, paired dialogue, a simple trade animation and panic navigation. Traffic has two lanes, crossing signals and queues. Original generated effects and optional speech support the audio layer. These systems improve believability but are a functional low-poly prototype, not a photorealistic simulation.
