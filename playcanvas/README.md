# The Last Delivery — district build 0.4

## Current delivery status
The updated game runs locally at http://localhost:4173/sandbox/ while `python3 preview.py` is running. Open `../dist/sandbox/index.html` directly as an alternative. The engine is now vendored locally at version 2.7.4, with its MIT license, so the standalone game no longer relies on a CDN.

PlayCanvas project 1650764 / scene 2659799 / script asset 316697723 is now synchronized with build 0.4. Scene name: The Last Delivery — Lagos District. Editor Launch initialized successfully using engine 2.23.3, WebGL2. Courier and ten traffic entities were verified in the live runtime. The bus shelter material was corrected in both local source and Editor asset. One Editor-generated camera `offscreen` option warning remains despite removing the saved option; no runtime errors were reported. The prior 35 gameplay checks were on standalone engine 2.7.4; this sync verifies initialization, not a repeated full gameplay run on 2.23.3. Saved checkpoint: 25795383-8861-42b3-897c-abd8bc96cb73.

## Source organization
- `src/district.js`: scene creation and population.
- `src/world-art.js`: reusable original procedural props and characters.
- `src/interface.js`: UI, map, story, dialogue and audio.
- `src/mechanics.js`: movement, navigation, traffic, combat, grip and graves.
- `midnight-grounds.js`: compiled one-file PlayCanvas Editor script; script name remains `midnightGrounds` for compatibility.
- `midnight-grounds-v02.js`, `midnight-grounds-v03.js`: earlier snapshots.

Build with `python3 tools/build-game.py` from the project root. It writes the Editor script and identical `dist/sandbox/midnight-grounds.js`. Run `node --check playcanvas/midnight-grounds.js` afterward.

## Controls
WASD/arrows move. Shift sprints with stamina. Space swings in the direction you face; movement remains possible during swings. E grabs/releases a settled body. T talks or interacts. M expands the live location/objective map. Scroll zooms. Escape pauses or closes dialogue. Touch buttons provide the same actions.

At a grave: hold F to excavate. C climbs in or out of an empty open pit. Hold R to refill even an empty pit. While dragging, hold F to lower the body into an empty grave, then hold R to bury it. Digging remains at the edge; standing on the plot when starting excavation moves the player to its safe edge. Refilling is blocked while inside. Cancelling lowering restores the body; cancelling refilling leaves the open grave intact. Re-excavating a filled grave returns its body to the edge.

## World and simulation
The connected district spans approximately 106×112 game units: market, business quarter, main road with shops/bus stop, garden corridor and a walled cemetery. These are distinct areas within one loaded scene. The map tracks the player's position, direction, traffic and objective.

Seventeen named NPCs have roles, simple routines, paired conversations and handoff props. The final story character appears at the appropriate stage. Grid pathfinding routes walkers around static obstacles. Attacked characters flee at 3.4 units/sec; the player's sprint reaches 5.8, making pursuit possible. Traffic follows two lanes, observes timed crossing signals and leaves queues behind stopped vehicles; cars also stop for the player ahead. This is a simplified traffic simulation, not a complete city driving system.

## Combat and animation
Both rendered hands follow shovel grip points. During dragging, the shovel moves to the back and hands follow the body's ankles while the player backs away. Arms are procedural segment geometry; full anatomical IK constraints and skeletal ragdolls are not implemented.

During the active swing, the blade's swept segment is checked against three torso-height targets with range, facing and line-of-sight checks. Each swing hits a given character at most once. Two landed hits produce an animated fall. Blood particles, marks and trails remain bounded. There is no realistic tissue/injury simulation.

## Sound
Begin Shift unlocks Web Audio. Original synthesized/noise-based footsteps, swings, impacts, digging, climbing, horns and low engine ambience are mixed through a volume control. Sound can be muted. Optional browser speech voices dialogue; it is off initially. Pause/background visibility mutes the game mix. No third-party recordings are bundled.

## Verification and limits
See `../tests/district-browser.js` and `../artifacts/district-qa.json`: 35 live checks passed, covering story completion, grave entry/exit/refill, burial/exhumation, blade timing, hit rejection, grip alignment, movement during swings, navigation, map, traffic and audio mixer controls. Additional live checks verified pursuit closed 5m to 1.4m and landed a hit, an intervening obstacle prevented damage, and dragging hand alignment stayed within 0.001 units. Chrome reported no warnings/errors. 390×844 emulation showed no horizontal overflow, 44px action buttons and no prompt/action overlap.

The tests position actors and advance simulation for deterministic cases; they are not a substitute for a full human desktop/phone playthrough. AudioContext and mixer behavior were verified, but no human listening-quality assessment was performed. Characters remain low-poly, procedural and stylized. NPC dialogue is a limited authored set; geometry can still intersect near tight corners. No save system, police system, building interiors, network multiplayer or public deployment is included. Editor runtime initialization is now verified; a complete gameplay regression on its newer engine remains pending.
